from rest_framework import serializers
from users.serializers import UsernameSerializer
from tags.serializers import TagSerializer
from .models import Post
from users.models import User


class PostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, source="post")
    username = serializers.PrimaryKeyRelatedField(
        source='user.username', read_only=True)
    tag = TagSerializer(read_only=True, many=True)
    key = serializers.IntegerField(source='id', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        fields = [
            "user",
            "username",
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
