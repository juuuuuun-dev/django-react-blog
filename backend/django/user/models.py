from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


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

    # def _create_user(self, email, username, password=None):
    #     if not email:
    #         # throw
    #         raise ValueError('email is required')
    #     user = self.model(email=self.normalize_email(email), username=username)
    #     user.set_password(password)
    #     user.save(using=self._db)
    #     return user

    # def create_user(self, email, username, password=None, **extra_fields):
    #     extra_fields.setdefault('is_staff', False)
    #     extra_fields.setdefault('is_superuser', False)
    #     return self._create_user(email, username, password, **extra_fields)

    # def create_superuser(self, email, username, password, **extra_fields):
    #     extra_fields.setdefault('is_staff', True)
    #     extra_fields.setdefault('is_superuser', True)
    #     if extra_fields.get('is_staff') is not True:
    #         raise ValueError('Superuser must have is_staff=True.')
    #     if extra_fields.get('is_superuser') is not True:
    #         raise ValueError('Superuser must have is_superuser=True.')
    #     return self._create_user(email, username, password, **extra_fields)


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


class UserProfile(models.Model):
    class Meta:
        db_table = 'user_profiles'

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        primary_key=True)
    avator = models.FileField(
        upload_to="media/avatars/",
        null=True,
        blank=True)
    url = models.TextField(null=True, blank=True)

    message = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        profile, created = UserProfile.objects.get_or_create(user=instance)


post_save.connect(create_user_profile, sender=User)
