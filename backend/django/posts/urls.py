from django.urls import path, include
from .views.admin_views import AdminPostViewSet
from .views.main_views import PostList, PostDetail
from rest_framework.routers import DefaultRouter
app_name = 'posts'

form_item = AdminPostViewSet.as_view({
    'get': 'form_item'
})

router = DefaultRouter()
router.register(r'admin-post', AdminPostViewSet, basename="admin-post")

urlpatterns = [
    path('', PostList.as_view(), name="post-list"),
    path('<int:pk>/', PostDetail.as_view(), name="post-detail"),
    path('', include(router.urls)),
    path('admin-post/form-item', form_item, name="post-form-item"),

]
