from django.urls import path
from . import views

urlpatterns = [
    path('internal_all/', views.internal_all),
    path('external_migration/', views.external_migration),
    path('external_immigration/', views.external_immigration),
]