from django.db import models

# Create your models here.


class Tag(models.Model):
    class Meta:
        db_table = 'tags'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
