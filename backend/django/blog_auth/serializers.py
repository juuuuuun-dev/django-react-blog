from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    avator = serializers.FileField(
        required=False)
    thumb = serializers.ImageField(read_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username
        if self.user.profile.thumb:
            data['thumb'] = f"{settings.BACKEND_URL}\
                {self.user.profile.thumb.url}"
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # token['avator'] = user.profile.avator
        # ...
        return token
