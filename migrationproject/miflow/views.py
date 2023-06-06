import pandas as pd

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import predict_internal_migration, predict_external_migration, predict_internal_oblast_migration


@api_view(['GET'])
def internal_all(request):
    start_date = request.query_params['start_date']
    end_date = request.query_params['end_date']

    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    df = predict_internal_migration(start_date, end_date)

    data = df.to_dict(orient='records')

    return Response(data)


@api_view(['GET'])
def internal_oblast(request):
    start_date = request.query_params['start_date']
    end_date = request.query_params['end_date']
    oblast = request.query_params['oblast']

    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    df = predict_internal_oblast_migration(oblast, start_date, end_date)

    data = df.to_dict(orient='records')

    return Response(data)


@api_view(['GET'])
def external_migration(request):
    start_date = request.query_params['start_date']
    end_date = request.query_params['end_date']

    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    df = predict_external_migration('ukraine_inter_in.sav', start_date, end_date)

    data = df.to_dict(orient='records')

    return Response(data)


@api_view(['GET'])
def external_immigration(request):
    start_date = request.query_params['start_date']
    end_date = request.query_params['end_date']

    start_date = pd.to_datetime(start_date)
    end_date = pd.to_datetime(end_date)

    df = predict_external_migration('ukraine_inter_out.sav', start_date, end_date)

    data = df.to_dict(orient='records')

    return Response(data)

