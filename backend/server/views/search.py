from ..models import Meeting
from ..serializers import MeetingSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


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


class SearchLocation(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = None
    serializer_class = MeetingSerializer

    # Latitude and longitude must be included in the request
    def get(self, request, *args, **kwargs):
        data = request.data
        lat, long, dist = float(data['latitude']), float(data['longitude']), int(data['dist'])
        self.queryset = Meeting.distance_search(dist, lat, long)
        return self.list(request, *args, **kwargs)

class SearchTag(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):

        return self.list(request, *args, **kwargs)
