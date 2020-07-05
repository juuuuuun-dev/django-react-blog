from categories.models import Category
from categories.serializers import CategoryListSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from tags.models import Tag
from tags.serializers import TagListSerializer


class PostPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        tagSerializer = TagListSerializer(Tag.get_all(), many=True)
        categorySerializer = CategoryListSerializer(
            Category.get_all(), many=True)
        response = {
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'tags': tagSerializer.data,
            'categories': categorySerializer.data,
            'results': data
        }
        return Response(response)
