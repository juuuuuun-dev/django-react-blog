from categories.models import Category
from rest_framework import serializers
from tags.models import Tag, get_all_tags

from ..models import Post


class AdminPostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True)
    # username = serializers.PrimaryKeyRelatedField(
    #     source='user.username', read_only=True)
    tag = serializers.PrimaryKeyRelatedField(many=True,
                                             queryset=get_all_tags())
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())
    key = serializers.IntegerField(source='id', read_only=True)
    cover = serializers.FileField(required=False)
    thumb = serializers.ImageField(read_only=True)
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
            "thumb",
            "is_show",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ("user", "key", "created_at", "updated_at",)
