from django.urls import path, include
from .views import verify_auth_view, UserProfileView

urlpatterns = [
    path('verify-auth/', verify_auth_view),
    path('user-profile/', UserProfileView.as_view()),
]
