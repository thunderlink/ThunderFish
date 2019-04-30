from django.contrib import admin
from .models import User, Meeting, Comment

admin.site.register(User)
admin.site.register(Meeting)
admin.site.register(Comment)
