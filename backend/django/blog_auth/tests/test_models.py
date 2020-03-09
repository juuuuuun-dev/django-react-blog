import factory
from django.test import TestCase
from user.models import User
from datetime import datetime

class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('email')

    username = "testname"
    email = "test1@test.com"
    password = "test"
    is_active = 1
    is_staff = 1
    is_admin = 1
    created_at = datetime(2015, 9, 3, 11, 15, 0)
    updated_at = datetime(2015, 9, 3, 11, 15, 0)

