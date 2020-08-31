from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from posts.factories import PostFactory
from rest_framework import status
from rest_framework.test import APITestCase
from tags.factories import TagFactory
from users.factories import UserFactory


class InitialViewsTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()

    def test_get(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category = CategoryFactory(name="cat")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("init:init-api")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["author"]["public_name"],
            self.user.profile.public_name)
        self.assertEqual(
            response.data["recent_posts"][0]["title"],
            post.title)
        self.assertEqual(
            response.data["categories"][0]["name"],
            category.name)
        self.assertEqual(
            response.data["categories"][0]["slug"],
            category.slug)
        self.assertEqual(response.data["tags"][0]["name"], tag.name)
        self.assertEqual(response.data["tags"][0]["slug"], tag.slug)
