from django.db import models


class Media(models.Model):
    class Meta:
        db_table = 'media'

    name = models.CharField(verbose_name="name", max_length=254)
    path = models.CharField(verbose_name="path", max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
