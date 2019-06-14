from django.urls import path
# from . import views
from .views import *

urlpatterns = [
    path('signin/', Login), # POST username and password to receive token and user info
    path('signup/', Register.as_view()), # Sign Up through POST
    path('kakao/', Kakao.as_view()), # Kakao Sign Up or Sign In through POST
    path('user/', GetProfile.as_view()), # Get profile
    path('user/<int:pk>/', ProfileDetail.as_view()), # My page
    path('user/<int:pk>/meetings/', UserMeetingList.as_view()),
    path('meetings/', MeetingList.as_view()),
    path('meetings/new/<int:id>/', RecentMeetingList.as_view()),
    path('meetings/<int:pk>/', MeetingDetail.as_view()),
    path('meetings/<int:pk>/join/', JoinMeeting.as_view()),
    path('meetings/<int:meeting>/accept/<int:pk>/', AcceptMeeting.as_view()),
    path('meetings/<int:meeting>/reject/<int:pk>/', RejectMeeting.as_view()),
    # path('meetings/<int:pk>/join/', views) #POST, PUT, DELETE
    path('search/<str:keyword>/', SearchResult.as_view()), #GET
    path('searchdist/<int:dist>/', SearchLocation.as_view()), # GET, search by location, distance
    path('comment/', CommentList.as_view()), # POST, should be here
    path('comment/<int:pk>/', CommentDetail.as_view()), # PUT, DELETE
    path('notification/<int:pk>/', NotificationDetail.as_view()), #GET, DELETE
    path('image/', ImageUploadView.as_view()), # post images here
    path('image/<int:pk>/', ImageViewSet.as_view()),
]
