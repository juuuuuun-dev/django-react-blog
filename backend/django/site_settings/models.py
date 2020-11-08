import os
import uuid

from django.db import models
from django.shortcuts import get_object_or_404
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    return os.path.join('site_settings/', str(uuid.uuid4()) + ext)


class SiteSetting(models.Model):
    base_cache_key = 'site_settings'
    default_site_name = 'Site name'
    default_description = 'Site descritpion'
    logo_size = {
        'width': 290,
        'height': 112,
    }

    class Meta:
        db_table = 'site_settings'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    description = models.CharField(
        verbose_name='description',
        unique=True,
        max_length=255)
    # 1200 * 630 ~ 600 * 315 use ld json site image
    main_image = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    # Logo　Transparent png 290 * 112 / 112 * 112 use header and ld json
    logo = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
        null=True,
        blank=True
    )

    logo_mini = ImageSpecField(
        source='logo',
        processors=[
            ResizeToFill(
                logo_size['width'] / 2,
                logo_size['height'] / 2)],
        format='PNG',
        options={
            'quality': 90},)

    # header_logo = models.FileField(
    #     verbose_name="file",
    #     upload_to=get_file_path,
    #     null=True,
    #     blank=True
    # )
    # header_logo_pc = ImageSpecField(
    #     source='header_logo',
    #     processors=[
    #         ResizeToFill(
    #             header_logo_size['width'] / 2,
    #             header_logo_size['height'] / 2)],
    #     format='PNG',
    #     options={
    #         'quality': 90})

    @classmethod
    def getSiteSetting(self):
        try:
            site_setting = SiteSetting.objects.get(id=1)
        except SiteSetting.DoesNotExist:
            site_setting = None
        return site_setting
