from django.urls import path
from . import views

urlpatterns = [
    path('internal_all/', views.internal_all),
    path('external_all/', views.external_all),
]