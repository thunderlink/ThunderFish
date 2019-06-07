from ..models import Profile, User
from ..serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.db.utils import IntegrityError
from hashlib import sha256
import requests

from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_201_CREATED,
)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def Login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({"error": "Error!"}, status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error", "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    key = {'token': token.key}
    profile = Profile.objects.get(pk=user.profile.id) # get user's profile
    ret = {**ProfileSerializer(profile).data, **key} # Merge two dictionaries
    return Response(ret, status=HTTP_200_OK)


class Register(generics.ListCreateAPIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.create_user(username=data['email'], password=request.data['password'], email=data['email'])
        except IntegrityError:
            return Response({"A user with that email already exists."}, status=HTTP_403_FORBIDDEN)

        Profile.objects.create(user_id=user.id, nickname=data['nickname'], name=data['name'])
        return Response(status=HTTP_201_CREATED)


class Kakao(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)

    def req(self, access_token):
        #https://developers.kakao.com/docs/restapi/user-management#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EB%B3%B4-%EC%9A%94%EC%B2%AD
        #https://devlog.jwgo.kr/2017/11/09/how-to-call-rest-api/ 참고
        url = 'https://kapi.kakao.com/v2/user/me'
        headers = {'Authorization': 'Bearer {0}'.format(access_token),
                   'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
                }

        return requests.get(url, headers=headers)

    def post(self, request, *args, **kwargs):
        access_token = request.data['access_token']

        resp = self.req(access_token)
        print(resp.json())

        resp = resp.json()

        email = resp['kakao_account']['email']
        nickname = resp['properties']['nickname']
        name = nickname

        try:
            user, created = User.objects.get_or_create(username=email,
                            password=sha256(email.encode()).hexdigest(),email=email)
            if created:  # 사용자 생성할 경우
                Profile.objects.create(user_id=user.id, nickname=nickname, name=name)

            user.is_active = True
            user.save()
        except IntegrityError:
            return Response({"Kakao login error"}, status=HTTP_400_BAD_REQUEST)

        if not user:
            return Response({"error", "Invalid Credentials"}, status=HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        print(token, _)
        key = {'token': token.key}
        print(user)
        profile = Profile.objects.get(pk=user.profile.id)  # get user's profile
        ret = {**ProfileSerializer(profile).data, **key}  # Merge two dictionaries
        return Response(ret, status=HTTP_200_OK)
