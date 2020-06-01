from categories.models import get_all_categories
from categories.serializers import CategoryListSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from tags.models import get_all_tags
from tags.serializers import TagListSerializer


class PostPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        tagSerializer = TagListSerializer(get_all_tags(), many=True)
        categorySerializer = CategoryListSerializer(
            get_all_categories(), many=True)
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'tags': tagSerializer.data,
            'categories': categorySerializer.data,
            'results': data
        })
