import datetime
import os

import jwt
from rest_framework import exceptions
from rest_framework.authentication import get_authorization_header

from .models import User


def create_access_token(user):
    return jwt.encode({
        'user_id': user.id,
        'name': user.name,
        'email': user.email,
        'is_superuser': user.is_superuser,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=3600),
        'iat': datetime.datetime.utcnow()
    }, os.environ.get('ACCESS_TOKEN_SECRET'), algorithm='HS256')


def decode_access_token(token):
    try:
        payload = jwt.decode(token, os.environ.get('ACCESS_TOKEN_SECRET'), algorithms='HS256')

        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed('unauthenticated')


def create_refresh_token(user):
    return jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }, os.environ.get('REFRESH_TOKEN_SECRET'), algorithm='HS256')


def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, os.environ.get('REFRESH_TOKEN_SECRET'), algorithms='HS256')

        return payload['user_id']
    except:
        raise exceptions.AuthenticationFailed('unauthenticated')


def is_authenticated(request):
    auth = get_authorization_header(request).split()

    if auth and len(auth) == 2:
        token = auth[1].decode('utf-8')
        id = decode_access_token(token)

        user = User.objects.filter(pk=id).first()

        return True, user

    raise exceptions.AuthenticationFailed('unauthenticated')
