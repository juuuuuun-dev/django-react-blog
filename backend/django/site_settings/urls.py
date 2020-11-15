from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views.admin_views import AdminSiteSettingView

app_name = 'site-settings'


router = DefaultRouter()


urlpatterns = [
    path('admin-site-setting/',
         AdminSiteSettingView.as_view(),
         name="admin-site-setting"),
    # path('about-me/', AboutMeView.as_view(), name="about-me"),
]
