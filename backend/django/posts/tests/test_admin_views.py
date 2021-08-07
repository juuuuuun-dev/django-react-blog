from urllib.parse import urlencode

from categories.factories import CategoryFactory
from django.core.cache import cache
from django.urls import reverse
from media.factories import MediaFactory
from media.models import Media
from posts.factories import PostFactory
from posts.models import Post
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from tags.factories import TagFactory
from users.factories import UserFactory
from utils.file import delete_thumb


class AdminPostViewSetTestCase(APITestCase):
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
        cache.clear()
        media = Media.objects.all()
        for value in media:
            delete_thumb(value.file.name)
            value.file.delete(False)

    def test_list(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("posts:admin-post-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post.title)
        self.assertEqual(response.data['results'][0]['slug'], post.slug)
        self.assertTrue(response.data['results'][0]['category'])
        self.assertEqual(len(response.data['results'][0]['tag']), 1)
        self.assertEqual(len(response.data['tags']), 2)

    def test_get_filter_category(self):
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
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post2.title)
        self.assertEqual(response.data['results'][0]['slug'], post2.slug)
        self.assertEqual(response.data['results'][0]['category'], category2.id)
        self.assertNotEqual(response.data['results'][0]['title'], post.title)

    def test_get_filter_serach_title(self):
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
            urlencode({"search": post2.title}),
        ])
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['title'], post2.title)
        self.assertEqual(response.data['results'][0]['slug'], post2.slug)
        self.assertEqual(response.data['results'][0]['category'], category2.id)
        self.assertNotEqual(response.data['results'][0]['title'], post.title)

    def test_get_not_found(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"page": 10}),
        ])
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        api = "".join([
            reverse("posts:admin-post-list"),
            "?",
            urlencode({"page": 1, "search": "abe"}),
        ])
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        category2 = CategoryFactory.create(name="category2")

        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        api = reverse("posts:admin-post-detail", kwargs={"slug": post.slug})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post']['title'], post.title)
        self.assertEqual(response.data['post']['slug'], post.slug)
        self.assertEqual(response.data['post']['content'], post.content)
        self.assertEqual(response.data['post']['is_show'], post.is_show)
        self.assertEqual(response.data['post']['category'], category.id)
        self.assertEqual(response.data['post']['tag'][0], tag.id)
        self.assertEqual(response.data['tags'][0]['id'], tag.id)
        self.assertEqual(response.data['tags'][0]['name'], tag.name)
        self.assertEqual(response.data['categories'][0]['name'], category.name)
        self.assertEqual(
            response.data['categories'][1]['name'],
            category2.name)

    def test_post(self):
        category = CategoryFactory.create(name="test")
        media = MediaFactory.create(name="test")
        tag = TagFactory.create(name="test")
        tag2 = TagFactory.create(name="test2")
        content = """\
# title
## sub title
```sh
$ ls
```
|名前|説明|
|-|-|
|long|64bitの数値 <br />  -9,223,372,036,854,775,808	から
おわり"""
        post_data = {
            "title": "test",
            "slug": "test",
            "content": content,
            "is_show": True,
            "category": category.id,
            "tag": [tag.id, tag2.id],
            "cover_media": media.id,
        }
        api = reverse("posts:admin-post-list")
        response = self.client.post(api, post_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['slug'], post_data['slug'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category'], category.id)
        self.assertEqual(response.data['cover_media'], media.id)
        self.assertEqual(response.data['tag'][0], tag.id)
        self.assertEqual(response.data['tag'][1], tag2.id)

    def test_put(self):
        tag = TagFactory.create(name="tag")
        tag2 = TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        category = CategoryFactory.create(name="test")
        media = MediaFactory.create(name="test")
        api = reverse("posts:admin-post-detail", kwargs={"slug": post.slug})
        post_data = {
            "title": "testtest",
            "slug": "slug-testtest",
            "content": "#title\n##body\n<img src=\"/img.jpg\" />\n<a href=\"./link/\">lidayo</a>",
            "is_show": False,
            "category": category.id,
            "tag": [
                tag.id,
                tag2.id],
            "cover_media": media.id,
        }

        response = self.client.put(api, post_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['slug'], post_data['slug'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category'], category.id)
        self.assertEqual(response.data['cover_media'], media.id)

    def test_delete(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("posts:admin-post-detail", kwargs={"slug": post.slug})
        response = self.client.delete(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_form_item(self):
        category = CategoryFactory.create(name="test")
        tag = TagFactory.create(name="test-tag")
        api = reverse("posts:post-form-item")
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['tags']), 1)
        self.assertEqual(len(response.data['categories']), 1)
        self.assertEqual(response.data['tags'][0]['name'], tag.name)
        self.assertEqual(response.data['categories'][0]['name'], category.name)
