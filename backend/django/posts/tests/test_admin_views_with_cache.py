from urllib.parse import urlencode

from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from posts.factories import PostFactory
from posts.models import Post
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from tags.factories import TagFactory
from users.factories import UserFactory
from utils.cache_views import cache_key_stringfiy, get_detail_key
from utils.file import delete_thumb


class AdminPostViewSetWithTestCase(APITestCase):
    def setUp(self):
        cache.clear()
        self.base_cache_key = "posts"
        self.base64image = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABIAAD/4QMcaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMiA3OS4xNjQzNTIsIDIwMjAvMDEvMzAtMTU6NTA6MzggICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQ3QTU5NEZBOTI1OTExRUE4M0RDRjNERUZFMjM0RkFGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3QTU5NEY5OTI1OTExRUE4M0RDRjNERUZFMjM0RkFGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIwIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSIzQTBFMjdGNEVCNDlDOEREODVERURCMEUwNjFBM0ZCMCIgc3RSZWY6ZG9jdW1lbnRJRD0iM0EwRTI3RjRFQjQ5QzhERDg1REVEQjBFMDYxQTNGQjAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAEAwMDAwMEAwMEBQMDAwUGBQQEBQYHBgYGBgYHCQcICAgIBwkJCwsMCwsJDAwMDAwMEBAQEBASEhISEhISEhISAQQEBAcHBw4JCQ4UDg0OFBQSEhISFBISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhL/wAARCAAKAAoDAREAAhEBAxEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAkBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ/gAAA//9k='
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

    def tearDown(self):
        posts = Post.objects.all()
        for value in posts:
            delete_thumb(value.cover.name)
            value.cover.delete()

    def test_list_with_cache(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        cache_key = cache_key_stringfiy(base_key=self.base_cache_key)
        cache_data = cache.get(cache_key)
        self.assertIsNone(cache_data)

        api = reverse("posts:admin-post-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post.title)
        cache_data = cache.get(cache_key)
        self.assertTrue(cache_data.exists())
        cache_response = self.client.get(api)
        self.assertEqual(cache_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(cache_response.data['results']), 1)
        self.assertEqual(
            cache_response.data['results'][0]['title'],
            post.title)

    def test_get_filter_category_with_cache(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category = CategoryFactory.create(name="test")
        category2 = CategoryFactory.create(name="category2")
        post = PostFactory.create(user=self.user, tag=[tag], category=category)
        post2 = PostFactory.create(
            user=self.user, tag=[tag], category=category2)
        api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"category": category2.id}),
            "&",
            urlencode({"page": 1}),
        ])
        cache_key = cache_key_stringfiy(base_key='posts', query_dict={
            'category': category2.id,
            'page': 1,
        })
        cache_data = cache.get(cache_key)
        self.assertIsNone(cache_data)
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post2.title)
        # cache
        cache_data = cache.get(cache_key)
        self.assertTrue(cache_data.exists())
        # Update and delete cache
        post_data = {
            "title": "update",
            "content": "  # update",
            "is_show": False,
            "category": category2.id,
        }
        update_api = reverse(
            "posts:admin-post-detail",
            kwargs={
                "pk": post2.id})
        update_response = self.client.put(update_api, post_data)
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        after_cache_data = cache.get(cache_key)
        self.assertIsNone(after_cache_data)

    def test_get_filter_category_cache_pk_max_update(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        category_1 = CategoryFactory.create(name="test")
        category_2 = CategoryFactory.create(name="category2")
        post = PostFactory.create(
            user=self.user,
            tag=[tag],
            category=category_1)
        post2 = PostFactory.create(
            user=self.user, tag=[tag], category=category_2)
        category_1_api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"category": category_1.id}),
            "&",
            urlencode({"page": 1}),
        ])
        category_2_api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"category": category_2.id}),
            "&",
            urlencode({"page": 1}),
        ])
        category_1_cache_key = cache_key_stringfiy(
            base_key='posts', query_dict={
                'category': category_1.id, 'page': 1, })
        category_2_cache_key = cache_key_stringfiy(
            base_key='posts', query_dict={
                'category': category_2.id, 'page': 1, })

        category_1_response = self.client.get(category_1_api)
        self.assertEqual(category_1_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(category_1_response.data['results']), 1)
        self.assertEqual(
            category_1_response.data['results'][0]['title'],
            post.title)
        # cache
        category_1_cache_data = cache.get(category_1_cache_key)
        self.assertTrue(category_1_cache_data.exists())
        category_2_cache_data = cache.get(category_2_cache_key)
        self.assertIsNone(category_2_cache_data)

        category_2_response = self.client.get(category_2_api)
        self.assertEqual(category_2_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(category_2_response.data['results']), 1)
        self.assertEqual(
            category_2_response.data['results'][0]['title'],
            post2.title)
        # cache
        category_2_cache_data = cache.get(category_2_cache_key)
        self.assertTrue(category_2_cache_data.exists())
        # update
        post_data = {
            "title": "update",
            "content": "  # update",
            "is_show": False,
            "category": category_2.id,
        }
        update_api = reverse(
            "posts:admin-post-detail",
            kwargs={
                "pk": post.id})
        update_response = self.client.put(update_api, post_data)
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        category_1_cache_data = cache.get(category_1_cache_key)
        category_2_cache_data = cache.get(category_2_cache_key)
        self.assertIsNone(category_1_cache_data)
        self.assertIsNone(category_2_cache_data)

    def test_list_delete_page_max_cache(self):
        category = CategoryFactory.create(name="test")
        post_1 = PostFactory.create(user=self.user, category=category)
        post_2 = PostFactory.create(user=self.user, category=category)
        post_3 = PostFactory.create(user=self.user, category=category)
        page = 3
        api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"category": category.id}),
            "&",
            urlencode({"page": page}),
        ])
        cache_key = cache_key_stringfiy(
            base_key=self.base_cache_key, query_dict={
                'category': category.id, 'page': page, })
        cache_data = cache.get(cache_key)
        self.assertIsNone(cache_data)

        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        cache_data = cache.get(cache_key)
        self.assertTrue(cache_data.exists())

        # Update and delete cache
        post_data = {
            "title": "update",
            "content": "  # update",
            "is_show": False,
            "category": category.id,
        }
        update_api = reverse(
            "posts:admin-post-detail",
            kwargs={
                "pk": post_1.id})
        update_response = self.client.put(update_api, post_data)
        self.assertEqual(update_response.status_code, status.HTTP_200_OK)
        after_cache_data = cache.get(cache_key)
        self.assertIsNone(after_cache_data)

    def test_retrieve_with_cache(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        cache_key = get_detail_key(base_key='posts', pk=post.id)
        cache_data = cache.get(cache_key)
        self.assertIsNone(cache_data)
        api = reverse("posts:admin-post-detail", kwargs={"pk": post.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post']['title'], post.title)
        cache_data = cache.get(cache_key)
        self.assertEqual(cache_data.id, post.id)

        cache_response = self.client.get(api, format="json")
        self.assertEqual(cache_response.status_code, status.HTTP_200_OK)
        self.assertEqual(cache_response.data['post']['title'], post.title)
