from django.urls import path
from . import views

urlpatterns = [
    # path('signin/', views.) #GET으로 auth하고, user 정보를 GET
    # path('signup/', views.) #signup한다.
    path('user/<int:pk>/', views.ProfileDetail.as_view()),
    path('user/<int:pk>/meetings', views.UserMeetingList.as_view()),
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    # path('meetings/<int:pk>/join/', views) #POST, PUT, DELETE
    path('search/<str:keyword>', views.SearchResult.as_view()), #GET
    path('comment/', views.CommentList.as_view()), # POST, should be here
    path('comment/<int:pk>/', views.CommentDetail.as_view()), #POST, PUT, DELETE
    path('notification/<int:pk>/', views.NotificationDetail.as_view()) #GET, DELETE
]
