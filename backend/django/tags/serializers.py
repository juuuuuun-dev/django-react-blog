from rest_framework import serializers
from .models import Tag
from django.db.models import F


class TagSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id')
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Tag
        fields = ("id", "key", "name", "updated_at", "created_at",)
        read_only_fields = ("id", "created_at", "updated_at")
