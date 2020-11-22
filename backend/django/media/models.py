import os
import uuid

from django.core.cache import cache
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from utils import file


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    return os.path.join('media/', str(uuid.uuid4()) + ext)


class Media(models.Model):
    base_cache_key = 'media'
    cover_size = {
        'width': 160,
        'height': 160,
    }

    class Meta:
        db_table = 'media'

    name = models.CharField(verbose_name="name", max_length=254)
    file = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
    )
    width = models.IntegerField(verbose_name="width", default=0)
    height = models.IntegerField(verbose_name="height", default=0)
    # @TODO OGP 推奨サイズ 1200 * 630 / 1000 * 525 /  最小サイズ 600 * 315
    cover = ImageSpecField(
        source='file',
        processors=[ResizeToFill(cover_size['width'], cover_size['height'])],
        format='JPEG',
        options={'quality': 90}
    )
    cover_mini = ImageSpecField(
        source='file',
        processors=[
            ResizeToFill(
                cover_size['width'] / 2,
                cover_size['height'] / 2)],
        format='JPEG',
        options={
            'quality': 90})
    thumb = ImageSpecField(
        source='file',
        processors=[ResizeToFill(40, 40)],
        format='JPEG',
        options={'quality': 90}
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        try:
            file.delete_thumb(self.file.name)
        except BaseException:
            pass
        super().delete(*args, **kwargs)

    @classmethod
    def get_all(cls):
        result = cache.get(cls.base_cache_key, None)
        if result:
            return result
        return Media.objects.all()
        # circle ci testでsetがエラーになる なぜ？
        # return cache.get_or_set('media', Media.objects.all())

        # result = cache.get(cls.base_cache_key, None)
        # return Media.objects.all()
        # result = cache.get(cls.base_cache_key)
        # if result:
        #     return result
        # instance = Media.objects.all()
        # cache.set(cls.base_cache_key, instance)
        # return instance
