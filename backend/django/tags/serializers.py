from rest_framework import serializers

from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id', read_only=True)

    class Meta:
        model = Tag
        fields = ["id", "key", "name", "slug", "updated_at", "created_at"]
        read_only_fields = ["key", "created_at", "updated_at"]


class TagListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]
        read_only_fields = ["name"]
