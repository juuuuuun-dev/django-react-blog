from django.core.cache import cache
from django.db import models


class Tag(models.Model):
    base_cache_key = "tags"

    class Meta:
        db_table = 'tags'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def get_all(cls):
        result = cache.get(cls.base_cache_key)
        if result:
            return result
        instance = Tag.objects.all()
        cache.set(cls.base_cache_key, instance)
        return instance
