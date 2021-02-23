from django.conf import settings
from django.contrib.sitemaps import Sitemap
from django.core.paginator import Paginator
from posts.models import Post


class PostSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Post.objects.filter(is_show=True)

    def location(self, obj):
        return f"/posts/{obj.slug}"

    def lastmod(self, obj):
        return obj.updated_at


class PostPaginateSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        posts = Post.objects.filter(is_show=True)
        lists = Paginator(posts, settings.PAGE_SIZE)
        return lists.page_range

    def location(self, page):
        return f"/?page={page}"
