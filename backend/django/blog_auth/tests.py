from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from pprint import pprint


class RestUserAuthTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}blog_auth/".format(settings.API_VERSION)
        print('setup')

    def test_register_success(self):
        print(settings.API_VERSION)
        post_data = {
            "username": "test9",
            "email": "test9@test.com",
            "password1": "testtest1234",
            "password2": "testtest1234",
        }
        response = self.client.post("{}register/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        pprint(response.json)
