from django.contrib.sitemaps import Sitemap
from tags.models import Tag


class TagSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Tag.objects.all()

    def location(self, obj):
        return f"/tag/{obj.slug}"

    def lastmod(self, obj):
        return obj.updated_at
