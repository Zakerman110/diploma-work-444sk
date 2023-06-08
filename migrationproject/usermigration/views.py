from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import exceptions

from .forms import UpdateFlowStatus
from .models import Gender, Education, Occupation, Status, Country, Flow, FlowDetails
from .serializers import GenderSerializer, EducationSerializer, OccupationSerializer, StatusSerializer, \
    CountrySerializer, FlowSerializer, FlowResponseSerializer, FlowDetailsAllSerializer


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_flow(request):
    user = request.user
    if not user.is_superuser:
        raise exceptions.AuthenticationFailed('unauthorized')
    flows = Flow.objects.all()
    serializer = FlowResponseSerializer(flows, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_flow_details(request):
    user = request.user
    if not user.is_superuser:
        raise exceptions.AuthenticationFailed('unauthorized')
    flow_details = FlowDetails.objects.all()
    serializer = FlowDetailsAllSerializer(flow_details, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_status(request):
    user = request.user
    if not user.is_superuser:
        raise exceptions.AuthenticationFailed('unauthorized')
    form = UpdateFlowStatus(request.data)
    if not form.is_valid():
        return Response(form.errors, status=400)

    flow_id = form.data.get('id')
    try:
        flow = Flow.objects.get(id=flow_id)
    except Flow.DoesNotExist:
        return Response({"message": "Flow not found"}, status=404)

    if request.method == 'PUT':
        new_status = form.cleaned_data.get('status')
        flow.status = new_status
        flow.save()

        return Response({"message": "Flow status updated successfully"}, status=200)


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
