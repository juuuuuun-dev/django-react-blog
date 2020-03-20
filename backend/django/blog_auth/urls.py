from django.urls import path, re_path, include
# from rest_auth.registration.views import ConfirmEmailView, VerifyEmailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenRefreshSlidingView,
)
from .views import MyTokenObtainPairView


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
