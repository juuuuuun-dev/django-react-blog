from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from media.models import Media
from posts.factories import PostFactory
from posts.models import Post
from rest_framework import status
from rest_framework.test import APITestCase
from tags.factories import TagFactory
from users.factories import UserFactory
from utils.file import delete_thumb


class PostListTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete(False)

    def test_get_show(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("posts:post-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post.title)
        self.assertTrue(response.data['results'][0]['category'])
        self.assertEqual(len(response.data['results'][0]['tag']), 1)
        self.assertEqual(
            response.data['media_size']['cover'],
            Media.cover_size)

    def test_get_not_show(self):
        PostFactory.create(user=self.user, is_show=False)
        api = reverse("posts:post-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)


class PostCategorySlugListTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete(False)

    def test_get_show(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category = CategoryFactory.create(slug="slu")
        category_2 = CategoryFactory.create(slug="slug2")
        post = PostFactory.create(
            user=self.user,
            title="post",
            category=category,
            tag=[tag])
        post_2 = PostFactory.create(
            user=self.user, title="post_2", category=category_2, tag=[tag])
        api = reverse(
            "posts:post-category-slug-list",
            kwargs={
                "slug": category.slug})
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['id'], post.id)
        self.assertEqual(response.data['results'][0]['title'], post.title)
        self.assertTrue(response.data['results'][0]['category'])
        self.assertEqual(len(response.data['results'][0]['tag']), 1)

    def test_get_not_show(self):
        category = CategoryFactory.create()
        PostFactory.create(user=self.user, category=category, is_show=False)
        api = reverse(
            "posts:post-category-slug-list",
            kwargs={
                "slug": category.slug})
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)


class PostTagSlugListTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete(False)

    def test_get_show(self):
        tag = TagFactory.create(slug="tagdayo")
        tag_2 = TagFactory.create(slug="tag2")
        category = CategoryFactory.create(slug="slu")
        category_2 = CategoryFactory.create(slug="slug2")
        post = PostFactory.create(
            user=self.user,
            title="post",
            category=category,
            tag=[tag])
        post_2 = PostFactory.create(
            user=self.user, title="post_2", category=category_2, tag=[tag_2])
        api = reverse(
            "posts:post-tag-slug-list",
            kwargs={
                "slug": tag.slug})
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['id'], post.id)
        self.assertEqual(response.data['results'][0]['title'], post.title)
        self.assertTrue(response.data['results'][0]['category'])
        self.assertEqual(len(response.data['results'][0]['tag']), 1)

    def test_get_not_show(self):
        category = CategoryFactory.create()
        tag = TagFactory.create()
        PostFactory.create(
            user=self.user,
            category=category,
            tag=[tag],
            is_show=False)
        api = reverse(
            "posts:post-tag-slug-list",
            kwargs={
                "slug": tag.slug})
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 0)


class PostDetailTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete(False)

    def test_get_show(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        api = reverse("posts:post-detail", kwargs={"slug": post.slug})
        print(api)
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post']['title'], post.title)
        self.assertEqual(response.data['post']['content'], post.content)
        self.assertEqual(response.data['post']['category']['id'], category.id)
        self.assertEqual(response.data['post']['tag'][0]['id'], tag.id)

    def test_get_not_show(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        post = PostFactory.create(
            user=self.user,
            is_show=False,
            category=category,
            tag=[tag])
        api = reverse("posts:post-detail", kwargs={"slug": post.slug})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_posts(self):
        tag = TagFactory.create(name="tag")
        tag2 = TagFactory.create(name="tag2")
        category = CategoryFactory.create(name="test")
        category2 = CategoryFactory.create(name="test2")
        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        post2 = PostFactory.create(
            user=self.user, category=category, tag=[tag], title="post2")
        post3 = PostFactory.create(
            user=self.user, category=category2, tag=[tag], title="post3")
        post4 = PostFactory.create(
            user=self.user, category=category2, tag=[tag2], title="post4")

        api = reverse("posts:post-detail", kwargs={"slug": post.slug})

        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post']['title'], post.title)
        self.assertEqual(response.data['post']['content'], post.content)
        self.assertEqual(response.data['post']['category']['id'], category.id)
        self.assertEqual(response.data['post']['tag'][0]['id'], tag.id)
        self.assertEqual(response.data['related_posts'][0]['id'], post3.id)
        self.assertEqual(response.data['related_posts'][1]['id'], post2.id)
