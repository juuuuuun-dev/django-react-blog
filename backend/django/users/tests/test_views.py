from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIRequestFactory
from django.conf import settings
from ..models import UserProfile
from utils.file import delete_thumb
from users.factories import UserFactory
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile


class RestUserProfileTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}users/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def tearDown(self):
        profile = UserProfile.objects.all()
        for value in profile:
            delete_thumb(value.avator.name)
            value.avator.delete()

    def test_profile_get(self):
        response = self.client.get(
            "{}user-profile/".format(self.base_api))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['public_name'],
            self.user.profile.public_name)
        self.assertEqual(response.data['message'], self.user.profile.message)
        self.assertEqual(response.data['url'], self.user.profile.url)
        self.assertEqual(response.data['avator'], self.user.profile.avator)

    def test_profile_put(self):
        post_data = {
            "public_name": "test",
            "message": "test message",
            "url": "test.com",
            "avator": SimpleUploadedFile(
                name='test_image.jpg',
                content=open(
                    "users/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg')
        }
        api = reverse("users:user-profile")
        response = self.client.put(api, post_data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['public_name'],
            post_data['public_name'])
        self.assertEqual(response.data['message'], post_data['message'])

    # def test_profile_patch(self):
    #     post_data = {
    #         "profile": {
    #             "url": "test",
    #             "message": "testtest"
    #         },
    #         "username": "test-man"
    #     }
    #     response = self.client.patch(
    #         "{}user-profile/".format(self.base_api), post_data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #     self.assertTrue(response.data['profile'])
    #     self.assertEqual(
    #         response.data['profile']['message'], str(
    #             post_data['profile']['message']))
    #     self.assertEqual(
    #         response.data['profile']['url'], str(
    #             post_data['profile']['url']))
    #     self.assertEqual(
    #         response.data['username'], str(
    #             post_data['username']))


class PasswordResetViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}users/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_reset_password_send_mail_success(self):
        post_data = {
            "email": "test@test.com"
        }

        response = self.client.post(
            "{}password-reset/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['sending'])

    def test_reset_password_send_mail_unsuccess(self):
        post_data = {
            "email": "aaa@test.com"
        }
        response = self.client.post(
            "{}password-reset/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmationViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.base_api = "/{}users/".format(settings.API_VERSION)
        self.auth_api = "/{}blog_auth/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_reset_password_confirm_success(self):
        post_data = {
            "email": "test@test.com"
        }

        response = self.client.post(
            "{}password-reset/".format(self.base_api), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['sending'])

        if 'reset_data' in response.data:
            newpassword = "test1234"
            data = {
                "new_password": newpassword,
                "new_password2": newpassword,
            }
            url = reverse(
                response.data['reset_data']['urlname'],
                kwargs={
                    "uid": self.user.id,
                    "token": response.data['reset_data']['token']})
            confirm_response = self.client.post(
                url, data)
            self.assertEqual(confirm_response.status_code, status.HTTP_200_OK)
            login_data = {
                "email": self.user.email,
                "password": newpassword
            }
            response = self.client.post(
                "{}token/".format(self.auth_api), login_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue(response.data["access"])
