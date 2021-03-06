from urllib.parse import urlencode

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from utils.file import delete_thumb

from ..factories import MediaFactory
from ..models import Media


class AdminMediaViewSetTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "media:admin-media"
        self.user = UserFactory.create()
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
        media = MediaFactory.create(name='test abe')
        MediaFactory.create(name='abe2')
        api = "".join([
            reverse(f"{self.api_basename}-list"),
            "?",
            urlencode({
                "page": 1,
                "search": "tes ab"
            }),
        ])
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], media.name)

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
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], post_data['name'])
        self.assertTrue(response.data['file'])
        self.assertTrue(response.data['thumb'])
        media = Media.objects.get(id=response.data['id'])
        delete_thumb(media.file.name)
        media.file.delete()

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
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], post_data['name'])
        update_media = Media.objects.get(id=media.id)
        delete_thumb(update_media.file.name)
        update_media.file.delete()
        media.file.delete()

    def test_delete(self):
        media = MediaFactory.create(name='test')
        api = reverse(f"{self.api_basename}-detail", kwargs={"pk": media.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_thumb(media.file.name)
        media.file.delete()


class AdminPostPageMediaViewTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_get(self):
        media = MediaFactory.create(name='test')
        media2 = MediaFactory.create(name='test')
        api = "".join([
            reverse("media:admin-post-page-media"),
            "?",
            urlencode({"page": 1}),
        ])
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        delete_thumb(media.file.name)
        delete_thumb(media2.file.name)
        media.file.delete()
        media2.file.delete()
