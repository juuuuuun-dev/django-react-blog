from django.test import TestCase
from rest_framework.test import APIRequestFactory
from django.conf import settings


class RestUserAuthTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        print('setup')

    def test_register(self):
        print(settings.API_VERSION)
