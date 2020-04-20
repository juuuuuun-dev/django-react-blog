from ..models import Media
from ..serializers.admin_serializers import AdminMediaSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class AdminMediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminMediaSerializer

    def perform_update(self, serializer):
        """
        remove thumb
        """
        if "file" in self.request.data:
            media = Media.objects.get(id=self.kwargs['pk'])
            Media.deleteThumb(media.file)
        serializer.save()