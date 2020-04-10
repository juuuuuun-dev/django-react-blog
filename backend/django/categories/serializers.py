from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source="id", read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Category
        fields = ["id", "key", "name", "updated_at", "created_at"]
        read_only_fields = ["key", "created_at", "updated_at"]


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
        read_only_fields = ["name"]
