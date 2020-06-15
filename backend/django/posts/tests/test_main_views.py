from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from posts.factories import PostFactory
from rest_framework import status
from rest_framework.test import APITestCase
from tags.factories import TagFactory
from users.factories import UserFactory


class PostListTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()

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

    def test_get_show(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category = CategoryFactory.create()
        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        api = reverse(
            "posts:post-category-slug-list",
            kwargs={
                "slug": category.slug})
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
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


class PostDetailTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def test_get_show(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        api = reverse("posts:post-detail", kwargs={"pk": post.id})
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
        api = reverse("posts:post-detail", kwargs={"pk": post.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
