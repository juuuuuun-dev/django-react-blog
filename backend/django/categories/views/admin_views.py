from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from utils import cache_views

from ..models import Category
from ..serializers import CategorySerializer


class AdminCategoryViewSet(cache_views.CacheModelViewSet):
    queryset = Category.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = 'categories'
