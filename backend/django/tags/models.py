from django.core.cache import cache
from django.db import models


class Tag(models.Model):
    base_cache_key = "tags"
    slug_cache_key = "tag-slug"

    class Meta:
        db_table = 'tags'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    slug = models.SlugField(verbose_name='slug', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @classmethod
    def get_all(cls):
        return cache.get_or_set(cls.base_cache_key, Tag.objects.all())

    @classmethod
    def get_by_slug(cls, slug):
        return cache.get_or_set(cls.slug_cache_key, Tag.objects.get(slug=slug))
