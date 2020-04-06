from .serializers import PostSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Post
from users.models import User
from rest_framework.response import Response


class AdminPostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def form_item(self, serializser):
        print("createdayo")
        return Response("form_item")

    def perform_create(self, serializer):
        user = User.objects.get(id=self.request.user.id)
        serializer.save(user=user)
