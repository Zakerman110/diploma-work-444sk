from django.shortcuts import render
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_genders(request):
    pass


@api_view(['GET'])
def get_educations(request):
    pass


@api_view(['GET'])
def get_occupations(request):
    pass


@api_view(['GET'])
def get_statuses(request):
    pass


@api_view(['GET'])
def get_countries(request):
    pass


@api_view(['GET'])
def get_user_flow(request):
    pass
