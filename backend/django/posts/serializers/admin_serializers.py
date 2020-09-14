from categories.models import Category
from media.models import Media
from media.serializers.main_serializers import CoverSerializer
from posts.models import Post
from rest_framework import serializers
from tags.models import Tag


class AdminPostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True)
    tag = serializers.PrimaryKeyRelatedField(many=True,
                                             queryset=Tag.objects.all())
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())
    key = serializers.IntegerField(source='id', read_only=True)
    cover_media = serializers.PrimaryKeyRelatedField(
        queryset=Media.objects.all(), required=False)

    class Meta:
        model = Post
        fields = [
            "user",
            "id",
            "key",
            "title",
            "slug",
            "content",
            "cover_media",
            "is_show",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ("user", "key", "created_at", "updated_at",)


class AdminGetSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True)
    tag = serializers.PrimaryKeyRelatedField(many=True,
                                             queryset=Tag.objects.all())
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all())
    key = serializers.IntegerField(source='id', read_only=True)
    cover_media = CoverSerializer()

    class Meta:
        model = Post
        fields = [
            "user",
            "id",
            "key",
            "title",
            "slug",
            "content",
            "cover_media",
            "is_show",
            "category",
            "tag",
            "updated_at",
            "created_at",
        ]
        read_only_fields = ("user", "key", "created_at", "updated_at",)
