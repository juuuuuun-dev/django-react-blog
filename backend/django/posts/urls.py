from django.urls import path, include
from .views import AdminPostViewSet
from rest_framework.routers import DefaultRouter
app_name = 'posts'

router = DefaultRouter()
router.register(r'admin-post', AdminPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
