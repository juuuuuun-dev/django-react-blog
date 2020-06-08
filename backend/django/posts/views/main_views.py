from django_filters.rest_framework import DjangoFilterBackend
from posts.models import Post
from posts.paginatin import PostPagination
from posts.serializers import main_serializers
from rest_framework import filters, response
from utils import cache_views


class PostList(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    queryset = Post.objects.filter(is_show=True).order_by('-id')
    serializer_class = main_serializers.MainPostListSerializer
    pagination_class = PostPagination
    filterset_fields = ['category', 'tag']
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]

    def list(self, request):
        queryset = self.get_list_queryset(
            request=request, base_key=self.base_cache_key)
        # Post.objects.filter(is_show=True).order_by('-id')
        # queryset = queryset.filter(is_show=True)
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True, context={
            "request": request})
        return self.get_paginated_response(
            serializer.data)
    # def get(self, request):
    #     posts = Post.objects.filter(is_show=True).order_by('-id')
    #     serializer = self.serializer_class(posts, many=True)
    #     result = {
    #         "posts": serializer.data,
    #     }
    #     return response.Response(result)


class PostDetail(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    queryset = Post.objects.filter(is_show=True)
    serializer_class = main_serializers.MainPostSerializer

    def retrieve(self, request, pk=None):
        queryset = self.get_detail_queryset(
            base_key=self.base_cache_key, request=request, pk=pk)
        serializer = self.get_serializer(queryset, context={
            "request": request})
        data = Post.get_tag_and_category_list()
        data["post"] = serializer.data
        return response.Response(data)

    # def get(self, request, pk=None):
    #     queryset = Post.objects.all()
    #     post = get_object_or_404(queryset, pk=pk, is_show=True)
    #     serializer = main_serializers.MainPostSerializer(post)

    #     result = {
    #         "post": serializer.data,
    #     }
    #     return response.Response(result)
