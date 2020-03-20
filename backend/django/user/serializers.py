from rest_framework import serializers
from .models import User, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, source="profile")

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "avator",
            "url",
            "message",
        )


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = (
            "profile",
            "username",
        )
        read_only_fields = ("username",)

    # def username(self):

    def update(self, instance, validated_data):
        profile_data = validated_data.get("profile", {})
        if not profile_data:
            raise serializers.ValidationError({
                'profile': 'This field is required.'
            })
        instance.username = validated_data.get("username", instance.username)
        instance.save()
        # profile
        instance.profile.message = profile_data.get(
            "message", instance.profile.message)
        instance.profile.avator = profile_data.get(
            "avator", instance.profile.avator)
        instance.profile.url = profile_data.get("url", instance.profile.url)
        instance.profile.save()
        return instance
