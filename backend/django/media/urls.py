from django.urls import path, include
from .views.admin_views import AdminMediaViewSet
from rest_framework.routers import DefaultRouter
app_name = 'media'
router = DefaultRouter()
router.register(r'admin-media', AdminMediaViewSet, basename="admin-media")

urlpatterns = [
    path('', include(router.urls))
]
