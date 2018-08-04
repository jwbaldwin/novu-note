from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from slackclient import SlackClient
from .models import State, Profile
import json, datetime


SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_OAUTH_ACCESS_TOKEN = getattr(
    settings, 'SLACK_BOT_OAUTH_ACCESS_TOKEN', None)
GREETINGS = {'hi', 'hello', 'hey', 'hola', 'howdy', 'greetings', 'salutations'}
STATE_INFO = {}


class Bot(object):
    def __init__(self):
        self.slackClient = SlackClient(SLACK_BOT_OAUTH_ACCESS_TOKEN)
        with open('./api/basic_templates.json', encoding='utf-8') as string_file:
            self.basic_templates = json.load(string_file)

    def handleMessage(self, request_data):
        slack_message = request_data

        # Error check
        if slack_message.get('token') != SLACK_VERIFICATION_TOKEN:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # Handle verification challenge
        if slack_message.get('type') == 'url_verification':
            return self.verificationChallenge(slack_message)

        # Handle event
        if 'event' in slack_message:
            return self.handleEvent(slack_message)

    def verificationChallenge(self, slack_message):
        return Response(data=slack_message,
                        status=status.HTTP_200_OK)

    def handleEvent(self, slack_message):
        event_message = slack_message.get('event')

        # ignore bot's own message
        if event_message.get('subtype') == 'bot_message':
            return Response(status=status.HTTP_200_OK)
        else:
            # process user's message
            user = event_message.get('user')
            text = event_message.get('text')
            channel = event_message.get('channel')
            STATE_INFO[user] = {
                "channel": channel,
                "user_id": user,
                "message_ts": "",
                "stateType": "",
                "stateDetails": {}
            }

            if text.lower()[13:] in GREETINGS:
                bot_text, bot_attachments = self.getJsonTemplateData('hi')
                bot_text = bot_text.format(user)

            elif 'help' in text.lower():
                bot_text, bot_attachments = self.getJsonTemplateData('help')

            elif 'stop' in text.lower():
                bot_text, bot_attachments = self.getJsonTemplateData('stop')

            elif 'flow' in text.lower():
                bot_text, bot_attachments = self.returnSavedFlowStateData(user)

            else:
                bot_text, bot_attachments = self.getJsonTemplateData('error')

            self.slackClient.api_call(
                'chat.postMessage',
                channel=channel,
                user=user,
                text=bot_text,
                attachments=bot_attachments
            )
            return Response(status=status.HTTP_200_OK)

    # Get item from the DB using user_id
    def returnSavedFlowStateData(self, user_id):
        user = self.getUserFromSlackID(user_id)
        # Return active flow state if there is one - or return inactive
        try: 
            activeFlowState = State.objects.get(user=user, active=True)

            bot_text, bot_attachments = self.getJsonTemplateData('flow_'+activeFlowState.state_type)
            bot_attachments = self.formatFlowJson(bot_attachments, activeFlowState)

            return bot_text, bot_attachments
        except State.DoesNotExist as e:
            print("Error: ", e)
            inactiveFlowState = State.objects.get(user=user, active=False)

            bot_text, bot_attachments = self.getJsonTemplateData('flow_inactive')
            bot_attachments = self.formatFlowJson(bot_attachments, inactiveFlowState)
            
            return bot_text, bot_attachments

    # Construct the attachments using information from DB
    def formatFlowJson(self, bot_attachments, flowStateData):
        # deconstruct into variables
        attachments, attachment_field_value = self.deconstructJsonAttachments(bot_attachments)

        attachments["title"] = attachments["title"].format(flowStateData.short_desc)
        attachments["text"] = attachments["text"].format(flowStateData.extra_info)
        attachments["footer_icon"] =  attachments["footer_icon"].format(" ") 
        attachments["ts"] = attachments["ts"].format(flowStateData.date_created.timestamp())

        if(flowStateData.state_type == "researching"):
            # include the article url in top for unfurling
            attachment_field_value = attachment_field_value.format(flowStateData.resource_info)
        else:
            attachment_field_value = attachment_field_value.format(flowStateData.location_info)

        # reconstruct the json
        bot_attachments[0] = self.reconstructJsonAttachments(attachments, attachment_field_value)
        return bot_attachments

    # Helper methods for building bot_attachments
    def deconstructJsonAttachments(self, bot_attachments):
        attachments = bot_attachments[0]
        attachment_field_value = bot_attachments[0]["fields"][0]["value"]
        return attachments, attachment_field_value
    
    def reconstructJsonAttachments(self, attachments, attachment_field_value):
        attachments["fields"][0]["value"] = attachment_field_value
        return attachments

    # Handle all button actions
    def handleAction(self, request_data):
        message_action = json.loads(request_data['payload'])
        print('\n\n', message_action, '\n\n')
        user_id = message_action['user']['id']

        if message_action['type'] == 'interactive_message':
            # check type of action
            if(message_action['callback_id'] == "returned_flow_action"):
                # User either will save for later or delete state
                try:
                    self.handleSaveOrDeleteState(message_action)
                except Exception as e:
                    print("Error: ", e)
            else:
                # We are saving a new state

                # extract needed info from the slack response
                stateInfo = self.parseUserStateInfo(message_action, user_id)

                option = stateInfo['stateType']
                self.setUniqueCallbackID(option, user_id)

                # Show the flow state saver dialog to the user
                self.slackClient.api_call(
                    'dialog.open',
                    trigger_id=message_action['trigger_id'],
                    dialog=self.basic_templates['stop_dialog_' + option]
                )

                self.updateSlackMessageInPlace(
                    stateInfo["channel"], stateInfo["message_ts"], ':pencil: Jotting this all down...')

        elif message_action['type'] == 'dialog_submission':
            stateInfo = STATE_INFO[user_id]
            stateInfo['stateDetails'] = message_action['submission']

            # save this to DB now
            self.saveStateToDB(stateInfo)

            # Update the message to show that we're in the process of taking their order
            self.updateSlackMessageInPlace(
                stateInfo["channel"], stateInfo["message_ts"], ":hourglass_flowing_sand: Details saved!\n :thought_balloon: Use command *flow* when you're ready to start again!")

        return Response(status=status.HTTP_200_OK)

    def handleSaveOrDeleteState(self, message):
        user = self.getUserFromSlackID(message["user"]["id"])
        if(message['actions'][0]['value'] == "finished"):
            print("DELETE-------", message)
            activeState = State.objects.get(user=user, active=True)
            activeState.active = False
            activeState.save()
            bot_text = ":heavy_check_mark: Great! Marked as finished!"
        else:
            print("SAVE-------", message)
            bot_text = ":heavy_check_mark: Okay! I will save this for later!"

        self.updateSlackMessageInPlace(message["channel"]["id"], message["message_ts"], bot_text)
        

    def parseUserStateInfo(self, messageData, user_id):
        STATE_INFO[user_id]['message_ts'] = messageData['message_ts']
        STATE_INFO[user_id]['stateType'] = messageData['actions'][0]['value']
        return STATE_INFO[user_id]

    def setUniqueCallbackID(self, option, user_id):
        # format the callbackID unique to the user
        self.basic_templates['stop_dialog_' + option]['callback_id'] = self.basic_templates['stop_dialog_' +
                                                                                            option].get('callback_id').format(user_id)

    def updateSlackMessageInPlace(self, channel, ts, update_text):
        # Update the message to show that we're in the process of taking their order
        self.slackClient.api_call(
            'chat.update',
            channel=channel,
            ts=ts,
            text=update_text,
            attachments=[]
        )

    def saveStateToDB(self, stateInfo):
        state = State(
            state_type=stateInfo['stateType'],
            slack_channel=stateInfo['channel'],
            short_desc=stateInfo['stateDetails']['short_description'],
            location_info=stateInfo['stateDetails']['location_info'],
            user = self.getUserFromSlackID(stateInfo['user_id'])
        )

        if(stateInfo['stateType'] == 'researching'):
            print('StateInfo: Researching\n', stateInfo)
            state.resource_info = stateInfo['stateDetails']['resource_info'],
            state.save()
        else:
            print('StateInfo: Other\n', stateInfo)
            state.extra_info = stateInfo['stateDetails']['extra_info']
        state.save()

    def getUserFromSlackID(self, user_id):
        return User.objects.get(profile__slack_id = user_id)


    def getJsonTemplateData(self, tempName):
        return self.basic_templates[tempName].get('text'), self.basic_templates[tempName].get('attachments')
