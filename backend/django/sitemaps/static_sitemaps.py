from django.conf import settings
from django.contrib.sitemaps import Sitemap
from django.contrib.sites.models import Site


class StaticSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return ['', 'about']

    def location(self, key):
        return f"/{key}"

    # def get_urls(self, site=None, **kwargs):
    #     site = Site(
    #         domain=settings.FRONTEND_DOMAIN,
    #         name=settings.FRONTEND_DOMAIN)
    #     return super(StaticSitemap, self).get_urls(site=site, **kwargs)
