from ..models import Meeting
from ..serializers import MeetingSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny


class SearchResult(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = None
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        data = request.data
        dist_search_flag = data['dist_flag']
        title_search_flag = data['title_flag']
        tag_search_flag = data['tag_flag']

        result = Meeting.objects.filter(status=0)
        if title_search_flag == "true":
            result = result.filter(name__contains=data['keyword'])

        if tag_search_flag == "true":
            result = result.filter(tag_set__name__contains=data['keyword'])
            ## Multiple Tag should be implemented

        if dist_search_flag == "true":
            lat, long, dist = float(data['latitude']), float(data['longitude']), int(data['dist'])
            result = Meeting.distance_search(result, dist, lat, long)

        self.queryset = result
        return self.list(request, *args, **kwargs)
