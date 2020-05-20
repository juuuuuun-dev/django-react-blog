# Generated by Django 3.0.4 on 2020-05-19 19:58

from django.db import migrations, models
import posts.models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='cover',
            field=models.FileField(blank=True, null=True, upload_to=posts.models.get_file_path, verbose_name='cover'),
        ),
    ]
