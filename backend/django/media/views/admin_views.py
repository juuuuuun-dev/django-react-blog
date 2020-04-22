from ..models import Media
from ..serializers.admin_serializers import AdminMediaSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from ..pagination import MediaPagination
from rest_framework import filters


class AdminMediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminMediaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def perform_update(self, serializer):
        """
        remove thumb
        """
        if "file" in self.request.data:
            media = Media.objects.get(id=self.kwargs['pk'])
            Media.deleteThumb(media.file)
        serializer.save()


class AdminPostPageMediaView(generics.ListCreateAPIView):
    queryset = Media.objects.all().order_by('-id')
    serializer_class = AdminMediaSerializer
    pagination_class = MediaPagination
    # def get(self, request):
