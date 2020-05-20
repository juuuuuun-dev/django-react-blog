from rest_framework import serializers
from tags.serializers import TagListSerializer
from categories.serializers import CategoryListSerializer
from ..models import Post


class AdminPostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, source="post")
    username = serializers.PrimaryKeyRelatedField(
        source='user.username', read_only=True)
    tag = TagListSerializer(read_only=True, many=True)
    category = CategoryListSerializer(read_only=True)
    key = serializers.IntegerField(source='id', read_only=True)
    cover = serializers.FileField(required=False)
    thumb = serializers.ImageField(read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Post
        # fields = '__all__'
        fields = [
            "user",
            "username",
            "id",
            "key",
            "title",
            "content",
            "cover",
            "thumb",
            "is_show",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ("user", "key", "created_at", "updated_at",)
