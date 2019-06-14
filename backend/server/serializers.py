from rest_framework import serializers
from .models import Profile, Meeting, Tag, Comment, Notification, Membership, User, Image

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    profile = serializers.ImageField(
        max_length=None, use_url=True
    )

    class Meta:
        model = Image
        fields = ('id', 'profile', 'title')

class ProfileSerializer(serializers.ModelSerializer):
    pic_url = serializers.ReadOnlyField(source='photo.profile.url')
    class Meta:
        model = Profile
        fields = ('id', 'user', 'nickname', 'photo', 'name', 'gender', 'region', 'introduce', 'meeting_hosted', 'meeting_set', 'comment_set', 'notification_set', 'membership_set', 'pic_url')

class MeetingSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='host.nickname')
    pic_url = serializers.ReadOnlyField(source='photo.profile.url')
    # participant_waiting = serializers.ReadOnlyField(source='participant.through_fields.filter(status=0)')
    # participant_approved = serializers.ReadOnlyField(source='participant.through_fields.filter(status=1)')

    class Meta:
        model = Meeting
        fields = ('id', 'name', 'host', 'nickname', 'date', 'posted_date', 'participant', 'max_participant', 'deadline', 'region', 'photo', 'content', 'tag_set', 'status', 'open_chat', 'comment_set', 'membership_set', 'latitude', 'longitude', 'pic_url')

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
    prof = ProfileSerializer(required=False)

    class Meta:
        model = Notification
        fields = ('prof','pk', 'checked', 'meeting', 'notification')

class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = ('id', 'profile', 'meeting', 'created_at', 'status', 'message')

class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(many=True, queryset=Profile.objects.all())
    meetings = serializers.PrimaryKeyRelatedField(many=True, queryset=Meeting.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'profile')

    def validate(self, data):
        # Validate the data given for registering
        return data
