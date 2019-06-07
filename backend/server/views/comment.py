from ..models import Comment
from ..serializers import CommentSerializer
from rest_framework.response import Response
from rest_framework import permissions, generics
from rest_framework.authtoken.models import Token
from rest_framework.status import HTTP_403_FORBIDDEN


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def put(self, request, *args, **kwargs):
        comment = Comment.objects.get(pk=kwargs['pk'])
        ## Check if the request was sent by the writer
        token = request.headers['Authorization'].split()[1]
        id = Token.objects.get(pk=token).user.profile
        if comment.writer != id:
            return Response({"You don't have permissions to perform this action."}, status=HTTP_403_FORBIDDEN)

        request.data['parent_meeting'] = comment.parent_meeting.id
        request.data['writer'] = comment.writer.id
        return self.update(request, *args, **kwargs)


class CommentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def post(self, request, *args, **kwargs):
        token = request.headers['Authorization'].split()[1]
        profile = Token.objects.get(pk=token).user.profile
        request.data['writer'] = profile.id
        return self.create(request, *args, **kwargs)
