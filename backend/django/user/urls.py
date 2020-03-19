from django.urls import path, include
from .views import UserProfileView, UserTestView

urlpatterns = [
    # path('verify-auth/', verify_auth_view),
    path('user-profile/', UserProfileView.as_view(), name='userprofile'),
    path('user-test/', UserTestView.as_view(), name='usertest'),
]
