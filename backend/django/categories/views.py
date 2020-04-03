from .serializers import CategorySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import Category


class AdminCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = CategorySerializer
