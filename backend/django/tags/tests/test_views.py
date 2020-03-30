from django.test import TestCase
from rest_framework import status
from django.conf import settings
from rest_framework.test import APITestCase
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from users.tests.test_models import UserFactory
from rest_framework_simplejwt.tokens import RefreshToken
from tags.factories import TagFactory


class TagTestViewSetTestCase(APITestCase):
    def setUp(self):
        self.base_api = "/{}tags/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_admin_get(self):
        tag = TagFactory.create(name="test")
        response = self.client.get(
            "{}admin-tag/".format(self.base_api))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], tag.name)

    def test_admin_retrieve(self):
        tag = TagFactory.create(name="test")
        response = self.client.get(
            "{0}admin-tag/{1}/".format(self.base_api, tag.id), format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], tag.name)

    def test_admin_post(self):
        post_data = {
            "name": "postname"
        }
        response = self.client.post(
            "{}admin-tag/".format(self.base_api), post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], post_data['name'])

    def test_admin_put(self):
        tag = TagFactory.create(name="test")
        post_data = {
            "name": "postname"
        }
        response = self.client.put(
            "{0}admin-tag/{1}/".format(self.base_api, tag.id), post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], post_data['name'])

    def test_admin_delete(self):
        tag = TagFactory.create(name="test")

        response = self.client.delete(
            "{0}admin-tag/{1}/".format(self.base_api, tag.id), format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
