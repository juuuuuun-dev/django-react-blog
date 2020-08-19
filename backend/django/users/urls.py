from django.urls import path
from users.views.admin_views import (AdminAboutMeView,
                                     PasswordResetConfirmationView,
                                     PasswordResetView, UserProfileView)
from users.views.main_views import AboutMeView

app_name = 'users'

urlpatterns = [
    path('user-profile/',
         UserProfileView.as_view(),
         name='user-profile'),
    path('admin-about-me/',
         AdminAboutMeView.as_view(),
         name="admin-about-me"),
    path('about-me/', AboutMeView.as_view(), name="about-me"),
    path(
        'password-reset/',
        PasswordResetView.as_view(),
        name='password-reset'),

    path('password-reset-confirm/<str:uid>/<str:token>/',
         PasswordResetConfirmationView.as_view(),
         name='password-reset-confirm'
         ),
]
