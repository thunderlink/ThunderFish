from ..models import Profile, Meeting, Membership, Notification
from ..serializers import ProfileSerializer, MeetingSerializer, NotificationSerializer
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from ..permissions import MembershipAccess


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
        ret = {'id': profile.id, 'nickname': profile.nickname, 'pic_url': profile.photo.url}
        return Response(ret, status=HTTP_200_OK)


class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get(self, request, *args, **kwargs):
        profile = Profile.objects.get(pk=kwargs['pk'])
        ret = ProfileSerializer(profile).data
        hosted = ret['meeting_hosted'][0:]
        ret['meeting_hosted'] = []
        for id in hosted:
            meet = Meeting.objects.get(pk=id)
            ret['meeting_hosted'].append(MeetingSerializer(meet).data)

        memb_set = ret['membership_set'][0:]
        ret['meeting_waiting_set'] = []
        ret['meeting_approved_set'] = []
        ret['meeting_rejected_set'] = []
        for memb_pk in memb_set:
            memb = Membership.objects.get(pk=memb_pk)
            meet = memb.meeting

            if memb.status == Membership.STATUS_WAITING:
                ret['meeting_waiting_set'].append(MeetingSerializer(meet).data)
            elif memb.status == Membership.STATUS_APPROVED:
                ret['meeting_approved_set'].append(MeetingSerializer(meet).data)
            elif memb.status == Membership.STATUS_REJECTED:
                ret['meeting_rejected_set'].append(MeetingSerializer(meet).data)
        return Response(ret, status=HTTP_200_OK)

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


# NOT USED NOW
class UserMeetingList(generics.ListCreateAPIView):
    queryset = None
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        user = Profile.objects.get(pk=kwargs['pk'])
        self.queryset = user.meeting_hosted.all()
        self.queryset.union(user.meeting_set.all(), all=False) # Needs to be modified
        return self.list(request, *args, **kwargs)

class UserNotificationList(generics.ListCreateAPIView):
    queryset = None
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, MembershipAccess)

    def get(self, request, *args, **kwargs):
        user = Profile.objects.get(pk=kwargs['pk'])
        self.queryset = user.notification_set.all()
        return self.list(request, *args, **kwargs)

class UserNotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def put(self, request, *args, **kwargs):
        notification = Notification.objects.get(pk=kwargs['pk'])
        notification.checked = True
        notification.save()
        return Response({"OK"}, status=HTTP_200_OK)
