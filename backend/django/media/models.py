from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Media(models.Model):
    class Meta:
        db_table = 'media'

    name = models.CharField(verbose_name="name", max_length=254)
    file = models.FileField(
        verbose_name="file",
        upload_to='media/',
    )
    thumb = ImageSpecField(source='file',
                           processors=[ResizeToFill(40, 40)],
                           format='JPEG',
                           options={'quality': 90}
                           )
    # path = models.CharField(verbose_name="path", max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
