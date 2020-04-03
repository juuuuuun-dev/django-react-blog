from .serializers import TagSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Tag


class AdminTagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer
