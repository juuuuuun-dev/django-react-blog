from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from tags.serializers import TagListSerializer
from tags.models import Tag


class PostPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        tagSerializer = TagListSerializer(Tag.objects.all(), many=True)
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'tags': tagSerializer.data,
            'results': data
        })
