import factory

from .models import Category


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    name = factory.Sequence(lambda n: "testname " + str(n))
    slug = factory.Sequence(lambda n: "testname-" + str(n))
