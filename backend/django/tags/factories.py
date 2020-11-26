import factory

from .models import Tag


class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    name = factory.Sequence(lambda n: "testname " + str(n))
    slug = factory.Sequence(lambda n: "testname-" + str(n))
