from bs4 import BeautifulSoup
from categories.models import Category
from categories.serializers import CategoryListSerializer
from django.shortcuts import get_object_or_404
from markdown import markdown
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tags.models import Tag
from tags.serializers import TagListSerializer
from users.models import User
from utils.file import delete_thumb

from ..models import Post
from ..paginatin import PostPagination
from ..serializers.admin_serializers import AdminPostSerializer


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminPostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'plain_content']
    pagination_class = PostPagination

    def list(self, request):
        # queryset = Post.objects.all().order_by('-id')
        queryset = self.filter_queryset(self.queryset.filter())
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True, context={
            "request": request})
        return self.get_paginated_response(
            serializer.data)

    def retrieve(self, request, pk=None):
        queryset = self.queryset
        post = get_object_or_404(queryset, pk=pk)
        serializer = AdminPostSerializer(post, context={
            "request": request})
        data = self.getTagAndCategoryList()
        data["post"] = serializer.data
        return Response(data)

    def form_item(self, serializser):
        data = self.getTagAndCategoryList()
        return Response(data)

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.user.id)
        category = Category.objects.get(id=self.request.data['category'])
        tags = Tag.objects.filter(
            id__in=self.request.data.getlist(
                'tag[]', None))
        html = markdown(self.request.data['content'])
        plain = ''.join(
            BeautifulSoup(
                html,
                features="html.parser").findAll(
                text=True))
        serializer.save(
            user=user,
            plain_content=plain,
            category=category,
            tag=tags)

    def perform_update(self, serializer):
        category = Category.objects.get(id=self.request.data['category'])
        html = markdown(self.request.data['content'])
        plain = ''.join(
            BeautifulSoup(
                html,
                features="html.parser").findAll(
                text=True))
        tags = Tag.objects.filter(
            id__in=self.request.data.getlist(
                'tag[]', None))
        # cover
        if 'cover' in self.request.data:
            post = Post.objects.get(id=self.kwargs['pk'])
            delete_thumb(post.cover.name)

        serializer.save(plain_content=plain, category=category, tag=tags)

    def getTagAndCategoryList(self):
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)
        categorySerializer = CategoryListSerializer(
            Category.objects.all(), many=True)
        return {
            "tags": tagSerializer.data,
            "categories": categorySerializer.data,
        }
