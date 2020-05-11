import os
import uuid
from utils.file import delete_thumb
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('media/', filename)


class Media(models.Model):
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
            delete_thumb(self.file.name)
        except BaseException:
            pass
        super().delete(*args, **kwargs)
