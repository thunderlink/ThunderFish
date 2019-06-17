from django.db import models
from django.contrib.auth.models import User
import re
from math import sqrt

# Path to default image
DEFAULT_IMAGE = '../media/app_logo.png'
DEFAULT_PROFILE_IMG = 1
DEFAULT_MEETING_IMG = 2
MEDIA_URL = '/media/'
# Unique email for each user
User._meta.local_fields[7].__dict__['_unique'] = True

class Image(models.Model):
    profile = models.ImageField(blank=True, null=False, default=DEFAULT_IMAGE)
    title = models.CharField(max_length=100, blank=True)
    url = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return str(self.id)

class Profile(models.Model):
    GENDER_MALE = 0
    GENDER_FEMALE = 1
    GENDER_PRIVATE = 2
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female'), (GENDER_PRIVATE, 'Private')]

    user = models.OneToOneField(User, on_delete=models.DO_NOTHING)
    nickname = models.CharField(max_length=20)
    photo = models.ForeignKey(Image, related_name="profile_photo", on_delete=models.CASCADE, default=DEFAULT_PROFILE_IMG)
    # email = models.EmailField(max_length=30)
    name = models.CharField(max_length=50)
    gender = models.IntegerField(choices=GENDER_CHOICES, default=GENDER_PRIVATE)
    region = models.CharField(max_length=100, blank = True)  # may not be necessary, use API ??
    introduce = models.CharField(max_length=200, blank = True)

    def __str__(self):
        return self.nickname

    class Meta:
        ordering = ('name', )

class Meeting(models.Model):
    STATUS_RECRUITING = 0
    STATUS_COMPLETE = 1
    STATUS_CANCELED = 2
    STATUS_CHOICES = [(STATUS_RECRUITING, 'Recruiting'), (STATUS_COMPLETE, 'Complete'), (STATUS_CANCELED, 'Canceled')]

    name = models.CharField(max_length=50)
    host = models.ForeignKey(Profile, related_name="meeting_hosted", on_delete=models.DO_NOTHING)
    date = models.DateTimeField('meeting date')
    posted_date = models.DateTimeField('posted date', auto_now_add=True)

    participant = models.ManyToManyField(Profile, through = 'Membership')
    # contributer - people who opened the meeting with the host
    max_participant = models.IntegerField()
    deadline = models.DateTimeField('meeting deadline')
    region = models.CharField(max_length=100, blank=True)
    photo = models.ForeignKey(Image, related_name="meeting_photo", on_delete=models.CASCADE, default=DEFAULT_MEETING_IMG)
    content = models.CharField(max_length=500)
    tag_set = models.ManyToManyField('Tag', blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES) # 1 as pending, 0 as complete ?
    open_chat = models.URLField(max_length=100, blank=True) # remove default
    latitude = models.DecimalField(max_digits=30, decimal_places=15, default=0, blank=True)
    longitude = models.DecimalField(max_digits=30, decimal_places=15, default=0, blank=True)

    # content에서 tags를 추출하여, Tag 객체 가져오기, 신규 태그는 Tag instance 생성, 본인의 tag_set에 등록,
    # Question :    Does \w support korean?
    #               We should add exceptional control code for unvalid tag.
    def tag_save(self, tag_string):
        tags = re.findall(r'\b(\w+)\b', self.content)

        if not tags:
            return

        for t in tags:
            tag, tag_created = Tag.objects.get_or_create(name=t)
            self.tag_set.add(tag)

    def __str__(self):
        return self.name

    @staticmethod
    def distance_search(result, dist, lat, long):
        ## Returns list of meetings that is
        ## less than dist kilometers far from (latitude, longitude)
        ## Ordered by increasing distance
        ret = []
        for meet in result:
            delta_phi = abs(float(meet.latitude) - lat) ** 2
            delta_theta = abs(float(meet.longitude) - long) ** 2
            calculated_distance = float(6371 * sqrt(delta_phi + delta_theta))
            if calculated_distance <= dist:
                ret.append((result.get(pk=meet.id), calculated_distance))
        ret.sort(key = lambda item : item[1])
        print(ret)
        return ret

    class Meta:
        ordering = ['-id']


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    date = models.DateTimeField('commented date', auto_now_add=True)
    comment_text = models.CharField(max_length=1000, default="Test Text")
    # parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    parent_meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    writer = models.ForeignKey(Profile, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment_text

    # For notification 1 : New comment for host
    def save(self, *args, **kwargs):
        notification = Notification(meeting=self.parent_meeting, profile=self.parent_meeting.host, notification = Notification.NOTIFICATION_NEW_COMMENT_FOR_HOST)
        notification.save()
        super().save(*args, **kwargs)

# we should add url field.
class Notification(models.Model):
    NOTIFICATION_NEW_APPLY = 0
    NOTIFICATION_NEW_COMMENT_FOR_HOST = 1
    NOTIFICATION_APPLY_REJECTED = 2
    NOTIFICATION_APPLY_APPROVED = 3
    NOTIFICATION_CHOICES = [(NOTIFICATION_NEW_APPLY, 'new apply'), (NOTIFICATION_NEW_COMMENT_FOR_HOST, 'new comment for host'),(NOTIFICATION_APPLY_REJECTED, 'apply is rejected'),(NOTIFICATION_APPLY_APPROVED, 'apply is approved')]

    profile = models.ForeignKey(Profile,on_delete=models.CASCADE)
    checked = models.BooleanField(default=False)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, null=True)
    notification = models.IntegerField(choices=NOTIFICATION_CHOICES)

    def __str__(self):
        return str(self.profile)

    class Meta:
        ordering = ['checked', '-id']

class Membership(models.Model):
    STATUS_WAITING = 0
    STATUS_APPROVED = 1
    STATUS_REJECTED = 2
    STATUS_CHOICES = [(STATUS_WAITING, 'waiting'), (STATUS_APPROVED, 'approved'), (STATUS_REJECTED, 'rejected')]

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS_CHOICES)
    message = models.CharField(max_length = 500, null=True, blank=True)

    def __str__(self):
        return str(self.meeting.id) + '@' + str(self.profile.id)

    class Meta:
        unique_together = (
            ('profile', 'meeting')
        )

    # For notification 0 : New apply
    # For notification 2 : Apply rejected
    # For notification 3 : Apply approved
    def save(self, *args, **kwargs):
        if(self.pk==None):
            notification = Notification(meeting=self.meeting, profile=self.meeting.host, notification = Notification.NOTIFICATION_NEW_APPLY)
            notification.save()
        else:
            if(self.status == self.STATUS_CHOICES[1][0]):
                notification = Notification(meeting=self.meeting, profile=self.profile, notification = Notification.NOTIFICATION_APPLY_APPROVED)
                notification.save()
                print("Notify")
            elif(self.status == self.STATUS_CHOICES[2][0]):
                notification = Notification(meeting = self.meeting, profile = self.profile, notification = Notification.NOTIFICATION_APPLY_REJECTED)
                notification.save()
        super().save(*args, **kwargs)
