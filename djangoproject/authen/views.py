from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .authentication import create_access_token, create_refresh_token, is_authenticated, decode_refresh_token
from .serializers import UserSerializer
from .models import User


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def login(request):
    user = User.objects.filter(email=request.data['email']).first()

    if not user:
        raise PermissionDenied('Invalid credentials!')

    if not user.check_password(request.data['password']):
        raise PermissionDenied('Invalid credentials!')

    access_token = create_access_token(user)
    refresh_token = create_refresh_token(user)

    response = Response()

    response.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
    response.data = {
        'token': access_token
    }

    return response


@api_view(['GET'])
def user(request):
    is_auth, user = is_authenticated(request)
    if is_auth:
        return Response(UserSerializer(user).data)


@api_view(['POST'])
def refresh(request):
    refresh_token = request.COOKIES.get('refreshToken')
    id = decode_refresh_token(refresh_token)
    access_token = create_access_token(id)
    return Response({
        'token': access_token
    })

@api_view(['POST'])
def logout(request):
    response = Response()
    response.delete_cookie(key='refreshToken')
    response.data = {
        'message': 'success'
    }
    return response
