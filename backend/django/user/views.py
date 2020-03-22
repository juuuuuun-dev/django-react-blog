from pprint import pprint
from django.http import Http404
from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.permissions import IsAuthenticated, AllowAny
# from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from .parmission import UserIsOwnerUserProfile

from .models import UserProfile, User
from .serializers import UserProfileSerializer, UserSerializer, \
    PasswordResetSerializer, PasswordResetConfirmSerializer


class UserProfileView(views.APIView):
    permission_classes = (IsAuthenticated, AllowAny)
    # authentication_classes = (TokenAuthentication)
    # authentication_classes = [TokenAuthentication]

    def get(self, request):
        user = User.objects.get(id=self.request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # def post(self, request):
    #     serializer = UserProfileSerializer(data=self.request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save(user=self.request.user)
    #     return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(data=request.data)

        # serializer = UserProfileSerializer(data=self.request.data)
        if serializer.is_valid(raise_exception=True):
            user = User.objects.get(id=self.request.user.id)
            serializer.update(instance=user,
                              validated_data=request.data)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(views.APIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetSerializer

    def post(self, request):
        user_profile = self.get_user_profile(request.data['email'])
        if user_profile:
            result = user_profile.send_password_reset_email(
                site=get_current_site(request))
            data = {
                'sending': True,
            }
            if result:
                data['reset_data'] = result
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get_user_profile(self, email):
        try:
            user_profile = UserProfile.objects.get(user__email=email)
        except BaseException:
            return None
        return user_profile


class PasswordResetConfirmationView(views.APIView):
    permission_classes = (AllowAny,)
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data,
            context={
                'uid': kwargs['uid'],
                'token': kwargs['token']
            }
        )

        if serializer.is_valid(raise_exception=True):
            # print(self.user.is_active)
            new_password = serializer.validated_data.get('new_password')
            user = serializer.user
            user.set_password(new_password)
            user.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
@api_view(["GET"])
@permission_classes([AllowAny])
def verify_auth_view(request):
    if request.method == "GET":
        existing_user = User.objects.get(id=request.user.id)
        print(existing_user)
        if existing_user:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
