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

class ImageUploadView(APIView):
    permission_classes = (AllowAny, )
    parser_class = (FileUploadParser, )

    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        print(file_serializer)

        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(file_serializer.data, status=HTTP_400_BAD_REQUEST)

class ImageViewSet(generics.RetrieveAPIView):
    permission_classes = (AllowAny, )
    queryset = Image.objects.all()
    serializer_class = ImageSerializer

# Create your views here.
