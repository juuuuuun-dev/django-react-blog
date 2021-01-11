from categories.models import Category
from categories.serializers import CategorySerializer
from rest_framework import filters
from users.parmission import GuestReadOnly
from utils import cache_views


class AdminCategoryViewSet(cache_views.CacheModelViewSet):
    permission_classes = (GuestReadOnly, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'slug']
    base_cache_key = 'categories'
