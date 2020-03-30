from django.shortcuts import render
from django.http import Http404
from .serializers import TagSerializer
from rest_framework import views, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from users.models import UserProfile, User
from .models import Tag


class AdminTagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer

    # def get(self, request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)
