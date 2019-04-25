from django.db import models

class User(models.Model):
    nickname = models.CharField(max_length=20)
    # photo = models.ImageField(height_field=200, width_field=200)
    email = models.EmailField(max_length=30)
    name = models.CharField(max_length=50)
    gender = models.IntegerField()
    # region
    introduce = models.CharField(max_length=200)
    # meeting_hosted
    # meeting_participated
    # comment

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ('name', )

class Meeting(models.Model):
    name = models.CharField(max_length=50)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField()
    # participant
    # waiter
    max_participant = models.IntegerField()
    deadline = models.DateTimeField()
    # region
    # photo = models.ImageField(height_field=200, width_field=200)
    content = models.CharField(max_length=500)
    # tag
    status = models.IntegerField()
    # comment

    class Meta:
        ordering = ('id', )

class Comment(models.Model):
    date = models.DateTimeField()
    # parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    parent_meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
    writer = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ('id', )
