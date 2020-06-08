from categories.models import Category
from categories.serializers import CategoryListSerializer
from rest_framework import serializers
from tags.serializers import TagListSerializer

from ..models import Post


class MainPostListSerializer(serializers.ModelSerializer):
    tag = TagListSerializer(read_only=True, many=True)
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "plain_content",
            "cover",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]


class MainPostSerializer(serializers.ModelSerializer):
    tag = TagListSerializer(read_only=True, many=True)
    category = CategoryListSerializer(read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "content",
            "cover",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
