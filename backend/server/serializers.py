from rest_framework import serializers
from .models import Profile, Meeting, Tag, Comment, Notification, Membership, User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'nickname', 'photo', 'name', 'gender', 'region', 'introduce', 'meeting_hosted', 'meeting_set', 'comment_set', 'notification_set', 'membership_set')

class MeetingSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='host.nickname')
    class Meta:
        model = Meeting
        fields = ('id', 'name', 'host', 'nickname', 'date', 'posted_date', 'participant', 'max_participant', 'deadline', 'region', 'photo', 'content', 'tag_set', 'status', 'open_chat', 'comment_set', 'membership_set')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'meeting_set')

class CommentSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='writer.nickname')
    class Meta:
        model = Comment
        fields = ('id', 'date', 'comment_text', 'parent_meeting', 'writer', 'nickname')

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('profile', 'checked', 'url', 'notification')

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('profile', 'meeting', 'created_at', 'status', 'message')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def validate(self, data):
        # Validate the data given for registering
        return data
