from django.core.cache import cache
from django.db import models


class Category(models.Model):
    base_cache_key = "categories"

    class Meta:
        db_table = 'categories'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    slug = models.SlugField(verbose_name='slug', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @classmethod
    def get_all(cls):
        return cache.get_or_set(cls.base_cache_key, Category.objects.all())
