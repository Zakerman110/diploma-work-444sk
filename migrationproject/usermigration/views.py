from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Gender, Education, Occupation, Status, Country
from .serializers import GenderSerializer, EducationSerializer, OccupationSerializer, StatusSerializer, \
    CountrySerializer, FlowSerializer, FlowResponseSerializer


@api_view(['GET'])
def get_genders(request):
    genders = Gender.objects.all()
    serializer = GenderSerializer(genders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_educations(request):
    educations = Education.objects.all()
    serializer = EducationSerializer(educations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_occupations(request):
    occupations = Occupation.objects.all()
    serializer = OccupationSerializer(occupations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_statuses(request):
    statuses = Status.objects.all()
    serializer = StatusSerializer(statuses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_countries(request):
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_flow(request):
    user = request.user
    flows = user.flow_set.all()
    serializer = FlowResponseSerializer(flows, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def flow_create(request):
    user = request.user
    flow_data = request.data
    flow_data['status'] = 1
    flow_data['user'] = user.id
    serializer = FlowSerializer(data=flow_data)
    if serializer.is_valid():
        flow = serializer.save()
        return Response({'message': 'Flow created successfully', 'flow_id': flow.id})
    return Response(serializer.errors, status=400)
