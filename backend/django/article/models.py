from django.db import models
from tag.models import Tag
from category.models import Category


class Article(models.Model):
    class Meta:
        db_table = 'articles'

    title = models.CharField(verbose_name='title', max_length=255)
    content = models.TextField(verbose_name='content')
    cover = models.CharField(max_length=255, null=True, blank=True)
    is_show = models.BooleanField()
    category = models.ForeignKey(
        Category, verbose_name='category', on_delete=models.PROTECT)
    tag = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # def get_categories(self):
    #     return "\n".join([p.cateroy_id for p in self category_id.all()])
