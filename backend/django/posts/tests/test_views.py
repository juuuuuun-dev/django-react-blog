from rest_framework import status
from django.conf import settings
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from tags.factories import TagFactory
from categories.factories import CategoryFactory
from posts.factories import PostFactory


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
        }
        response = self.client.post(self.admin_api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category'], post_data['category'])

    def test_put(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        category = CategoryFactory.create(name="test")

        post_data = {
            "title": "testtest",
            "content": "content test",
            "is_show": False,
            "category": category.id,
        }
        response = self.client.put(
            "{0}{1}/".format(self.admin_api, post.id), post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category'], post_data['category'])

    def test_delete(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        response = self.client.delete(
            "{0}{1}/".format(self.admin_api, post.id), format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
