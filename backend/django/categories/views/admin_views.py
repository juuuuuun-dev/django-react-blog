from ..models import Category
from ..serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework import filters


class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
