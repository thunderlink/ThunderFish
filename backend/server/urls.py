from django.urls import path
from . import views

urlpatterns = [
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    path('user/', views.ProfileList.as_view()),
    path('user/<int:pk>/', views.ProfileDetail.as_view()),
]
