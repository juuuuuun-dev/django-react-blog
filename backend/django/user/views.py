from django.http import Http404
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes

from .models import UserProfile, User
from .serializers import UserProfileSerializer, UserSerializer

class UserProfileView(views.APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = User.objects.get(id=self.request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Create your views here.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def verify_auth_view(request):
    if request.method == "GET":
        existing_user = User.objects.get(id=request.user.id)
        print(existing_user)
        if existing_user:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
