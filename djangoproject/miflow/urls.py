from django.urls import path
from . import views

urlpatterns = [
    path('internal_all/', views.internal_all),
]