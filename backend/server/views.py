from .models import Profile, Meeting, Comment
from .serializers import ProfileSerializer, MeetingSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all();
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all();
    serializer_class = ProfileSerializer

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all();
    serializer_class = MeetingSerializer

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all();
    serializer_class = MeetingSerializer
