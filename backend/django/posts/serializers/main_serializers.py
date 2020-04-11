from rest_framework import serializers
from tags.serializers import TagListSerializer
from categories.serializers import CategoryListSerializer
from ..models import Post


class MainPostSerializer(serializers.ModelSerializer):
    tag = TagListSerializer(read_only=True, many=True)
    category = CategoryListSerializer(read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

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