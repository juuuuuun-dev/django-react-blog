from django.conf import settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from users.models import AboutMe


class AdminAboutMeViewTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "users:about-me"
        self.factory = APIRequestFactory()
        self.auth_api = "/{}blog_auth/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_get_successful(self):
        api = reverse(self.api_basename)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['page_title'],
            AboutMe.default_page_title)
