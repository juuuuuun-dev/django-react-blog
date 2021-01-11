from urllib.parse import urlencode

from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from tags.factories import TagFactory
from users.factories import GuestUserFactory
from utils.cache_views import get_detail_key


class GuestAdminTagTestViewSetTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.base_cache_key = "tags"
        # user
        self.user = GuestUserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def tearDown(self):
        cache.clear()

    def test_get(self):
        tag = TagFactory.create(name="test")
        api = "".join([
            reverse("tags:admin-tag-list"),
            "?",
            urlencode({
                "page": 1,
                # "search": "test"
            })
        ])
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["name"], tag.name)
        self.assertEqual(response.data["results"][0]["slug"], tag.slug)
        page_cache = cache.get(f"{self.base_cache_key}:page-1")
        self.assertIsNotNone(page_cache)

    def test_retrieve(self):
        tag = TagFactory.create(name="test")
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], tag.name)
        self.assertEqual(response.data['slug'], tag.slug)
        cache_key = get_detail_key(
            base_key=self.base_cache_key, pk=str(tag.id))
        cache_data = cache.get(cache_key)
        self.assertIsNotNone(cache_data)
        self.assertEqual(cache_data.id, tag.id)
        self.assertEqual(cache_data.name, tag.name)

    def test_post(self):
        post_data = {
            "name": "postname",
            "slug": "slugpost",
        }
        api = reverse("tags:admin-tag-list")
        response = self.client.post(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_put(self):
        tag = TagFactory.create(name="test")
        post_data = {
            "name": "postname",
            "slug": "slug-post",
        }
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.put(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete(self):
        tag = TagFactory.create(name="test")
        api = reverse("tags:admin-tag-detail", kwargs={"pk": tag.id})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
