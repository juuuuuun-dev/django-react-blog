import factory
from .models import Tag


class TagFactory(factory.DjangoModelFactory):
    class Meta:
        model = Tag

    name = "testname"
