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

    class Meta:
        db_table = 'media'

    name = models.CharField(verbose_name="name", max_length=254)
    file = models.FileField(
        verbose_name="file",
        upload_to=get_file_path,
    )
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
    def get_all(self):
        result = cache.get(self.base_cache_key)
        if result:
            return result
        instance = Media.objects.all().order_by('-id')
        cache.set(self.base_cache_key, instance)
        return instance
