from django.urls import path

from .views import (PasswordResetConfirmationView, PasswordResetView,
                    UserProfileView)

app_name = 'users'

urlpatterns = [
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
