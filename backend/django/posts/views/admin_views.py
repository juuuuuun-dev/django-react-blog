from bs4 import BeautifulSoup
from categories.models import get_all_categories
from categories.serializers import CategoryListSerializer
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from markdown import markdown
from rest_framework import filters, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tags.models import get_all_tags
from tags.serializers import TagListSerializer
from users.models import User
from utils.cache_views import CacheModelViewSet
from utils.file import base64decode, delete_thumb

from ..models import Post
from ..paginatin import PostPagination
from ..serializers.admin_serializers import AdminPostSerializer


class AdminPostViewSet(CacheModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminPostSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'plain_content']
    filterset_fields = ['category']
    pagination_class = PostPagination
    base_cache_key = 'posts'

    def list(self, request):
        # queryset = self.filter_queryset(self.queryset.filter())
        queryset = self.get_list_queryset(
            request=request, base_key=self.base_cache_key)

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
        data = self.get_tag_and_category_list()
        data["post"] = serializer.data
        return Response(data)

    def form_item(self, serializser):
        data = self.get_tag_and_category_list()
        return Response(data)

    def create(self, request, *args, **kwargs):
        user = User.objects.get(id=self.request.user.id)
        cp = request.data.copy()
        if 'cover' in self.request.data:
            cp['cover'] = base64decode(self.request.data['cover'])
        if 'content' in self.request.data:
            plain = self.make_plain_content(self.request.data['content'])

        serializer = self.get_serializer(
            data=cp, context={
                'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user, plain_content=plain)
        # cache
        self.delete_list_query_cache(base_key=self.base_cache_key)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        cp = request.data.copy()

        if 'cover' in self.request.data:
            post = Post.objects.get(id=self.kwargs['pk'])
            delete_thumb(post.cover.name)
            cp['cover'] = base64decode(self.request.data['cover'])
        if 'content' in self.request.data:
            plain = self.make_plain_content(self.request.data['content'])

        serializer = self.get_serializer(
            instance, data=cp)
        serializer.is_valid(raise_exception=True)
        serializer.save(plain_content=plain)
        # delete cache
        self.delete_list_query_cache(base_key=self.base_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
        return Response(serializer.data)

    def make_plain_content(self, content):
        html = markdown(content)
        plain = ''.join(BeautifulSoup(
            html, features="html.parser").findAll(
            text=True))
        return plain

    def get_tag_and_category_list(self):
        tagSerializer = TagListSerializer(get_all_tags(), many=True)
        categorySerializer = CategoryListSerializer(
            get_all_categories(), many=True)
        return {
            "tags": tagSerializer.data,
            "categories": categorySerializer.data
        }
