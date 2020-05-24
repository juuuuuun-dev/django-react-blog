from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.cache_views import CacheModelViewSet

from ..models import Tag
from ..serializers import TagSerializer


class AdminTagViewSet(CacheModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    base_cache_key = "tags"
