from rest_framework import serializers
from ..models import Media


class AdminMediaSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id', read_only=True)
    created_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = serializers.DateTimeField(
        format="%Y-%m-%d %H:%M:%S", read_only=True)
    thumb = serializers.ImageField(read_only=True)

    class Meta:
        model = Media
        fields = '__all__'
