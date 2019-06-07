from django.urls import path
from . import views

urlpatterns = [
    path('signin/', views.Login), # POST username and password to receive token and user info
    path('signup/', views.Register.as_view()), # Sign Up through POST
    path('kakao/', views.Kakao.as_view()), # Kakao Sign Up or Sign In through POST
    path('user/', views.GetProfile.as_view()), # Get profile
    path('user/<int:pk>/', views.ProfileDetail.as_view()), # My page
    path('user/<int:pk>/meetings/', views.UserMeetingList.as_view()),
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/new/<int:id>/', views.RecentMeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    path('meetings/<int:pk>/membership/', views.MembershipList.as_view()),
    path('meetings/<int:pk_meetings>/membership/<int:pk_mempership>', view.MembershipDetail.as_view()),
    # path('meetings/<int:pk>/join/', views) #POST, PUT, DELETE
    path('search/<str:keyword>/', views.SearchResult.as_view()), #GET
    path('searchdist/<int:dist>/', views.SearchLocation.as_view()), # GET, search by location, distance
    path('comment/', views.CommentList.as_view()), # POST, should be here
    path('comment/<int:pk>/', views.CommentDetail.as_view()), # PUT, DELETE
    path('notification/<int:pk>/', views.NotificationDetail.as_view()) #GET, DELETE
]
