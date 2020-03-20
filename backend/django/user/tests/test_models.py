import factory
from django.test import TestCase
from user.models import User
from datetime import datetime


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('username',)

    username = "testname"
    email = "test@test.com"
    password = "testtest1234"
    is_active = 1
    is_staff = 1
    is_admin = 1
    is_superuser = 1
    # created_at = datetime(2015, 9, 3, 11, 15, 0)
    # updated_at = datetime(2015, 9, 3, 11, 15, 0)
