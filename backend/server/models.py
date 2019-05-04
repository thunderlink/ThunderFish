from django.db import models
import re

# Path to default image
DEFAULT_IMAGE = '../../images/app_logo.png'
pic_folder = './migrations/pic_folder'

class User(models.Model):
    GENDER_MALE = 0
    GENDER_FEMALE = 1
    GENDER_CHOICES = [(GENDER_MALE, 'Male'), (GENDER_FEMALE, 'Female')]

    nickname = models.CharField(max_length=20)
    photo = models.ImageField(upload_to=pic_folder, default=DEFAULT_IMAGE)
    email = models.EmailField(max_length=30)
    name = models.CharField(max_length=50)
    gender = models.IntegerField(choices=GENDER_CHOICES, blank = True)
    region = models.CharField(max_length=100, blank = True)  # may not be necessary, use API ??
    introduce = models.CharField(max_length=200, blank = True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )

class Meeting(models.Model):
    STATUS_RECRUITING = 0
    STATUS_COMPLETE = 1
    STATUS_CANCELED = 2
    STATUS_CHOICES = [(STATUS_RECRUITING, 'Recruiting'), (STATUS_COMPLETE, 'Complete'), (STATUS_CANCELED, 'Canceled')]

    name = models.CharField(max_length=50)
    host = models.ForeignKey(User, related_name="meeting_hosted", on_delete=models.CASCADE)
    date = models.DateTimeField('meeting date')
    posted_date = models.DateTimeField('posted date')

    participant = models.ManyToManyField(User, through = 'Membership')
    # contributer - people who opened the meeting with the host
    max_participant = models.IntegerField()
    deadline = models.DateTimeField('meeting deadline')
    region = models.CharField(max_length=100, default="")
    photo = models.ImageField(upload_to=pic_folder, default=DEFAULT_IMAGE)
    content = models.CharField(max_length=500)
    tag_set = models.ManyToManyField('Tag', blank=True)
    status = models.IntegerField(choices=STATUS_CHOICES) # 1 as pending, 0 as complete ?
    open_chat = models.URLField(max_length=100, default="open")

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


class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Comment(models.Model):
    date = models.DateTimeField('commented date', auto_now_add=True)
    comment_text = models.CharField(max_length=1000, default="Test Text")
    # parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    parent_meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment_text

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    checked = models.BooleanField()
    url = models.URLField()
    notification = models.CharField(max_length = 100)

class Membership(models.Model):
    STATUS_WAITING = 0
    STATUS_APPROVED = 1
    STATUS_REJECTED = 2
    STATUS_CHOICES = [(STATUS_WAITING, 'waiting'), (STATUS_APPROVED, 'approved'), (STATUS_REJECTED, 'rejected')]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS_CHOICES)
    message = models.CharField(max_length = 500)

    class Meta:
        unique_together = (
            ('user', 'meeting')
        )
