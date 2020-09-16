import os
import uuid

from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    return os.path.join('site_settings/', str(uuid.uuid4()) + ext)


class SiteSetting(models.Model):
    base_cache_key = 'site_settings'
    header_logo_size = {
        'width': 280,
        'height': 100,
    }

    class Meta:
        db_table = 'site_settings'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    description = models.CharField(
        verbose_name='description',
        unique=True,
        max_length=255)
    # 1200 * 630 - 600 * 315
    main_image = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    # ld json logo 60 * 600 ? / 112 * 112
    # 512* 512 mini 192 * 192 透過
    logo = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    #　透過
    header_logo = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    header_logo_pc = ImageSpecField(
        source='header_logo',
        processors=[
            ResizeToFill(
                header_logo_size['width'] / 2,
                header_logo_size['height'] / 2)],
        format='PNG',
        options={
            'quality': 90})
