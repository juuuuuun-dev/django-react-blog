from django.db import models
from tags.models import Tag
from categories.models import Category
from users.models import User


class Post(models.Model):
    class Meta:
        db_table = 'posts'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='title', unique=True, max_length=255)
    content = models.TextField(verbose_name='content')
    cover = models.CharField(max_length=255, null=True, blank=True)
    is_show = models.BooleanField()
    category = models.ForeignKey(
        Category, verbose_name='category', on_delete=models.PROTECT)
    tag = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
