from categories.serializers import CategoryListSerializer
from media.serializers.main_serializers import CoverSerializer
from rest_framework import serializers
from tags.serializers import TagListSerializer

from ..models import Post


class MainPostListSerializer(serializers.ModelSerializer):
    tag = TagListSerializer(read_only=True, many=True)
    category = CategoryListSerializer(read_only=True)
    cover_media = CoverSerializer()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "plain_content",
            "cover_media",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]


class MainPostSerializer(serializers.ModelSerializer):
    tag = TagListSerializer(read_only=True, many=True)
    category = CategoryListSerializer(read_only=True)
    cover_media = CoverSerializer()

    class Meta:
        model = Post
        lookup_field = 'slug'
        fields = [
            "id",
            "slug",
            "title",
            "content",
            "cover_media",
            "category",
            "plain_content",
            "tag",
            "updated_at",
            "created_at",
        ]


class RelatedPostListSerializer(serializers.ModelSerializer):
    cover_media = CoverSerializer()

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "cover_media",
            'plain_content',
            "category",
            "updated_at",
            "created_at",
        ]
