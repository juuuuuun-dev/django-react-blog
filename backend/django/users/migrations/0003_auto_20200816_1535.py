# Generated by Django 3.0.4 on 2020-08-16 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_aboutme'),
    ]

    operations = [
        migrations.RenameField(
            model_name='aboutme',
            old_name='description',
            new_name='content',
        ),
        migrations.AlterField(
            model_name='aboutme',
            name='page_title',
            field=models.CharField(max_length=50, verbose_name='Page title'),
        ),
    ]