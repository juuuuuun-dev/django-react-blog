
import factory
from users.models import User


class UserFactory(factory.django.DjangoModelFactory):
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
