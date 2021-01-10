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
