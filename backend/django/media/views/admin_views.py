from rest_framework import filters, generics, viewsets
from rest_framework.permissions import IsAuthenticated
from utils import cache_views
from utils.file import delete_thumb

from ..models import Media
from ..pagination import MediaPagination
from ..serializers.admin_serializers import AdminMediaSerializer


class AdminMediaViewSet(cache_views.CacheModelViewSet):
    queryset = Media.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminMediaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = 'media'

    def perform_update(self, serializer):
        """
        remove thumb
        """
        if "file" in self.request.data:
            media = Media.objects.get(id=self.kwargs['pk'])
            delete_thumb(media.file.name)
        serializer.save()


class AdminPostPageMediaView(generics.ListCreateAPIView):
    queryset = Media.objects.all().order_by('-id')
    serializer_class = AdminMediaSerializer
    pagination_class = MediaPagination
    # def get(self, request):
