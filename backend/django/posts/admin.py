from django.contrib import admin

# Register your models here.
from .models import Post


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'content', 'category',
                    'is_show', 'cover_media', 'created_at', 'updated_at']

    def category(self, obj):
        return obj.category_id.name


admin.site.register(Post, PostAdmin)
