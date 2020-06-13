from categories.factories import CategoryFactory
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory


class AdminCategoryViewSetTestCase(APITestCase):
    def setUp(self):
        self.api_basename = "categories:admin-category"
        # user
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def test_get(self):
        category = CategoryFactory(name="test")
        api = reverse(f"{self.api_basename}-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["name"], category.name)
        self.assertEqual(response.data["results"][0]["slug"], category.slug)

    def test_retrieve(self):
        category = CategoryFactory(name="test")
        api = reverse(
            f"{self.api_basename}-detail",
            kwargs={
                "pk": category.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], category.name)
        self.assertEqual(response.data['slug'], category.slug)

    def test_post(self):
        post_data = {
            "name": "postname",
            "slug": "postname",
        }
        api = reverse(f"{self.api_basename}-list")
        response = self.client.post(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], post_data['name'])
        self.assertEqual(response.data['slug'], post_data['slug'])

    def test_put(self):
        category = CategoryFactory.create(name="test")
        post_data = {
            "name": "postname",
            "slug": "postname",
        }
        api = reverse(
            f"{self.api_basename}-detail",
            kwargs={
                "pk": category.id})
        response = self.client.put(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], post_data['name'])
        self.assertEqual(response.data['slug'], post_data['slug'])

    def test_delete(self):
        category = CategoryFactory.create(name="test")
        api = reverse(
            f"{self.api_basename}-detail",
            kwargs={
                "pk": category.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
