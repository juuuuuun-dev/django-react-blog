from django.urls import path, include
from .views import AdminPostViewSet
from rest_framework.routers import DefaultRouter
app_name = 'posts'

form_item = AdminPostViewSet.as_view({
    'get': 'form_item'
})

router = DefaultRouter()
router.register(r'admin-post', AdminPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin-post/form-item', form_item, name="post-form-item")
]
