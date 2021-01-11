import factory
from users.models import User


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = "testname"
    email = "test@test.com"
    password = "testtest1234"
    is_active = True
    is_staff = True
    is_admin = True
    is_superuser = True


class GuestUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = "guest"
    email = "guest@guest.com"
    password = "guest1234"
    is_active = True
    is_staff = False
    is_admin = False
    is_superuser = False
