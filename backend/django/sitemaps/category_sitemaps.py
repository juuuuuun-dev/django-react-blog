from categories.models import Category
from django.contrib.sitemaps import Sitemap


class CategorySitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Category.objects.all()

    def location(self, obj):
        return f"/category/{obj.slug}"

    def lastmod(self, obj):
        return obj.updated_at
