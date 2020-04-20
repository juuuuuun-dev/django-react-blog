from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from ..factories import MediaFactory
from ..models import Media
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile


class AdminMediaViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_get(self):
        media = MediaFactory.create(name='test')
        api = reverse("media:admin-media-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], media.name)
        Media.deleteThumb(media.file)
        media.file.delete()

    def test_retrieve(self):
        media = MediaFactory.create(name='test')
        api = reverse("media:admin-media-detail", kwargs={"pk": media.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], media.name)
        self.assertTrue(response.data['file'])
        self.assertTrue(response.data['thumb'])
        Media.deleteThumb(media.file)
        media.file.delete()

    def test_post(self):
        api = reverse("media:admin-media-list")
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
        Media.deleteThumb(media.file)
        media.file.delete()

    def test_put(self):
        media = MediaFactory.create(name='test')
        Media.deleteThumb(media.file)
        print(media.file)
        api = reverse("media:admin-media-detail", kwargs={"pk": media.id})
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
        Media.deleteThumb(update_media.file)
        update_media.file.delete()
        media.file.delete()

    def test_delete(self):
        media = MediaFactory.create(name='test')
        api = reverse("media:admin-media-detail", kwargs={"pk": media.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        Media.deleteThumb(media.file)
        media.file.delete()
