from django.urls import path, re_path, include
# from rest_auth.registration.views import ConfirmEmailView, VerifyEmailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import MyTokenObtainPairView


urlpatterns = [
    path("", include("rest_auth.urls")),
    path("register/", include("rest_auth.registration.urls")),
    # new
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
