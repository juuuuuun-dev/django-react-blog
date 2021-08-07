from bs4 import BeautifulSoup
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from markdown import markdown
from posts.models import Post
from posts.paginatin import PostPagination
from posts.serializers import admin_serializers
from rest_framework import filters, response, status
from users.models import User
from users.parmission import GuestReadOnly
from utils import cache_views


class AdminPostViewSet(cache_views.CacheModelViewSet):
    permission_classes = (GuestReadOnly, )
    queryset = Post.objects.all().order_by('-id')
    serializer_class = admin_serializers.AdminPostSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'slug', 'plain_content']
    filterset_fields = ['category', 'tag']
    pagination_class = PostPagination
    base_cache_key = Post.base_cache_key
    lookup_field = 'slug'

    def list(self, request):
        queryset = self.get_list_queryset(
            query_params=request.query_params, base_key=self.base_cache_key)

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True, context={
            "request": request})
        data = {
            "results": serializer.data
        }
        return self.get_paginated_response(data)

    def retrieve(self, request, slug=None):
        queryset = self.get_detail_queryset(
            base_key=self.base_cache_key, request=request, slug=slug)
        serializer = admin_serializers.AdminGetSerializer(queryset, context={
            "request": request})
        data = Post.get_tag_and_category_list()
        data["post"] = serializer.data
        return response.Response(data)

    def form_item(self, serializser):
        data = Post.get_tag_and_category_list()
        return response.Response(data)

    def create(self, request, *args, **kwargs):
        user = User.objects.get(id=self.request.user.id)
        cp = request.data.copy()
        if 'content' in self.request.data:
            plain = self.make_plain_content(self.request.data['content'])

        serializer = self.get_serializer(
            data=cp, context={
                'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user, plain_content=plain)
        # cache
        self.delete_list_cache(self.base_cache_key)
        self.delete_list_cache(Post.show_cache_key)
        self.delete_list_cache(Post.recent_cache_key)
        return response.Response(
            serializer.data,
            status=status.HTTP_201_CREATED)

    def update(self, request, slug=None):
        queryset = self.queryset
        instance = get_object_or_404(queryset, slug=slug)
        cp = request.data.copy()
        # if 'cover' in self.request.data:
        #     post = Post.objects.get(id=self.kwargs['pk'])
        #     file.delete_thumb(post.cover.name)
        #     cp['cover'] = file.base64decode(self.request.data['cover'])
        if 'content' in self.request.data:
            plain = self.make_plain_content(self.request.data['content'])

        serializer = self.get_serializer(
            instance, data=cp)
        serializer.is_valid(raise_exception=True)
        serializer.save(plain_content=plain)
        # delete cache
        self.delete_list_cache(self.base_cache_key)
        self.delete_list_cache(Post.show_cache_key)
        self.delete_list_cache(Post.recent_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, slug=slug)
        self.delete_detail_cache(base_key=Post.show_cache_key, slug=slug)
        return response.Response(serializer.data)

    def make_plain_content(self, content, length=100):
        html = markdown(content)
        plain = ''.join(BeautifulSoup(
            html, features="html.parser").findAll(
            text=True))
        return plain[:length]
