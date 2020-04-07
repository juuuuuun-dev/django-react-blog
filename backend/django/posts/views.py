from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Post
from categories.models import Category
from tags.models import Tag
from users.models import User
from rest_framework.response import Response
from categories.serializers import CategorySerializer
from tags.serializers import TagSerializer


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def form_item(self, serializser):
        categorySerializer = CategorySerializer(
            Category.objects.all(),
            many=True
        )
        tagSerializer = TagSerializer(Tag.objects.all(), many=True)

        data = {
            "categories": categorySerializer.data,
            "tags": tagSerializer.data,
        }
        return Response(data)

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.user.id)
        serializer.save(user=user)
