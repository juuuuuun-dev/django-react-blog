from django.urls import path, include
from .views import verify_auth_view

urlpatterns = [
    path('verify-auth/', verify_auth_view),
]
