from django.forms import ModelForm

from .models import Flow


class UpdateFlowStatus(ModelForm):

    class Meta:
        model = Flow
        fields = ['id', 'status']
