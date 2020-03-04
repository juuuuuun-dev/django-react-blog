from django.contrib import admin

# Register your models here.
from .models import Article


class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'content', 'category_id',
                    'is_show', 'cover', 'created_at', 'updated_at']

    def category(self, obj):
        return obj.category_id.name


admin.site.register(Article, ArticleAdmin)
