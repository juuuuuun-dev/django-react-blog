from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Post
from ..serializers.main_serializers import (MainPostListSerializer,
                                            MainPostSerializer)


class PostList(APIView):
    queryset = Post.objects.all()
    serializer_class = MainPostListSerializer

    def get(self, request):
        posts = Post.objects.filter(is_show=True).order_by('-id')
        serializer = self.serializer_class(posts, many=True)
        result = {
            "posts": serializer.data,
        }
        return Response(result)


class PostDetail(APIView):
    queryset = Post.objects.all()
    serializer_class = MainPostSerializer

    def get(self, request, pk=None):
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, pk=pk, is_show=True)
        serializer = MainPostSerializer(post)

        result = {
            "post": serializer.data,
        }
        return Response(result)
