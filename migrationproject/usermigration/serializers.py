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
        fields = ['age', 'income', 'gender', 'education', 'occupation']


class FlowSerializer(serializers.ModelSerializer):
    flowdetails_set = FlowDetailsSerializer(many=True)

    class Meta:
        model = Flow
        fields = '__all__'

    def create(self, validated_data):
        flow_details_data = validated_data.pop('flowdetails_set')
        flow = Flow.objects.create(**validated_data)
        for flow_detail_data in flow_details_data:
            FlowDetails.objects.create(flow=flow, **flow_detail_data)
        return flow


class FlowDetailsResponseSerializer(serializers.ModelSerializer):
    gender = serializers.StringRelatedField()
    education = serializers.StringRelatedField()
    occupation = serializers.StringRelatedField()

    class Meta:
        model = FlowDetails
        fields = ['age', 'income', 'gender', 'education', 'occupation']


class FlowResponseSerializer(serializers.ModelSerializer):
    status = serializers.StringRelatedField()
    from_country = serializers.StringRelatedField()
    to_country = serializers.StringRelatedField()
    flowdetails_set = FlowDetailsResponseSerializer(many=True)

    class Meta:
        model = Flow
        fields = ['id', 'start_date', 'end_date', 'description', 'status', 'from_country', 'to_country', 'user', 'flowdetails_set']

