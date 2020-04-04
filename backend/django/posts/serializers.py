from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, source="post.id")
    key = serializers.IntegerField(source='id', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = [
            "user",
            "id",
            "key",
            "title",
            "content",
            "cover",
            "is_show",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ("user", "key", "created_at", "updated_at",)
