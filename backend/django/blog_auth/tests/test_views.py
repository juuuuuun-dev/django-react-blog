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


class RestUserAuthTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}blog_auth/".format(settings.API_VERSION)
        self.user_api = "/{}user/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_login_success(self):
        # login
        post_data = {
            "email": "test@test.com",
            "password": "testtest1234",
        }
        response = self.client.post(
            "{}token/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['access'])
        self.assertTrue(response.data['refresh'])
        self.assertTrue(response.data['username'])

    def test_login_unsuccess(self):
        post_data = {
            "email": "test9@test.com",
            "password": "testtest1234",
        }
        response = self.client.post(
            "{}token/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_refresh_success(self):
        refresh = RefreshToken.for_user(self.user)
        post_data = {
            "refresh": str(refresh)
        }
        response = self.client.post(
            "{}token/refresh/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['access'])

    def test_token_refresh_unsuccess(self):
        post_data = {
            "refresh": "test"
        }
        response = self.client.post(
            "{}token/refresh/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
