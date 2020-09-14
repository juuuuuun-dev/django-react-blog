import os
import re
import uuid

from django.conf import settings
from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMultiAlternatives
from django.db import models
from django.db.models.signals import post_save
from django.template.loader import render_to_string
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill
from site_settings.models import SiteSetting
from utils.file import delete_thumb


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError("email is required")
        user = self.model(email=self.normalize_email(email), username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        user = self.create_user(email, username, password)
        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    class Meta:
        db_table = 'users'

    username = models.CharField(
        unique=True,
        verbose_name='username',
        max_length=50)
    email = models.EmailField(
        unique=True,
        verbose_name='email',
        max_length=128)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("username",)

    @classmethod
    def get_author(cls):
        author = User.objects.get(is_superuser=True)
        if author:
            return author


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    return os.path.join('user/', str(uuid.uuid4()) + ext)


class UserProfile(models.Model):
    class Meta:
        db_table = 'user_profiles'

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        primary_key=True
    )
    public_name = models.CharField(unique=True, max_length=64)
    avator = models.FileField(
        upload_to=get_file_path,
        null=True,
        blank=True
    )
    thumb = ImageSpecField(
        source='avator',
        processors=[ResizeToFill(60, 60)],
        format='JPEG',
        options={'quality': 90}
    )
    url = models.TextField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username

    def send_password_reset_email(self, site):
        token = default_token_generator.make_token(self.user)
        uid = self.user.pk
        url = getattr(settings, 'FRONTEND_URL', None)
        api = getattr(settings, 'API_VERSION', None)
        reset_api = "/password-reset-confirm/{0}/{1}".format(uid, token)

        context = {
            'email': self.user.email,
            'site_name': getattr(settings, 'SITE_NAME', 'site name'),
            'user': self.user,
            'reset_url': "{0}{1}".format(url, reset_api)
        }

        subject = render_to_string(
            'users/password_reset_email_subject.html', context)
        subject = ''.join(subject.splitlines())
        message = render_to_string(
            'users/password_reset_email.content.html', context)

        msg = EmailMultiAlternatives(subject, "", to=[self.user.email])
        msg.attach_alternative(message, 'text/html')
        msg.send()
        TESTING = getattr(settings, 'TESTING', None)
        if TESTING:
            data = {
                "urlname": "users:password-reset-confirm",
                "token": token,
            }
            return data


class AboutMe(models.Model):
    default_page_title = "About me"
    page_title_max_length = 50

    class Meta:
        db_table = 'about_me'

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="about_me",
        primary_key=True
    )
    page_title = models.CharField(
        verbose_name="Page title",
        max_length=page_title_max_length)
    content = models.TextField(null=True, blank=True)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(
            user=instance,
            public_name=instance.username
        )


def create_about_me(sender, instance, created, **kwargs):
    if created:
        about_me, created = AboutMe.objects.get_or_create(
            user=instance,
            page_title=AboutMe.default_page_title
        )


def create_site_settings(sender, instance, created, **kwargs):
    if created:
        site_setting, created = SiteSetting.objects.get_or_create(
            id=1,
            name="Site name",
            description="Site descritpion"
        )


post_save.connect(create_user_profile, sender=User)
post_save.connect(create_about_me, sender=User)
