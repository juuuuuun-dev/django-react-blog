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
        data['is_staff'] = self.user.is_staff
        data['is_admin'] = self.user.is_admin
        if self.user.profile.thumb:
            data['thumb'] = self.user.profile.thumb.url
        data['page_size'] = settings.PAGE_SIZE
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # token['avator'] = user.profile.avator
        # ...
        return token
