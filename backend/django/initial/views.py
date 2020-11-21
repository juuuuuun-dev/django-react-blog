from categories.models import Category
from categories.serializers import CategoryListSerializer
from django.conf import settings
from posts.models import Post
from posts.serializers.main_serializers import MainPostListSerializer
from rest_framework import response, views
from site_settings.models import SiteSetting
from site_settings.serializers.main_serializers import \
    MainSiteSettingSerializer
from tags.models import Tag
from tags.serializers import TagListSerializer
from users.models import User
from users.serializers import PublicAuthorSerializer


class InitialView(views.APIView):

    def get(self, request, *args, **kwargs):
        author = User.get_author()
        site_setting = SiteSetting.get_site_setting()
        categories = Category.get_all()
        tags = Tag.get_all()

        recent_posts = Post.get_recent_posts()
        recent_post_serializer = MainPostListSerializer(
            recent_posts, many=True)
        tag_serializer = TagListSerializer(tags, many=True)
        category_serializer = CategoryListSerializer(categories, many=True)
        author_serializer = PublicAuthorSerializer(author, context={
            "request": request})
        site_setting_serializer = MainSiteSettingSerializer(
            site_setting, context={"request": request})
        data = {
            "author": author_serializer.data["profile"],
            "site_settings": site_setting_serializer.data,
            "categories": category_serializer.data,
            "tags": tag_serializer.data,
            "recent_posts": recent_post_serializer.data,
            "url": settings.FRONTEND_URL,
            "page_size": settings.PAGE_SIZE,
        }
        return response.Response(data)
