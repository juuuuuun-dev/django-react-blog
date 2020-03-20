from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.decorators import api_view
from django.urls import reverse
from rest_framework.response import Response
from django.conf import settings
from pprint import pprint
from .test_models import UserFactory
from rest_framework_simplejwt.tokens import RefreshToken


class RestUserProfileTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}user/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        access = str(refresh.access_token)
        self.client.credentials(HTTP_AUTHORIZATION="Bearer {}".format(access))

    def test_profile_get(self):
        response = self.client.get(
            "{}user-profile/".format(self.base_api))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['profile'])

    def test_profile_patch(self):
        post_data = {
            "profile": {
                "url": "test",
                "message": "testtest"
            },
            "username": "test-man"
        }
        response = self.client.patch(
            "{}user-profile/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['profile'])
        self.assertEqual(
            response.data['profile']['message'], str(
                post_data['profile']['message']))
        self.assertEqual(
            response.data['profile']['url'], str(
                post_data['profile']['url']))
        self.assertEqual(
            response.data['username'], str(
                post_data['username']))