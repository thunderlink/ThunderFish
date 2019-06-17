from ..models import Meeting
from ..serializers import MeetingSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK


class SearchResult(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )
    queryset = None
    serializer_class = MeetingSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        dist_search_flag = data['dist_flag']
        title_search_flag = data['title_flag']
        tag_search_flag = data['tag_flag']
        result_serialized = {}

        result = Meeting.objects.filter(status=0)
        if title_search_flag == "true":
            result = result.filter(name__contains=data['keyword'])

        if tag_search_flag == "true":
            tag_list = data['tagword'].split()
            for tag in tag_list:
                result = result.filter(tag_set__name__contains=tag)

        if dist_search_flag == "true":
            lat, long, dist = float(data['latitude']), float(data['longitude']), int(data['dist'])
            ret = Meeting.distance_search(result, dist, lat, long)
            result_serialized['length'] = len(ret)
            for idx, item in enumerate(ret):
                result_serialized[idx] = MeetingSerializer(item[0]).data
        else:
            result_serialized['length'] = len(queryset)
            for idx, item in enumerate(queryset):
                result_serialized[idx] = MeetingSerializer(item).data

        return Response(result_serialized, status=HTTP_200_OK)
