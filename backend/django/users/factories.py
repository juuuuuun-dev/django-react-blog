import factory
from users.models import User


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User

    username = "testname"
    email = "test@test.com"
    password = "testtest1234"
    is_active = 1
    is_staff = 1
    is_admin = 1
    is_superuser = 1
