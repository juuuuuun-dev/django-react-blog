from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import GuestUserFactory
from utils.file import delete_thumb

from ..factories import MediaFactory
from ..models import Media


class GuestAdminMediaViewSetTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "media:admin-media"
        self.user = GuestUserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def tearDown(self):
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete()

    def test_get(self):
        MediaFactory.create(name='test abe')
        api = reverse(f"{self.api_basename}-list")

        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_retrieve(self):
        media = MediaFactory.create(name='test')
        api = reverse(f"{self.api_basename}-detail", kwargs={"pk": media.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], media.name)
        self.assertTrue(response.data['file'])
        self.assertTrue(response.data['thumb'])

    def test_post(self):
        api = reverse(f"{self.api_basename}-list")
        post_data = {
            "name": "test",
            "file": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg'),
        }
        response = self.client.post(api, post_data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_put(self):
        media = MediaFactory.create(name='test')
        api = reverse(f"{self.api_basename}-detail", kwargs={"pk": media.id})
        post_data = {
            "name": "put",
            "file": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg')
        }
        response = self.client.put(api, post_data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete(self):
        media = MediaFactory.create(name='test')
        api = reverse(f"{self.api_basename}-detail", kwargs={"pk": media.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        delete_thumb(media.file.name)
        media.file.delete()
