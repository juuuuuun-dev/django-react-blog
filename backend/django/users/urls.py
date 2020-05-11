from django.urls import path
from .views import UserProfileView, PasswordResetView, \
    PasswordResetConfirmationView
app_name = 'users'

urlpatterns = [
    # path('verify-auth/', verify_auth_view),
    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path(
        'password-reset/',
        PasswordResetView.as_view(),
        name='password-reset'),

    path('password-reset-confirm/<str:uid>/<str:token>/',
         PasswordResetConfirmationView.as_view(),
         name='password-reset-confirm'
         ),
]
