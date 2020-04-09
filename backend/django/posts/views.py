from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Post
from categories.models import Category
from tags.models import Tag
from users.models import User
from rest_framework.response import Response
from categories.serializers import CategorySerializer
from tags.serializers import TagListSerializer


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related("category")
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def list(self, request):
        queryset = Post.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)
        data = {
            "data": serializer.data,
            "tags": tagSerializer.data,
        }
        return Response(data)

    def form_item(self, serializser):
        categorySerializer = CategorySerializer(
            Category.objects.all(),
            many=True
        )
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)

        data = {
            "categories": categorySerializer.data,
            "tags": tagSerializer.data,
        }
        return Response(data)

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.user.id)
        category = Category.objects.get(id=self.request.data['category'])
        tags = Tag.objects.filter(id__in=self.request.data['tag'])
        serializer.save(user=user, category=category, tag=tags)

    def perform_update(self, serializer):
        category = Category.objects.get(id=self.request.data['category'])
        tags = Tag.objects.filter(id__in=self.request.data['tag'])
        serializer.save(category=category, tag=tags)
