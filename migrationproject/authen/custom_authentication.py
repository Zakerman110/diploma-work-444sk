from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions
import jwt

from .models import User
import environ

env = environ.Env()
environ.Env.read_env()


class CustomTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION')
        if not auth:
            return None

        auth_parts = auth.split()
        if len(auth_parts) != 2 or auth_parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Invalid token format.')

        token = auth_parts[1]

        try:
            payload = jwt.decode(token, env('ACCESS_TOKEN_SECRET'), algorithms='HS256')
            user_id = payload['user_id']

            # Retrieve the user object based on the user_id
            user = User.objects.get(id=user_id)

            return user, token

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired.')

        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed('Invalid token.')

    def authenticate_header(self, request):
        return 'Bearer'
