from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.response import Response
from users.models import AboutMe, User
from users.serializers import AboutMeSerializer


class AboutMeView(views.APIView):
    def get(self, request):
        author = User.get_author()
        queryset = AboutMe.objects.all()
        about_me = get_object_or_404(
            queryset, user_id=author.id)
        seralizer = AboutMeSerializer(about_me)
        return Response(seralizer.data)
