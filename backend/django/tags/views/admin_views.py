from ..models import Tag
from ..serializers import TagSerializer
from rest_framework import viewsets
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated


class AdminTagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
