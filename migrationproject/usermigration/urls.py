from django.urls import path
from . import views

urlpatterns = [
    path('genders/', views.get_genders),
    path('educations/', views.get_educations),
    path('occupations/', views.get_occupations),
    path('statuses/', views.get_statuses),
    path('countries/', views.get_countries),
    path('flow/', views.get_user_flow),
    path('flow_create/', views.flow_create),
]