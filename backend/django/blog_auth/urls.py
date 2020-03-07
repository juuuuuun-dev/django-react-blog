from django.urls import path, re_path, include
# from rest_auth.registration.views import ConfirmEmailView, VerifyEmailView


urlpatterns = [
    path("", include("rest_auth.urls")),
    path("register/", include("rest_auth.registration.urls")),
]
