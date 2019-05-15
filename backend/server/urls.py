from django.urls import path
from . import views

urlpatterns = [
    # path('signin/', views.) #GET으로 auth하고, user 정보를 GET
    # path('signup/', views.) #signup한다.
    path('user/<int:pk>/', views.ProfileDetail.as_view()),
    path('user/<int:pk>/meetings', views.)
    path('meetings/', views.MeetingList.as_view()),
    path('meetings/<int:pk>/', views.MeetingDetail.as_view()),
    path('meetings/<int:pk>/join/', views) #POST, PUT, DELETE
    path('search/', views.) #GET
    path('comment/<int:pk>/', views.) #POST, PUT, DELETE
    path('notification/<int:pk>/', views. ) #GET, DELETE
]
