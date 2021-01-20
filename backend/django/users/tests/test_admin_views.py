from django.conf import settings
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from users.models import AboutMe, UserProfile
from utils.file import delete_thumb


class AdminUserProfileTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "users:user-profile"
        self.factory = APIRequestFactory()
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
        api = reverse(self.api_basename)
        response = self.client.get(api)
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
                    "media/tests/test.jpg",
                    'rb').read(),
                content_type='image/jpeg')
        }
        api = reverse(self.api_basename)
        response = self.client.put(api, post_data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['public_name'],
            post_data['public_name'])
        self.assertEqual(response.data['message'], post_data['message'])


class PasswordResetViewTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "users:password-reset"
        self.factory = APIRequestFactory()
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_reset_password_send_mail_success(self):
        post_data = {
            "email": self.user.email
        }
        api = reverse(self.api_basename)
        response = self.client.post(api, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['sending'])

    def test_reset_password_send_mail_unsuccess(self):
        post_data = {
            "email": "aaa@test.com"
        }
        api = reverse(self.api_basename)
        response = self.client.post(api, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmationViewTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "users:password-reset"
        self.factory = APIRequestFactory()
        self.auth_api = "/{}blog_auth/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()

    def test_reset_password_confirm_success(self):
        post_data = {
            "email": self.user.email
        }
        api = reverse(self.api_basename)
        response = self.client.post(api, post_data, format='json')
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
                "username": self.user.username,
                "password": newpassword
            }
            token_api = reverse("auth:token_obtain_pair")
            response = self.client.post(token_api, login_data, format='json')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertTrue(response.data["access"])


class AdminAboutMeViewTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "users:admin-about-me"
        self.factory = APIRequestFactory()
        self.auth_api = "/{}blog_auth/".format(settings.API_VERSION)
        # user
        self.user = UserFactory.create()
        self.user.set_password("testtest1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_get_successful(self):
        api = reverse(self.api_basename)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['page_title'],
            AboutMe.default_page_title)

    def test_put_successful(self):
        post_data = {
            "page_title": "Test title",
            "content": "test",
        }
        api = reverse(self.api_basename)
        response = self.client.put(api, post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['page_title'], post_data['page_title'])
        self.assertEqual(
            response.data['content'],
            post_data['content'])
