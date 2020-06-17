from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import main_views
from .views.admin_views import AdminPostViewSet

app_name = 'posts'

form_item = AdminPostViewSet.as_view({
    'get': 'form_item'
})

router = DefaultRouter()
router.register(r'admin-post', AdminPostViewSet, basename="admin-post")

urlpatterns = [path('',
                    main_views.PostList.as_view({'get': 'list'}),
                    name="post-list"),
               path('<int:pk>/',
                    main_views.PostDetail.as_view({'get': 'retrieve'}),
                    name="post-detail"),
               path('categories/<slug:slug>/',
                    main_views.PostCategorySlugList.as_view({'get': 'list'}),
                    name="post-category-slug-list"),
               path('',
                    include(router.urls)),
               path('admin-post/form-item',
                    form_item,
                    name="post-form-item"),
               ]
