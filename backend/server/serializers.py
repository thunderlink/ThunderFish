from rest_framework import serializers
from .models import Profile, Meeting, Tag, Comment, Notification, Membership

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'nickname', 'photo', 'email', 'name', 'gender', 'region', 'introduce', 'meeting_hosted', 'meeting_set', 'comment_set', 'notification_set', 'membership_set')

class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ('id', 'name', 'host', 'date', 'posted_date', 'participant', 'max_participant', 'deadline', 'region', 'photo', 'content', 'tag_set', 'status', 'open_chat', 'comment_set', 'membership_set')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'meeting_set')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'date', 'comment_text', 'parent_meeting', 'writer')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('profile', 'checked', 'url', 'notification')

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('profile', 'meeting', 'created_at', 'status', 'message')
