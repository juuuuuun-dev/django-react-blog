from rest_framework import serializers

from ..models import Media


class AdminMediaSerializer(serializers.ModelSerializer):
    key = serializers.IntegerField(source='id', read_only=True)
    file = serializers.FileField(required=False)
    thumb = serializers.ImageField(read_only=True)
    cover = serializers.ImageField(read_only=True)

    class Meta:
        model = Media
        fields = '__all__'
        read_only_fields = ["key", "created_at", "updated_at"]
