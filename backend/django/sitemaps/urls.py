from django.contrib.sitemaps.views import sitemap
from django.urls import path

from .category_sitemaps import CategorySitemap
from .post_sitemaps import PostPaginateSitemap, PostSitemap
from .static_sitemaps import StaticSitemap
from .tag_sitemaps import TagSitemap

sitemaps = {
    'static': StaticSitemap,
    'post': PostSitemap,
    'post_paginate': PostPaginateSitemap,
    'category': CategorySitemap,
    'tag': TagSitemap,
}

urlpatterns = [
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps},
         name='django.contrib.sitemaps.views.sitemap'),
]
