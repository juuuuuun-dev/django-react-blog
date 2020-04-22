from django.urls import path, include
from .views.admin_views import AdminMediaViewSet, AdminPostPageMediaView
from rest_framework.routers import DefaultRouter
app_name = 'media'
router = DefaultRouter()
router.register(r'admin-media', AdminMediaViewSet, basename="admin-media")

urlpatterns = [
    path('', include(router.urls)),
    path(
        'admin-post-page-media',
        AdminPostPageMediaView.as_view(),
        name="admin-post-page-media"
    ),
]
