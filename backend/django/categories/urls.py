from django.urls import path, include
from .views import AdminCategoryViewSet
from rest_framework.routers import DefaultRouter
app_name = 'categories'
router = DefaultRouter()
router.register(r'admin-category', AdminCategoryViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
