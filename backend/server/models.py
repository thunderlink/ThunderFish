from django.db import models

# Path to default image
DEFAULT_IMAGE = '../../images/app_logo.png'
pic_folder = './migrations/pic_folder'

class User(models.Model):
    nickname = models.CharField(max_length=20)
    photo = models.ImageField(upload_to=pic_folder, default=DEFAULT_IMAGE)
    email = models.EmailField(max_length=30)
    name = models.CharField(max_length=50)
    gender = models.IntegerField()
    region = models.CharField(max_length=100, default="")  # may not be necessary, use API ??
    introduce = models.CharField(max_length=200)
    # meeting_hosted
    # meeting_participated
    # comment

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('name', )

class Meeting(models.Model):
    name = models.CharField(max_length=50)
    host = models.ForeignKey(User, related_name="meeting_hosted", on_delete=models.CASCADE)
    date = models.DateTimeField('meeting date')
    participant = models.ManyToManyField(User, related_name="meeting_participated")
    waiter = models.ManyToManyField(User, related_name="meeting_waiting")
    # contributer - people who opened the meeting with the host
    max_participant = models.IntegerField()
    deadline = models.DateTimeField('meeting deadline')
    region = models.CharField(max_length=100, default="")
    photo = models.ImageField(upload_to=pic_folder, default=DEFAULT_IMAGE)
    content = models.CharField(max_length=500)
    # tag : Array of chars
    status = models.IntegerField() # 1 as pending, 0 as complete ?
    open_chat = models.URLField(max_length=100, default="open")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('id', )

class Comment(models.Model):
    date = models.DateTimeField('comment date', auto_now_add=True)
    comment_text = models.CharField(max_length=1000, default="Test Text")
    # parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    parent_meeting = models.ForeignKey(Meeting, related_name="comments", on_delete=models.CASCADE)
    writer = models.ForeignKey(User, related_name="my_comments", on_delete=models.CASCADE)

    def __str__(self):
        return self.comment_text

    class Meta:
        ordering = ('id', )
