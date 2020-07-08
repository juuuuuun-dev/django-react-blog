from django.core.cache import cache
from django.db import models
from utils.cache_views import cache_key_stringfiy


class Tag(models.Model):
    base_cache_key = "tags"

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
        cache_key = cache_key_stringfiy(
            base_key=cls.base_cache_key,
            query_dict={
                "slug": slug})
        return cache.get_or_set(cache_key, Tag.objects.get(slug=slug))
