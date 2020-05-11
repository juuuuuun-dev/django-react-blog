import factory
from .models import Media
# from django.db.models import ImageField
# from django.core.files.uploadedfile import SimpleUploadedFile


class MediaFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Media

    name = 'test_file'
    file = factory.django.ImageField(
        filename="test.jpg",
        color='black',
        width=10,
        height=10,
    )
