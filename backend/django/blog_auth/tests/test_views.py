from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.decorators import api_view
from django.urls import reverse
from rest_framework.response import Response
from django.conf import settings
from pprint import pprint
from .test_models import UserFactory


class RestUserAuthTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}blog_auth/".format(settings.API_VERSION)
        self.user_api = "/{}user/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("test")
        self.user.save()

    def test_register_success(self):
        print(settings.API_VERSION)
        post_data = {
            "username": "test9",
            "email": "test9@test.com",
            "password1": "testtest1234",
            "password2": "testtest1234",
        }
        response = self.client.post(
            "{}register/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('key' in response.data)

        # login
        post_data = {
            "email": "test9@test.com",
            "password": "testtest1234",
        }
        response = self.client.post(
            "{}login/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_unsuccess(self):
        post_data = {
            "email": "test9@test.com",
            "password": "testtest1234",
        }
        response = self.client.post(
            "{}login/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_logout_success(self):
        post_data = {
            "email": "test9@test.com",
            "password": "testtest1234",
        }
        # user = UserFactory.create(email="test@test.com",
        #                             username="test",
        #                             password="test",
        #                             is_active = 0,
        #                             is_staff = 0,
        #                             is_admin = 0
        # )
