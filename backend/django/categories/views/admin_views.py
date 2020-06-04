from categories.models import Category
from categories.serializers import CategorySerializer
from rest_framework import filters, permissions
from utils import cache_views


class AdminCategoryViewSet(cache_views.CacheModelViewSet):
    queryset = Category.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = 'categories'
