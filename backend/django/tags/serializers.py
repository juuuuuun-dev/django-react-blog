from rest_framework import serializers

from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Tag
        fields = ["id", "key", "name", "slug", "updated_at", "created_at"]
        read_only_fields = ["key", "created_at", "updated_at"]


class TagListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]
        read_only_fields = ["name"]
