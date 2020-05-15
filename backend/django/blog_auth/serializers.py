from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings


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
        # @todo f-strings
        # a = 'a'
        # print(f'a is {a}')

        data['thumb'] = "{}{}".format(settings.BACKEND_URL,
                                      self.user.profile.thumb.url)
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['username'] = user.username
        # token['avator'] = user.profile.avator
        # ...
        return token
