from rest_framework import serializers
from .models import User, Meeting, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nickname', 'photo', 'email', 'name', 'gender', 'region', 'introduce', 'meeting_hosted', 'my_comments', 'meeting_participated', 'meeting_waiting')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'name', 'host', 'date', 'max_participant', 'deadline', 'region', 'photo', 'content', 'status', 'open_chat', 'comments', 'participant', 'waiter')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'date', 'comment_text', 'parent_meeting', 'writer')
