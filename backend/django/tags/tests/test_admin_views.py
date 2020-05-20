from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from tags.factories import TagFactory
from users.factories import UserFactory


class AdminTagTestViewSetTestCase(APITestCase):
    def setUp(self):
        # user
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_get(self):
        tag = TagFactory.create(name="test")
        api = reverse("tags:admin-tag-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["name"], tag.name)

    def test_retrieve(self):
        tag = TagFactory.create(name="test")
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], tag.name)

    def test_post(self):
        post_data = {
            "name": "postname"
        }
        api = reverse("tags:admin-tag-list")
        response = self.client.post(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], post_data['name'])

    def test_put(self):
        tag = TagFactory.create(name="test")
        post_data = {
            "name": "postname"
        }
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.put(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], post_data['name'])

    def test_delete(self):
        tag = TagFactory.create(name="test")
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
