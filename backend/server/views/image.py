from ..models import Image
from ..serializers import FileSerializer, ImageSerializer
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework.permissions import AllowAny

DEFAULT_IMAGE = "../../media/default-meeting.png"
PATH = "http://18.216.47.154:8000"

class ImageUploadView(APIView):
    permission_classes = (AllowAny, )
    parser_class = (FileUploadParser, )

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            file_serializer.save()
            img = Image.objects.get(pk=file_serializer.data['id'])
            img.url = PATH + img.profile.url
            img.save()
            return Response(ImageSerializer(img).data, status=HTTP_201_CREATED)
        else:
            return Response(file_serializer.data, status=HTTP_400_BAD_REQUEST)


class ImageViewSet(generics.RetrieveAPIView):
    permission_classes = (AllowAny, )
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

    def put(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)

        if file_serializer.is_valid():
            id = kwargs['pk']
            img = Image.objects.get(pk=id)
            img.profile = file_serializer.validated_data['profile']
            img.save()
            img.url = PATH + img.profile.url
            img.save()
            return Response(ImageSerializer(img).data, status=HTTP_201_CREATED)
        else:
            return Response({"Bad Request"}, status=HTTP_400_BAD_REQUEST)
