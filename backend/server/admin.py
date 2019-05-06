from django.contrib import admin
from .models import Profile, Meeting, Tag, Comment, Notification, Membership

admin.site.register(Profile)
admin.site.register(Meeting)
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Notification)
admin.site.register(Membership)
