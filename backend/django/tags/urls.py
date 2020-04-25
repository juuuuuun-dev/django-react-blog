from django.urls import path, include
from .views.admin_views import AdminTagViewSet
from rest_framework.routers import DefaultRouter
app_name = 'tags'
router = DefaultRouter()
router.register(r'admin-tag', AdminTagViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
