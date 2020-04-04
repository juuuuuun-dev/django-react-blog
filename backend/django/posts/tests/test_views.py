from django.test import TestCase
from rest_framework import status
from django.conf import settings
from rest_framework.test import APITestCase
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from tags.factories import TagFactory
from categories.factories import CategoryFactory
from rest_framework_simplejwt.tokens import RefreshToken
from posts.factories import PostFactory
from pprint import pprint


class AdminPostViewSetTestCase(APITestCase):
    def setUp(self):
        self.admin_api = "/{}posts/admin-post/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_get(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        response = self.client.get(self.admin_api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], post.title)
        self.assertTrue(response.data[0]['category'])
        self.assertEqual(len(response.data[0]['tag']), 1)
        self.assertEqual(response.data[0]['tag'][0], tag.id)
        print(response.data[0])

    def test_retrieve(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        response = self.client.get(
            "{0}{1}/".format(self.admin_api, post.id), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        category = CategoryFactory.create(name="test")
        post_data = {
            "title": "test",
            "content": "content test",
            "is_show": True,
            "category": category.id,
            "user": self.user.id,
        }
        response = self.client.post(self.admin_api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        print(response.data)
