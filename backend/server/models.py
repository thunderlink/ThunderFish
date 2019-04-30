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
    # region
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
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField('meeting date')
    # participant
    # waiter
    max_participant = models.IntegerField()
    deadline = models.DateTimeField('meeting deadline')
    # region
    photo = models.ImageField(upload_to=pic_folder, default=DEFAULT_IMAGE)
    content = models.CharField(max_length=500)
    # tag
    status = models.IntegerField() # 1 as pending, 0 as complete ?
    # comment

    def __str__(self):
        return self.name

    class Meta:
        ordering = ('id', )

class Comment(models.Model):
    date = models.DateTimeField('comment date', auto_now_add=True)
    comment_text = models.CharField(max_length=1000, default="Test Text")
    # parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    parent_meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.comment_text

    class Meta:
        ordering = ('id', )
