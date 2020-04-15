from ..models import Post
from ..serializers.admin_serializers import AdminPostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from categories.models import Category
from tags.models import Tag
from users.models import User
from rest_framework.response import Response
from categories.serializers import CategoryListSerializer
from tags.serializers import TagListSerializer
from bs4 import BeautifulSoup
from markdown import markdown


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminPostSerializer

    def list(self, request):
        queryset = Post.objects.all().order_by('-id')
        serializer = self.serializer_class(queryset, many=True)
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)
        data = {
            "data": serializer.data,
            "tags": tagSerializer.data,
        }
        return Response(data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset
        post = get_object_or_404(queryset, pk=pk)
        serializer = AdminPostSerializer(post)
        data = self.getTagAndCategoryList()
        data["post"] = serializer.data
        return Response(data)

    def form_item(self, serializser):
        data = self.getTagAndCategoryList()
        return Response(data)

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.user.id)
        category = Category.objects.get(id=self.request.data['category'])
        tags = Tag.objects.filter(id__in=self.request.data['tag'])
        html = markdown(self.request.data['content'])
        plain = ''.join(BeautifulSoup(html).findAll(text=True))
        serializer.save(
            user=user,
            plain_content=plain,
            category=category,
            tag=tags)

    def perform_update(self, serializer):
        category = Category.objects.get(id=self.request.data['category'])
        tags = Tag.objects.filter(id__in=self.request.data['tag'])
        html = markdown(self.request.data['content'])
        plain = ''.join(BeautifulSoup(html).findAll(text=True))
        serializer.save(plain_content=plain, category=category, tag=tags)

    def getTagAndCategoryList(self):
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)
        categorySerializer = CategoryListSerializer(
            Category.objects.all(), many=True)
        return {
            "tags": tagSerializer.data,
            "categories": categorySerializer.data,
        }
