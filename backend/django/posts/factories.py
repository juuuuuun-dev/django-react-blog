import factory
from categories.factories import CategoryFactory
from media.factories import MediaFactory
from tags.factories import TagFactory

from .models import Post


class PostFactory(factory.DjangoModelFactory):
    class Meta:
        model = Post

    title = factory.Sequence(lambda n: "This is test title number" + str(n))
    slug = factory.Sequence(lambda n: "This-is-test-title-number" + str(n))
    content = "test content"
    is_show = True
    category = factory.SubFactory(CategoryFactory, name="test cateogry")
    cover_media = factory.SubFactory(MediaFactory, name='test abe')

    @factory.post_generation
    def tag(self, create, extracted, **kwargs):
        # if create:
        #     self.tag.add(TagFactory.create(name="test tag"))
        if not create:
            return

        if extracted:
            for tag in extracted:
                self.tag.add(tag)
