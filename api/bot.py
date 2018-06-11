from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from slackclient import SlackClient

SLACK_VERIFICATION_TOKEN = getattr(settings, 'SLACK_VERIFICATION_TOKEN', None)
SLACK_BOT_OAUTH_ACCESS_TOKEN = getattr(
    settings, 'SLACK_BOT_OAUTH_ACCESS_TOKEN', None)


class Bot(object):
    def __init__(self):
        self.slackClient = SlackClient(SLACK_BOT_OAUTH_ACCESS_TOKEN)

    def handleMessage(self, request_data):
        slack_message = request_data

        # Error chck
        if slack_message.get('token') != SLACK_VERIFICATION_TOKEN:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # Handle verification challenge
        if slack_message.get('type') == 'url_verification':
            return self.verificationChallenge(slack_message)

        # Handle event
        if 'event' in slack_message:
            return self.handleEvent(slack_message)
        elif 'command' in slack_message:
            return self.handleCommand(slack_message)

    def verificationChallenge(self, slack_message):
        return Response(data=slack_message,
                        status=status.HTTP_200_OK)

    def handleEvent(self, slack_message):
        event_message = slack_message.get('event')
        print('\nHANDLE EVENT: %s \n' % slack_message)

        # ignore bot's own message
        if event_message.get('subtype') == 'bot_message':
            return Response(status=status.HTTP_200_OK)
        else:
            # process user's message
            user = event_message.get('user')
            text = event_message.get('text')
            channel = event_message.get('channel')
            bot_text = 'Hi <@{}> :wave:'.format(user)
            if 'hi' in text.lower():
                self.slackClient.api_call(
                    method='chat.postEphemeral',
                    channel=channel,
                    user=user,
                    text=bot_text
                )
            return Response(status=status.HTTP_200_OK)

    def handleCommand(self, slack_message):
        print('\nHANDLE COMMAND: %s \n' % slack_message)
        command_type = slack_message.get('command')
        command_text = slack_message.get('text')
        channel = slack_message.get('channel_id')
        user = slack_message.get('user_id')
        print("COMMAND INFORMATION: \n command_type: {}\n command_text: {}\n channel: {}".format(
            command_type, command_text, channel))
        bot_response = {
            "text": "I am bobbie! And I am here to help you stay in the flow! :robot_face: \n You said: {}"
        }

        self.slackClient.api_call(
            method='chat.postEphemeral',
            channel=channel,
            user=user,
            text=bot_response['text']
        )
        return Response(status=status.HTTP_200_OK)
