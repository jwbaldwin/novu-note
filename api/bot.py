from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from slackclient import SlackClient
import json


SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_OAUTH_ACCESS_TOKEN = getattr(
    settings, 'SLACK_BOT_OAUTH_ACCESS_TOKEN', None)
GREETINGS = {'hi', 'hello', 'hey', 'hola', 'howdy', 'greetings', 'salutations'}
FLOW_INFO = {}

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
        print('\nHANDLE EVENT: %s \n' % slack_message)
        print("\nEVENT INFORMATION: \n event_type: {}\n event_text: {}\n channel: {}".format(
            event_message.get('type'), event_message.get('text'), event_message.get('channel')))
        # ignore bot's own message
        if event_message.get('subtype') == 'bot_message':
            return Response(status=status.HTTP_200_OK)
        else:
            # process user's message
            user = event_message.get('user')
            text = event_message.get('text')
            channel = event_message.get('channel')

            if text.lower()[13:] in GREETINGS:
                bot_text = self.basic_templates['hi'].format(user)
                bot_attachments = []

            elif 'help' in text.lower():
                bot_text = self.basic_templates['help'].get('text')
                bot_attachments = self.basic_templates['help'].get('attachments')

            elif 'stop' in text.lower():
                bot_text = self.basic_templates['stop'].get('text')
                bot_attachments = self.basic_templates['stop'].get('attachments')
                FLOW_INFO[user] = {
                    "channel": channel,
                    "message_ts": "",
                    "details": {}
                }
            elif 'flow' in text.lower():
                print("get FLOW_INFO from db")

            self.slackClient.api_call(
                'chat.postMessage',
                channel=channel,
                user=user,
                text=bot_text,
                attachments=bot_attachments
            )
            return Response(status=status.HTTP_200_OK)

    def handleAction(self, request_data):
        message_action = json.loads(request_data['payload'])
        user_id = message_action['user']['id']

        if message_action['type'] == "interactive_message":
            FLOW_INFO[user_id]["message_ts"] = message_action["message_ts"]
            dialog_option = message_action['actions'][0]['value']
            self.basic_templates['stop_dialog_'+dialog_option]['callback_id']= self.basic_templates['stop_dialog_'+dialog_option].get('callback_id').format(user_id)
            
            # Show the ordering dialog to the user
            open_dialog = self.slackClient.api_call(
                "dialog.open",
                trigger_id=message_action['trigger_id'],
                dialog=self.basic_templates['stop_dialog_'+dialog_option]
            )

            # Update the message to show that we're in the process of taking their order
            self.slackClient.api_call(
                "chat.update",
                channel=FLOW_INFO[user_id]["channel"],
                ts=message_action['message_ts'],
                text=":pencil: Jotting this all down...",
                attachments=[]
            )

        elif message_action["type"] == "dialog_submission":
            flow_info = FLOW_INFO[user_id]
            FLOW_INFO[user_id]['details'] = message_action['submission']
            # save this to DB now
            # Update the message to show that we're in the process of taking their order
            self.slackClient.api_call(
                "chat.update",
                channel=FLOW_INFO[user_id]["channel"],
                ts=flow_info['message_ts'],
                text=":hourglass_flowing_sand: Details saved!\n :thought_balloon: Use command 'flow' when you're ready to start again!",
                attachments=[]
            )
        return Response(status=status.HTTP_200_OK)

# 'submission': {'description': 'test', 'items': 'test', 'location': 'test'}