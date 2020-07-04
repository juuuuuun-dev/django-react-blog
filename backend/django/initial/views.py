from categories.models import Category
from categories.serializers import CategoryListSerializer
from posts.models import Post
from posts.serializers.main_serializers import MainPostListSerializer
from rest_framework import filters, response, views
from tags.models import Tag
from tags.serializers import TagListSerializer
from users.models import User
from users.serializers import PublicAuthorSerializer


class InitialView(views.APIView):

    def get(self, request, *args, **kwargs):
        author = User.get_author()
        categories = Category.get_all()
        tags = Tag.get_all()
        recent_posts = Post.get_recent_posts()
        recent_post_serializer = MainPostListSerializer(
            recent_posts, many=True)
        tag_serializer = TagListSerializer(tags, many=True)
        category_serializer = CategoryListSerializer(categories, many=True)
        author_serializer = PublicAuthorSerializer(author, context={
            "request": request})
        data = {
            "author": author_serializer.data["profile"],
            "categories": category_serializer.data,
            "tags": tag_serializer.data,
            "recent_posts": recent_post_serializer.data,
        }
        return response.Response(data)
