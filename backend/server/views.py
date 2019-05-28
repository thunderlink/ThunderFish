from .models import Profile, Meeting, Comment, Notification, User, Tag
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
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
)

class ProfileList(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class GetProfile(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get(self, request, *args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        profile = Token.objects.get(key=token).user.profile
        ret = {'id': profile.id, 'nickname': profile.nickname}
        return Response(ret, status=HTTP_200_OK)

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def put(self, request, *args, **kwargs):
        profile = Profile.objects.get(pk=kwargs['pk'])
        old_profile = ProfileSerializer(profile).data

        # Refer to original data and
        # If the data is not in the request
        # Add to the request data
        for key in old_profile:
            if key not in request.data:
                request.data[key] = old_profile[key]

        print(request.data)
        return self.update(request, *args, **kwargs)



class MeetingList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def post(self, request, *args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        profile_id = Token.objects.get(key=token).user.profile.id
        request.data['host'] = profile_id # Set host as request profile's id
        request.data['comment_set'] = [] # Initially, no comments
        request.data['membership_set'] = [] # Initially, no membership
        request.data['status'] = "0" # Initially, status is recruiting
        tag_list = request.data['tag'].split()
        tag_set = []
        for tag in tag_list:
            tag_obj = Tag.objects.filter(name=tag)
            if len(tag_obj) == 0: # Tag doesn't exist, create new tag
                t = Tag.objects.create(name=tag)
                tag_set.append(t.id)
            else:
                tag_set.append(tag_obj[0].id)
        request.data['tag_set'] = tag_set
        return self.create(request, *args, **kwargs)

    # Post Works
    # http -v POST http://127.0.0.1:8000/meetings/ name="testing meeting" "Authorization: Token 59d34519edd8475b86dad8ad0ce0d92e75019c8e" max_participant="5" content="Test Meeting Content" date="2018-01-01T00:00:00+09:00" deadline="2019-05-15T17:47:18.999698Z" tag_set:='[3, 4]'

class RecentMeetingList(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        idx = kwargs['id']
        start_idx = (idx - 1) * 10
        end_idx = idx * 10
        self.queryset = Meeting.objects.all()[start_idx:end_idx]
        return self.list(request, *args, **kwargs)

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        ret = {}
        try:
            meeting = Meeting.objects.get(pk=kwargs['pk'])
        except:
            return Response({"Meeting does not exist"}, status=HTTP_404_NOT_FOUND)
        ret = MeetingSerializer(meeting).data
        comment_set = meeting.comment_set.all()
        print(comment_set)
        serialized_comment = {}
        for comment in comment_set:
            data = CommentSerializer(comment).data
            data.pop('parent_meeting', None)
            data.pop('writer', None)
            serialized_comment[str(comment.id)] = data
        # comment id,nickname is necessary!!!
        ret['comments'] = serialized_comment
        # Modify tag to return the tag name
        tag_name = []
        for tag_id in ret['tag_set']:
            tag_name.append(Tag.objects.get(id=tag_id).name)
        ret['tag_set'] = tag_name
        return Response(ret, status=HTTP_200_OK)

    # DELETE works
    # http -v DELETE http://127.0.0.1:8000/meetings/7/ "Authorization: Token 59d34519edd8475b86dad8ad0ce0d92e75019c8e"

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def put(self, request, *args, **kwargs):
        comment = Comment.objects.get(pk=kwargs['pk'])
        request.data['parent_meeting'] = comment.parent_meeting.id
        request.data['writer'] = comment.writer.id
        return self.update(request, *args, **kwargs)

    # Put Works
    # http -v PUT http://127.0.0.1:8000/comment/1/ comment_text='수정할 댓글' parent_meeting='1' writer='3'
    # http -v PUT http://127.0.0.1:8000/comment/1/ "Authorization: Token 4a015be3f94e08809fed54b07c9520009b41098a" comment_text='수정할 댓글2' parent_meeting='1' writer='3'

class CommentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        profile = Token.objects.get(pk=token).user.profile
        request.data['writer'] = profile.id
        return self.create(request, *args, **kwargs)

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
    permission_classes = (AllowAny, )
    queryset = None
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        name_result = Meeting.objects.filter(name__contains=kwargs['keyword'])
        print(kwargs['keyword'])
        tag_result = Meeting.objects.filter(tag_set__name__contains=kwargs['keyword'])
        result = name_result | tag_result
        self.queryset = result.distinct()
        print(self.queryset)
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
    print(user.id)
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
            return Response({"A user with that email already exists."}, status=HTTP_403_FORBIDDEN)

        Profile.objects.create(user_id=user.id, nickname=data['nickname'], name=data['name'])
        return Response(status=HTTP_201_CREATED)

    # http -v POST http://127.0.0.1:8000/signup/ email="cd@example.com" password="123" nickname="cxz" name="zxc zxc"
