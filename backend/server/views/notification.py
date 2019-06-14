from ..models import Notification
from ..serializers import NotificationSerializer
from rest_framework import permissions, generics
from ..permissions import MembershipAccess



class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def put(self, request, *args, **kwargs):
        notification = Notification.objects.get(pk=kwargs['pk'])
        notification.checked = True
        notification.save()
        return self.update(request, *args, **kwargs)
