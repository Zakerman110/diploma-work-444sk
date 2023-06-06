from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register),
    path('login/', views.login),
    path('user/', views.user),
    path('refresh/', views.refresh),
    path('logout/', views.logout),
]