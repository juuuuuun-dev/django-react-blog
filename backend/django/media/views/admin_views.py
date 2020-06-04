from django.core.cache import cache
from media.models import Media
from media.serializers import admin_serializers
from rest_framework import filters, generics, permissions
from utils import cache_views, file


class AdminMediaViewSet(cache_views.CacheModelViewSet):
    queryset = Media.objects.all().order_by('-id')
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = admin_serializers.AdminMediaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = 'media'

    def perform_update(self, serializer):
        """
        remove thumb
        """
        if "file" in self.request.data:
            media = Media.objects.get(id=self.kwargs['pk'])
            file.delete_thumb(media.file.name)
        serializer.save()


def get_all_media():
    base_cache_key = 'media'
    result = cache.get(base_cache_key)
    if result:
        return result
    instance = Media.objects.all().order_by('-id')
    cache.set(base_cache_key, instance)
    return instance


class AdminPostPageMediaView(generics.ListCreateAPIView):
    queryset = get_all_media()
    serializer_class = admin_serializers.AdminMediaSerializer
    permission_classes = (permissions.IsAuthenticated,)
