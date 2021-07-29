from categories.models import Category
from django_filters.rest_framework import DjangoFilterBackend
from posts.models import Post
from posts.paginatin import PostPagination
from posts.serializers import main_serializers
from rest_framework import filters, response
from tags.models import Tag
from utils import cache_views


class PostList(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    queryset = Post.objects.select_related('cover_media').select_related(
        'category').prefetch_related('tag').filter(is_show=True).order_by('-id')
    serializer_class = main_serializers.MainPostListSerializer
    pagination_class = PostPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['category', 'tag']
    search_fields = ['title', 'slug', 'plain_content']

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


class PostCategorySlugList(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    # queryset = Post.objects.filter(is_show=True).order_by('-id')
    serializer_class = main_serializers.MainPostListSerializer
    pagination_class = PostPagination
    filterset_fields = ['category', 'tag']

    def list(self, request, slug=None):
        category = Category.get_by_slug(slug)
        if category:
            self.queryset = Post.objects.select_related('cover_media').select_related(
                'category').prefetch_related('tag').filter(
                is_show=True, category=category).order_by('-id')

            cp = request.query_params.copy()
            cp['category'] = category.id
            queryset = self.get_list_queryset(
                query_params=cp, base_key=self.base_cache_key)
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many=True, context={
                "request": request})
            data = {
                "category_name": category.name,
                "results": serializer.data,
            }
            return self.get_paginated_response(data)


class PostTagSlugList(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    # queryset = Post.objects.filter(is_show=True).order_by('-id')
    serializer_class = main_serializers.MainPostListSerializer
    pagination_class = PostPagination
    filterset_fields = ['category', 'tag']

    def list(self, request, slug=None):
        tag = Tag.get_by_slug(slug)
        if tag:
            self.queryset = Post.objects.filter(
                is_show=True, tag=tag).order_by('-id')

            cp = request.query_params.copy()
            cp['tag'] = tag.id
            queryset = self.get_list_queryset(
                query_params=cp, base_key=self.base_cache_key)
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many=True, context={
                "request": request})
            data = {
                "tag_name": tag.name,
                "results": serializer.data,
            }
            return self.get_paginated_response(data)


class PostDetail(cache_views.ReadOnlyCacheModelViewSet):
    throttle_scope = 'main'
    base_cache_key = Post.show_cache_key
    queryset = Post.objects.filter(is_show=True)
    serializer_class = main_serializers.MainPostSerializer
    lookup_field = 'slug'

    def retrieve(self, request, **kwargs):
        queryset = self.get_detail_queryset(
            base_key=self.base_cache_key, request=request, **kwargs)
        serializer = self.get_serializer(queryset, context={
            "request": request})
        data = Post.get_tag_and_category_list()
        related_posts = Post.get_retated_posts(queryset)
        related_posts_serializer = main_serializers.RelatedPostListSerializer(
            related_posts, many=True)
        data["post"] = serializer.data
        data["related_posts"] = related_posts_serializer.data
        return response.Response(data)

    # def get(self, request, pk=None):
    #     queryset = Post.objects.all()
    #     post = get_object_or_404(queryset, pk=pk, is_show=True)
    #     serializer = main_serializers.MainPostSerializer(post)

    #     result = {
    #         "post": serializer.data,
    #     }
    #     return response.Response(result)
