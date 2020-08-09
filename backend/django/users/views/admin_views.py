from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from rest_framework import status, views
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from users.models import AboutMe, User, UserProfile
from users.serializers import (AboutMeSerializer,
                               PasswordResetConfirmSerializer,
                               PasswordResetSerializer, UserProfileSerializer)
from utils.file import delete_thumb


class UserProfileView(views.APIView):
    permission_classes = (IsAuthenticated, AllowAny)

    def get(self, request):
        queryset = UserProfile.objects.all()
        user_profile = get_object_or_404(
            queryset, user_id=self.request.user.id)
        serializer = UserProfileSerializer(user_profile, context={
            "request": request})
        return Response(serializer.data)

    def put(self, request):
        queryset = UserProfile.objects.all()
        user_profile = get_object_or_404(
            queryset, user_id=self.request.user.id)
        serializer = UserProfileSerializer(
            user_profile, data=request.data, context={
                "request": request})
        if serializer.is_valid():
            if "avator" in self.request.data:
                delete_thumb(user_profile.avator.name)
            serializer.save()
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


class AdminAboutMeView(views.APIView):
    permission_classes = (IsAuthenticated, AllowAny)

    def get(self, request):
        queryset = AboutMe.objects.all()
        about_me = get_object_or_404(
            queryset, user_id=self.request.user.id)
        serializer = AboutMeSerializer(about_me, context={
            "request": request
        })
        return Response(serializer.data)
