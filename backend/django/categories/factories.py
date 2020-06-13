import factory

from .models import Category


class CategoryFactory(factory.DjangoModelFactory):
    class Meta:
        model = Category

    name = 'testname'
    slug = 'testname'
