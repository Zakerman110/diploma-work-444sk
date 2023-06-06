from rest_framework import serializers
from .models import Gender, Education, Occupation, Status, Country, Flow, FlowDetails


class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class OccupationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occupation
        fields = '__all__'


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class FlowDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlowDetails
        fields = '__all__'


class FlowSerializer(serializers.ModelSerializer):
    flowdetails_set = FlowDetailsSerializer(many=True)

    class Meta:
        model = Flow
        fields = '__all__'

    def create(self, validated_data):
        flow_details_data = validated_data.pop('flowdetails_set')
        flow = Flow.objects.create(**validated_data)
        for flow_detail_data in flow_details_data:
            flow_detail_data['flow'] = flow
            FlowDetails.objects.create(**flow_detail_data)
        return flow
