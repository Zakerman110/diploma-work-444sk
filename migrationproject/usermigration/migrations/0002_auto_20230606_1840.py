# Generated by Django 4.2.1 on 2023-06-06 15:40

from django.db import migrations


def insert_initial_data(apps, schema_editor):
    gender = apps.get_model('usermigration', 'Gender')
    gender.objects.create(name='Male')
    gender.objects.create(name='Female')
    gender.objects.create(name='Other')

    education = apps.get_model('usermigration', 'Education')
    education.objects.create(name='High School')
    education.objects.create(name='Associate\'s Degree')
    education.objects.create(name='Bachelor\'s Degree')
    education.objects.create(name='Master\'s Degree')
    education.objects.create(name='Doctoral Degree')
    education.objects.create(name='Professional Degree')
    education.objects.create(name='Vocational/Trade School')
    education.objects.create(name='College')
    education.objects.create(name='No Degree')
    education.objects.create(name='Other')

    occupation = apps.get_model('usermigration', 'Occupation')
    occupation.objects.create(name='Healthcare and Medical Services')
    occupation.objects.create(name='Education and Academic Services')
    occupation.objects.create(name='Financial and Banking Services')
    occupation.objects.create(name='Information Technology and Software Development')
    occupation.objects.create(name='Engineering and Architecture')
    occupation.objects.create(name='Sales and Marketing')
    occupation.objects.create(name='Customer Service and Support')
    occupation.objects.create(name='Legal and Law Enforcement')
    occupation.objects.create(name='Hospitality and Tourism')
    occupation.objects.create(name='Research and Development')
    occupation.objects.create(name='Manufacturing and Production')
    occupation.objects.create(name='Agriculture and Farming')
    occupation.objects.create(name='Transportation and Logistics')
    occupation.objects.create(name='Arts, Culture, and Entertainment')
    occupation.objects.create(name='Media and Communications')
    occupation.objects.create(name='Administration and Management')
    occupation.objects.create(name='Construction and Real Estate')
    occupation.objects.create(name='Consulting and Professional Services')
    occupation.objects.create(name='Social Services and Non-profit Organizations')
    occupation.objects.create(name='Government and Public Administration')
    occupation.objects.create(name='Unemployed')
    occupation.objects.create(name='Student')
    occupation.objects.create(name='Retired')
    occupation.objects.create(name='Other')

    status = apps.get_model('usermigration', 'Status')
    status.objects.create(name='Pending')
    status.objects.create(name='Approved')
    status.objects.create(name='Declined')

    country = apps.get_model('usermigration', 'Country')
    country.objects.create(name='Ukraine', latitude=48.379433, longitude=31.16558)
    country.objects.create(name='Romania', latitude=45.943161, longitude=24.96676)
    country.objects.create(name='Poland', latitude=51.919438, longitude=19.145136)
    country.objects.create(name='Slovakia', latitude=48.669026, longitude=19.699024)
    country.objects.create(name='Hungary', latitude=47.162494, longitude=19.503304)
    country.objects.create(name='Bulgaria', latitude=42.733883, longitude=25.48583)
    country.objects.create(name='Turkey', latitude=38.963745, longitude=35.243322)
    country.objects.create(name='Germany', latitude=51.165691, longitude=10.451526)
    country.objects.create(name='Austria', latitude=47.516231, longitude=14.550072)
    country.objects.create(name='Denmark', latitude=56.26392, longitude=9.501785)
    country.objects.create(name='Switzerland', latitude=46.818188, longitude=8.227512)
    country.objects.create(name='Italy', latitude=41.87194, longitude=12.56738)
    country.objects.create(name='France', latitude=46.227638, longitude=2.213749)
    country.objects.create(name='Spain', latitude=40.463667, longitude=-3.74922)
    country.objects.create(name='Portugal', latitude=39.399872, longitude=-8.224454)
    country.objects.create(name='Finland', latitude=61.92411, longitude=25.748151)
    country.objects.create(name='Latvia', latitude=56.879635, longitude=24.603189)
    country.objects.create(name='Norway', latitude=60.472024, longitude=8.468946)
    country.objects.create(name='Sweden', latitude=60.128161, longitude=18.643501)
    country.objects.create(name='United Kingdom', latitude=55.378051, longitude=-3.435973)
    country.objects.create(name='Ireland', latitude=53.41291, longitude=-8.24389)
    country.objects.create(name='United States', latitude=37.09024, longitude=-95.712891)
    country.objects.create(name='Japan', latitude=36.204824, longitude=138.252924)


class Migration(migrations.Migration):

    dependencies = [
        ('usermigration', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(insert_initial_data),
    ]
