from django.core.cache import cache
from django.db import models


def get_all_categories():
    result = cache.get(Category.base_cache_key)
    if result:
        return result
    instance = Category.objects.all()
    cache.set(Category.base_cache_key, instance)
    return instance


class Category(models.Model):
    base_cache_key = "categories"

    class Meta:
        db_table = 'categories'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
