from ..models import Notification
from ..serializers import NotificationSerializer
from rest_framework import generics


class NotificationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
