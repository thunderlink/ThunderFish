from .models import Profile, Meeting, Comment, Notification
from .serializers import ProfileSerializer, MeetingSerializer, CommentSerializer, NotificationSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Put Works
    # http -v PUT http://127.0.0.1:8000/comment/1/ comment_text='수정할 댓글' parent_meeting='1' writer='3'

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Post Works
    # http -v POST http://127.0.0.1:8000/comment/ comment_text='테스트 댓글' parent_meeting='1' writer='2'


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class UserMeetingList(generics.ListCreateAPIView):
    queryset = None
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        print(request)
        user = Profile.objects.filter(pk=kwargs['pk'])[0]
        self.queryset = user.meeting_hosted.all()
        self.queryset = self.queryset | user.meeting_set.all() # Needs to be modified
        return self.list(request, *args, **kwargs)
