from rest_framework import filters
from tags.models import Tag
from tags.serializers import TagSerializer
from users.parmission import GuestReadOnly
from utils import cache_views


class AdminTagViewSet(cache_views.CacheModelViewSet):
    permission_classes = (GuestReadOnly, )
    queryset = Tag.objects.all().order_by('-id')
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'slug']
    base_cache_key = "tags"
