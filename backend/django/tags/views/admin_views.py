from rest_framework import filters, permissions
from tags.models import Tag
from tags.serializers import TagSerializer
from utils import cache_views


class AdminTagViewSet(cache_views.CacheModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = "tags"
