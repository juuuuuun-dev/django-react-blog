from rest_framework import serializers

from ..models import Media


class CoverSerializer(serializers.ModelSerializer):

    cover = serializers.ImageField(read_only=True)

    class Meta:
        model = Media
        fields = ['id', 'cover']
