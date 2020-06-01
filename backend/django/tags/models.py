from django.core.cache import cache
from django.db import models


def get_all_tags():
    result = cache.get(Tag.base_cache_key)
    if result:
        return result
    instance = Tag.objects.all()
    cache.set(Tag.base_cache_key, instance)
    return instance


class Tag(models.Model):
    base_cache_key = "tags"

    class Meta:
        db_table = 'tags'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
