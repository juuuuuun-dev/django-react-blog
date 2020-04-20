import os
import re
import uuid
import shutil
from django.db import models
from django.conf import settings
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
    thumb = ImageSpecField(source='file',
                           processors=[ResizeToFill(40, 40)],
                           format='JPEG',
                           options={'quality': 90}
                           )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def deleteThumb(file):
        print("deleteThumb")
        print(file)
        m = re.match(r'(.*)(?=\.)', file.name)
        path = "{}/{}/{}".format(settings.MEDIA_ROOT,
                                 settings.IMAGEKIT_CACHEFILE_DIR,
                                 m.group()
                                 )
        if os.path.exists(path):
            shutil.rmtree(path)

    def delete(self, *args, **kwargs):
        try:
            self.deleteThumb(self.file)
        except BaseException:
            pass
        super().delete(*args, **kwargs)
