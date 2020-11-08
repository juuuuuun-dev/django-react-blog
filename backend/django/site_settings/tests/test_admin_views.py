from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from site_settings.models import SiteSetting
from users.factories import UserFactory
from utils.file import delete_thumb


class AdminSiteSettingTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "site-settings:admin-site-setting"
        self.factory = APIRequestFactory()
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def tearDown(self):
        site_setting = SiteSetting.getSiteSetting()
        site_setting.main_image.delete()
        site_setting.logo.delete()

    def test_get(self):
        api = reverse(self.api_basename)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['name'],
            SiteSetting.default_site_name)
        self.assertEqual(
            response.data['description'],
            SiteSetting.default_description)

    def test_put(self):
        post_data = {
            "name": "test",
            "description": "test description",
            "main_image": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg'),
            "logo": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg')
        }
        api = reverse(self.api_basename)
        response = self.client.put(api, post_data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['name'],
            post_data['name'])
        self.assertEqual(
            response.data['description'],
            post_data['description'])
        self.assertTrue(response.data['main_image'])
        self.assertTrue(response.data['logo'])
