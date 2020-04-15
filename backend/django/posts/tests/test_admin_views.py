from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from users.factories import UserFactory
from tags.factories import TagFactory
from categories.factories import CategoryFactory
from posts.factories import PostFactory
from django.urls import reverse


class AdminPostViewSetTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.user.set_password("test1234")
        self.user.save()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer {}".format(refresh.access_token))

    def test_get(self):
        tag = TagFactory.create(name="tagdayo")
        TagFactory.create(name="tag2")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("posts:admin-post-list")
        response = self.client.get(api)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['title'], post.title)
        self.assertTrue(response.data['data'][0]['category'])
        self.assertEqual(len(response.data['data'][0]['tag']), 1)
        self.assertEqual(len(response.data['tags']), 2)

    def test_retrieve(self):
        tag = TagFactory.create(name="tag")
        category = CategoryFactory.create(name="test")
        category2 = CategoryFactory.create(name="category2")

        post = PostFactory.create(user=self.user, category=category, tag=[tag])
        api = reverse("posts:admin-post-detail", kwargs={"pk": post.id})
        response = self.client.get(api, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['post']['title'], post.title)
        self.assertEqual(response.data['post']['content'], post.content)
        self.assertEqual(response.data['post']['is_show'], post.is_show)
        self.assertEqual(response.data['post']['category']['id'], category.id)
        self.assertEqual(response.data['post']['tag'][0]['id'], tag.id)
        self.assertEqual(response.data['tags'][0]['id'], tag.id)
        self.assertEqual(response.data['tags'][0]['name'], tag.name)
        self.assertEqual(response.data['categories'][0]['name'], category.name)
        self.assertEqual(
            response.data['categories'][1]['name'],
            category2.name)

    def test_post(self):
        category = CategoryFactory.create(name="test")
        tag = TagFactory.create(name="test")
        tag2 = TagFactory.create(name="test2")
        post_data = {
            "title": "test",
            "content": "content test",
            "is_show": True,
            "category": category.id,
            "tag": [tag.id, tag2.id],
        }
        api = reverse("posts:admin-post-list")
        response = self.client.post(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category']['id'], category.id)
        self.assertEqual(response.data['tag'][0]['id'], tag.id)
        self.assertEqual(response.data['tag'][1]['id'], tag2.id)

    def test_put(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        category = CategoryFactory.create(name="test")
        api = reverse("posts:admin-post-detail", kwargs={"pk": post.id})

        post_data = {
            "title": "testtest",
            "content": "#title\n##body\n<img src=\"/img.jpg\" />\n<a href=\"./link/\">lidayo</a>",
            "is_show": False,
            "category": category.id,
            "tag": [
                tag.id]}
        response = self.client.put(api, post_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], post_data['title'])
        self.assertEqual(response.data['content'], post_data['content'])
        self.assertEqual(response.data['is_show'], post_data['is_show'])
        self.assertEqual(response.data['category']['id'], category.id)
        self.assertEqual(response.data['tag'][0]['id'], tag.id)
        print(response.data)

    def test_delete(self):
        tag = TagFactory.create(name="tag")
        post = PostFactory.create(user=self.user, tag=[tag])
        api = reverse("posts:admin-post-detail", kwargs={"pk": post.id})

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
