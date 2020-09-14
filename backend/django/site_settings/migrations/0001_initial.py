# Generated by Django 3.0.4 on 2020-09-14 18:46

from django.db import migrations, models
import site_settings.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSetting',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='name')),
                ('description', models.CharField(max_length=255, unique=True, verbose_name='description')),
                ('main_image', models.FileField(blank=True, null=True, upload_to=site_settings.models.get_file_path, verbose_name='file')),
                ('logo', models.FileField(blank=True, null=True, upload_to=site_settings.models.get_file_path, verbose_name='file')),
            ],
            options={
                'db_table': 'site_settings',
            },
        ),
    ]
