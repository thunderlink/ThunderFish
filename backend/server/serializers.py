from rest_framework import serializers
from .models import User, Meeting, Comment, Tag, Notification

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'nickname', 'photo', 'email', 'name', 'gender', 'region', 'introduce', 'meeting_hosted', 'my_comments', 'meeting_participated', 'meeting_waiting')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'name', 'host', 'meeting_date', 'max_participant', 'deadline', 'region', 'photo', 'content', 'status', 'open_chat', 'comment_set', 'participant', 'waiter', 'posted_date', 'tag')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'date', 'comment_text', 'parent_meeting', 'writer')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'tag_set')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('id', 'date', 'notice_text')
