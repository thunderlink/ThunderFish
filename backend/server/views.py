from .models import User, Meeting, Comment
from .serializers import UserSerializer, MeetingSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all();
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all();
    serializer_class = UserSerializer

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all();
    serializer_class = MeetingSerializer

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all();
    serializer_class = MeetingSerializer
