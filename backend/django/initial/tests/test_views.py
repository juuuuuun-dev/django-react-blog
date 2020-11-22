import re

from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from media.models import Media
from posts.factories import PostFactory
from rest_framework import status
from rest_framework.test import APITestCase
from site_settings.models import SiteSetting
from tags.factories import TagFactory
from users.factories import UserFactory
from utils.file import delete_thumb


class InitialViewsTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()

    def tearDown(self):
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete()

    def test_get(self):
        site_settings = SiteSetting.get_site_setting()
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category = CategoryFactory(name="cat")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("init:init-api")
        print(160 / 2)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["author"]["public_name"],
            self.user.profile.public_name)
        self.assertEqual(
            response.data["site_settings"]["name"],
            site_settings.name)
        self.assertEqual(
            response.data["site_settings"]["description"],
            site_settings.description)
        self.assertEqual(
            response.data["recent_posts"][0]["title"],
            post.title)
        rx = r"{0}".format(
            post.cover_media.cover.name)
        m = re.search(
            rx, response.data["recent_posts"][0]["cover_media"]["cover"])
        self.assertTrue(m)
        rx = r"{0}".format(
            post.cover_media.cover_mini.name)
        m = re.search(
            rx, response.data["recent_posts"][0]["cover_media"]["cover_mini"])
        self.assertTrue(m)
        self.assertEqual(
            response.data["categories"][0]["name"],
            category.name)
        self.assertEqual(
            response.data["categories"][0]["slug"],
            category.slug)
        self.assertEqual(response.data["tags"][0]["name"], tag.name)
        self.assertEqual(response.data["tags"][0]["slug"], tag.slug)
