from ..models import Profile, Meeting, Tag, Membership
from ..serializers import MeetingSerializer, CommentSerializer, MembershipSerializer
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from ..permissions import MembershipAccess
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND


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
        request.data['tag'] = tag_set
        return self.create(request, *args, **kwargs)


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
            serialized_comment[str(comment.id)] = data
        # comment id,nickname is necessary!!!
        ret['comments'] = serialized_comment
        # Modify tag to return the tag name
        tag_name = []
        for tag_id in ret['tag_set']:
            tag_name.append(Tag.objects.get(id=tag_id).name)
        ret['tag_set'] = tag_name

        ## Serialize participant's profile id and name
        participants = {}
        for id in ret['participant']:
            profile = Profile.objects.get(pk=id)
            participants[str(id)] = {'id': id, 'name': profile.name}

        ret['participant'] = participants

        ## Membership
        waiting = {}
        approved = {}
        for id in ret['membership_set']:
            membership = Membership.objects.get(pk=id)
            profile = membership.profile
            if membership.status == 0:
                waiting[str(id)] = {'id': profile.id, 'name': profile.name, 'membership_id': id}
            elif membership.status == 1:
                approved[str(id)] = {'id': profile.id, 'name': profile.name, 'membership_id': id}

        ret['participant_waiting'] = waiting
        ret['participant_approved'] = approved

        return Response(ret, status=HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        meeting = Meeting.objects.get(pk=kwargs['pk'])
        old_meeting = MeetingSerializer(meeting).data

        if 'tag_set' in request.data:
            tag_set = request.data['tag_set'][0:]
            request.data['tag_set'] = []
            for tagname in tag_set:
                try:
                    tag = Tag.objects.get(name=tagname)
                    request.data['tag_set'].append(tag.id)
                except Tag.DoesNotExist:
                    ## Add new tag
                    t = Tag.objects.create(name=tagname)
                    request.data['tag_set'].append(t.id)

        # Refer to original data and
        # If the data is not in the request
        # Add to the request data
        for key in old_meeting:
            if key not in request.data:
                request.data[key] = old_meeting[key]

        print(request.data)
        return self.update(request, *args, **kwargs)


class JoinMeeting(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def post(self, request, *args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        profile_id = Token.objects.get(key=token).user.profile.id
        request.data['profile'] = profile_id # Set host as request profile's id
        request.data['meeting'] = kwargs['pk']
        request.data['status'] = 0 # Initially, status is waiting

        return self.create(request, *args, **kwargs)


class AcceptMeeting(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, MembershipAccess)
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def put(self, request, *args, **kwargs):
        membership = Membership.objects.get(pk=kwargs['pk'])
        request.data['profile'] = membership.profile.id
        request.data['meeting'] = kwargs['meeting']
        request.data['status'] = 1
        return self.update(request, *args, **kwargs)


class RejectMeeting(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, MembershipAccess)
    queryset = Membership.objects.all()
    serializer_class = MembershipSerializer

    def put(self, request, *args, **kwargs):
        membership = Membership.objects.get(pk=kwargs['pk'])
        request.data['profile'] = membership.profile.id
        request.data['meeting'] = kwargs['meeting']
        request.data['status'] = 2
        return self.update(request, *args, **kwargs)
