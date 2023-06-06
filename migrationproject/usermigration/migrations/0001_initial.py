# Generated by Django 4.2.1 on 2023-06-06 15:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Flow',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('description', models.TextField()),
                ('from_country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flows_from', to='usermigration.country')),
            ],
        ),
        migrations.CreateModel(
            name='Gender',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Occupation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='FlowDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('income', models.DecimalField(decimal_places=2, max_digits=19)),
                ('education', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usermigration.education')),
                ('flow', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usermigration.flow')),
                ('gender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usermigration.gender')),
                ('occupation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usermigration.occupation')),
            ],
        ),
        migrations.AddField(
            model_name='flow',
            name='status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usermigration.status'),
        ),
        migrations.AddField(
            model_name='flow',
            name='to_country',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='flows_to', to='usermigration.country'),
        ),
        migrations.AddField(
            model_name='flow',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
