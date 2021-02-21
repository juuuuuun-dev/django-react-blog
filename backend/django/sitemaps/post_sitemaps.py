from django.conf import settings
from django.contrib.sitemaps import Sitemap
from django.contrib.sites.models import Site
from django.core.paginator import Paginator
from posts.models import Post


class PostSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Post.objects.filter(is_show=True)

    def location(self, obj):
        return f"/posts/{obj.slug}"

    # def get_urls(self, site=None, **kwargs):
    #     site = Site(
    #         domain=settings.FRONTEND_DOMAIN,
    #         name=settings.FRONTEND_DOMAIN)
    #     return super(PostSitemap, self).get_urls(site=site, **kwargs)

    def lastmod(self, obj):
        return obj.updated_at


class PostPaginateSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        posts = Post.objects.filter(is_show=True)
        lists = Paginator(posts, settings.PAGE_SIZE)
        return lists.page_range

    # def get_urls(self, site=None, **kwargs):
    #     site = Site(
    #         domain=settings.FRONTEND_DOMAIN,
    #         name=settings.FRONTEND_DOMAIN)
    #     return super(PostPaginateSitemap, self).get_urls(site=site, **kwargs)

    def location(self, page):
        return f"/?page={page}"
