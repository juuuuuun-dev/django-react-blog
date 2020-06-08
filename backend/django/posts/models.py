import os
import uuid

from categories.models import Category
from categories.serializers import CategoryListSerializer
from django.db import models
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from tags.models import Tag
from tags.serializers import TagListSerializer
from users.models import User
from utils.file import delete_thumb


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    return os.path.join('posts/', str(uuid.uuid4()) + ext)


class Post(models.Model):

    base_cache_key = 'posts'
    show_cache_key = 'show-posts'

    class Meta:
        db_table = 'posts'

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='title', unique=True, max_length=255)
    content = models.TextField(verbose_name='content')
    plain_content = models.TextField(
        verbose_name='plain_content', null=True, blank=True)
    cover = models.FileField(
        verbose_name="cover",
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    thumb = ImageSpecField(
        source='cover',
        processors=[ResizeToFill(80, 80)],
        format='JPEG',
        options={'quality': 90}
    )
    is_show = models.BooleanField()
    category = models.ForeignKey(
        Category, verbose_name='category', on_delete=models.PROTECT)
    tag = models.ManyToManyField(Tag, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def delete(self, *args, **kwargs):
        try:
            delete_thumb(self.cover.name)
        except BaseException:
            pass
        super().delete(*args, **kwargs)

    @staticmethod
    def get_tag_and_category_list():
        tagSerializer = TagListSerializer(Tag.get_all(), many=True)
        categorySerializer = CategoryListSerializer(
            Category.get_all(), many=True)
        return {
            "tags": tagSerializer.data,
            "categories": categorySerializer.data
        }
