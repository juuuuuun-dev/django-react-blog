from django.shortcuts import get_object_or_404
from posts.models import Post
from posts.serializers import main_serializers
from rest_framework import response, views


class PostList(views.APIView):
    throttle_scope = 'main'
    queryset = Post.objects.all()
    serializer_class = main_serializers.MainPostListSerializer

    def get(self, request):
        posts = Post.objects.filter(is_show=True).order_by('-id')
        serializer = self.serializer_class(posts, many=True)
        result = {
            "posts": serializer.data,
        }
        return response.Response(result)


class PostDetail(views.APIView):
    throttle_scope = 'main'
    queryset = Post.objects.all()
    serializer_class = main_serializers.MainPostSerializer

    def get(self, request, pk=None):
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, pk=pk, is_show=True)
        serializer = main_serializers.MainPostSerializer(post)

        result = {
            "post": serializer.data,
        }
        return response.Response(result)
