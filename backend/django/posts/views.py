from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Post


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer
