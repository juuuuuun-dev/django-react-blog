from bs4 import BeautifulSoup
from categories.models import Category, get_all_categories
from categories.serializers import CategoryListSerializer
from django.shortcuts import get_object_or_404
from markdown import markdown
from rest_framework import filters, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tags.models import Tag, get_all_tags
from tags.serializers import TagListSerializer
from users.models import User
from utils.cache_views import CacheModelViewSet
from utils.file import delete_thumb

from ..models import Post
from ..paginatin import PostPagination
from ..serializers.admin_serializers import AdminPostSerializer


class AdminPostViewSet(CacheModelViewSet):
    queryset = Post.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated,)
    serializer_class = AdminPostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'plain_content']
    pagination_class = PostPagination
    base_cache_key = 'posts'

    def list(self, request):
        # queryset = Post.objects.all().order_by('-id')
        print("listdayo")
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

    def update(self, request, pk=None):
        queryset = self.queryset
        instance = get_object_or_404(queryset, pk=pk)
        # cover
        if 'cover' in self.request.data:
            post = Post.objects.get(id=self.kwargs['pk'])
            delete_thumb(post.cover.name)
        # copy
        cp = request.data.copy()
        # for validation
        tag = self.request.data.getlist('tag[]', None)
        # if "tag[]" in cp:
        #     cp['tag'] = self.request.data.get("tag[]")

        serializer = self.get_serializer(
            instance, data=cp)
        serializer.is_valid(raise_exception=True)
        serializer.save(tag=tag)
        # delete cache
        self.delete_page_cache(base_key=self.base_cache_key)
        self.delete_detail_cache(base_key=self.base_cache_key, pk=pk)
        return Response(serializer.data)

    # def perform_update(self, serializer):
    #     print("preform")
    #     category = Category.objects.get(id=self.request.data['category'])
    #     html = markdown(self.request.data['content'])
    #     plain = ''.join(
    #         BeautifulSoup(
    #             html,
    #             features="html.parser").findAll(
    #             text=True))
    #     tags = Tag.objects.filter(
    #         id__in=self.request.data.getlist(
    #             'tag[]', None))
    #     # cover
    #     if 'cover' in self.request.data:
    #         post = Post.objects.get(id=self.kwargs['pk'])
    #         delete_thumb(post.cover.name)

    #     serializer.save(plain_content=plain, category=category, tag=tags)

    def getTagAndCategoryList(self):
        tagSerializer = TagListSerializer(get_all_tags(), many=True)
        categorySerializer = CategoryListSerializer(
            get_all_categories(), many=True)

        # categories = {}
        # for val in obj.values():
        #     categories[val['id']] = val

        return {
            "tags": tagSerializer.data,
            "categories": categorySerializer.data
        }
