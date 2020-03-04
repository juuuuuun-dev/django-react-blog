from django.contrib import admin

# Register your models here.
from .models import Tag


class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'updated_at']
    ordering = ['name']
    fielde = ['name']


admin.site.register(Tag, TagAdmin)
