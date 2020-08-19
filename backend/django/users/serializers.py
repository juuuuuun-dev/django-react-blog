from django.contrib.auth.tokens import default_token_generator
from rest_framework import serializers

from .models import AboutMe, User, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    avator = serializers.FileField(
        required=False)
    thumb = serializers.ImageField(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "avator",
            "public_name",
            "url",
            "message",
            "thumb",
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


class PublicAuthorSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = (
            "profile",
        )


class AboutMeSerializer(serializers.ModelSerializer):

    page_title = serializers.CharField(
        max_length=AboutMe.page_title_max_length)

    class Meta:
        model = AboutMe
        fields = ("page_title", "content")


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=True
    )


class PasswordResetConfirmSerializer(serializers.Serializer):
    token_generator = default_token_generator

    def __init__(self, *args, **kwargs):
        context = kwargs['context']
        uid = context.get('uid')
        token = context.get('token')
        if uid and token:
            self.user = self.get_user(uid)
            self.valid_attempt = self.token_generator.check_token(
                self.user, token)
        super().__init__(*args, **kwargs)

    def get_user(self, uid):
        try:
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        return user

    new_password = serializers.CharField(
        style={'input_type': 'password'},
        label="New Password",
        write_only=True
    )

    new_password2 = serializers.CharField(
        style={'input_type': 'password'},
        label="Confirm Password",
        write_only=True
    )

    def validate_new_password2(self, value):
        data = self.get_initial()
        new_password = data.get('new_password')
        if new_password != value:
            raise serializers.ValidationError("Passwords doesn't match.")
        return value

    def validate(self, attrs):
        if not self.valid_attempt:
            raise serializers.ValidationError("Operation not allowed.")
        return attrs
