from .models import Profile, Meeting, Comment, Notification, User
from .serializers import ProfileSerializer, MeetingSerializer, CommentSerializer, NotificationSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status, permissions, generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .permissions import IsOwner
from django.db.utils import IntegrityError


from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class MeetingList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def post(self, request, *args, **kwargs):
        request.data['host'] = request.user.id # Set host as request user's id
        request.data['comment_set'] = [] # Initially, no comments
        request.data['membership_set'] = [] # Initially, no membership
        request.data['status'] = "0" # Initially, status is recruiting
        return self.create(request, *args, **kwargs)

    # Post Works
    # http -v POST http://127.0.0.1:8000/meetings/ name="testing meeting" "Authorization: Token 59d34519edd8475b86dad8ad0ce0d92e75019c8e" max_participant="5" content="Test Meeting Content" date="2018-01-01T00:00:00+09:00" deadline="2019-05-15T17:47:18.999698Z" tag_set:='[3, 4]'


class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    # DELETE works
    # http -v DELETE http://127.0.0.1:8000/meetings/7/ "Authorization: Token 59d34519edd8475b86dad8ad0ce0d92e75019c8e"

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Put Works
    # http -v PUT http://127.0.0.1:8000/comment/1/ comment_text='수정할 댓글' parent_meeting='1' writer='3'
    # http -v PUT http://127.0.0.1:8000/comment/1/ "Authorization: Token 4a015be3f94e08809fed54b07c9520009b41098a" comment_text='수정할 댓글2' parent_meeting='1' writer='3'

class CommentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
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
        user = Profile.objects.get(pk=kwargs['pk'])
        self.queryset = user.meeting_hosted.all()
        self.queryset.union(user.meeting_set.all(), all=False) # Needs to be modified
        return self.list(request, *args, **kwargs)


class SearchResult(generics.ListCreateAPIView):
    queryset = None
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Meeting.objects.filter(name__contains=kwargs['keyword'])
        self.queryset.union(Meeting.objects.filter(tag_set__name__contains=kwargs['keyword']), all=False)
        return self.list(request, *args, **kwargs)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def Login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({"error": "Error!"}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error", "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    key = {'token': token.key}
    profile = Profile.objects.get(pk=user.profile.id) # get user's profile 
    ret = {**ProfileSerializer(profile).data, **key} # Merge two dictionaries
    return Response(ret, status=HTTP_200_OK)

    # Post Works
    # http -v POST http://127.0.0.1:8000/signin/ username="test2" password="doffltmqkqh"

class Register(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.create_user(username=data['email'], password=request.data['password'], email=data['email'])
        except IntegrityError:
            return Response({"A user with that email already exists."}, status=HTTP_400_BAD_REQUEST)
        
        Profile.objects.create(user_id=user.id, nickname=data['nickname'], name=data['name'])
        return Response(status=HTTP_200_OK)

    # http -v POST http://127.0.0.1:8000/signup/ email="cd@example.com" password="123" nickname="cxz" name="zxc zxc"

import requests
class Kakao(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)



    def req(access_token):
        #https://developers.kakao.com/docs/restapi/user-management#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EB%B3%B4-%EC%9A%94%EC%B2%AD
        #https://devlog.jwgo.kr/2017/11/09/how-to-call-rest-api/ 참고
        url = 'https://kapi.kakao.com/v2/user/me'
        headers = {'Authorization': 'Bearer {0}'.format(access_token),
                   'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
                }

        #property_keys = ["kakao_account.email", "kakao_account.gender"];
        return requests.get(url, headers=headers)


    def post(self, request, *args, **kwargs):

        access_token = request.access_token

        resp = req(access_token)

        email = resp.kakao_account['email']
        nickname = resp.properties['nickname']
        gender = resp.kakao_account['gender']
        name =  None#resp.

        try:
            user, created = self.model.objects.get_or_create(username=email,
                            password=None,email=email)
            if created:  # 사용자 생성할 경우
                Profile.objects.create(user_id=user.id, nickname=nickname, name=name)

            user.is_active = True
            user.save()

        except IntegrityError:
            return Response({"Kakao login error"}, status=HTTP_400_BAD_REQUEST)

        if not user:
            return Response({"error", "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
        token, _ = Token.objects.get_or_create(user=user)
        key = {'token': token.key}
        profile = Profile.objects.get(pk=user.profile.id)  # get user's profile
        ret = {**ProfileSerializer(profile).data, **key}  # Merge two dictionaries
        return Response(ret, status=HTTP_200_OK)

    # http -v POST http://127.0.0.1:8000/signup/ email="cd@example.com" password="123" nickname="cxz" name="zxc zxc"
