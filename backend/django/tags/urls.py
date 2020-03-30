from django.urls import path, include
from .views import AdminTagViewSet
from rest_framework.routers import DefaultRouter
app_name = 'tags'
router = DefaultRouter()
router.register(r'admin-tag', AdminTagViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path(
    #     'admin-tag', AdminTagViewSet.as_view({'get': 'list'}),
    #     name='admin-tag'),

]
