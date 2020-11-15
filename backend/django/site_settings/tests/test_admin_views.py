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
        if hasattr(site_setting, 'main_image'):
            site_setting.main_image.delete()
        if hasattr(site_setting, 'logo'):
            delete_thumb(site_setting.logo.name)
            site_setting.logo.delete()

    def test_get(self):
        api = reverse(self.api_basename)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['data']['name'],
            SiteSetting.default_site_name)
        self.assertEqual(
            response.data['data']['description'],
            SiteSetting.default_description)
        self.assertEqual(
            response.data['config']['logo_size'],
            SiteSetting.logo_size)
        self.assertEqual(
            response.data['config']['main_image_size'],
            SiteSetting.main_image_size)

    def test_put(self):
        post_data = {
            "name": "test",
            "description": "test description",
            "delete_logo": False,
            "delete_main_image": False,
            "main_image": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg'),
            "logo": SimpleUploadedFile(
                name='test_image.png',
                content=open(
                    "site_settings/tests/test_logo.png",
                    'rb').read(),
                content_type='image/png')
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
