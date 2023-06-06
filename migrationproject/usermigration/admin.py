from django.contrib import admin

from .models import Gender, Education, Occupation, Status, Country, Flow, FlowDetails

admin.site.register(Gender)
admin.site.register(Education)
admin.site.register(Occupation)
admin.site.register(Status)
admin.site.register(Country)
admin.site.register(Flow)
admin.site.register(FlowDetails)
