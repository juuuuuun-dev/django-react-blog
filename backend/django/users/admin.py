from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, UserProfile


class MyUserAdmin(UserAdmin):
    model = User
    list_display = ()  # Contain only fields in your `custom-user-model`
    list_filter = ()  # Contain only fields in your `custom-user-model` intended for filtering. Do not include `groups`since you do not have it
    search_fields = ()  # Contain only fields in your `custom-user-model` intended for searching
    ordering = ()  # Contain only fields in your `custom-user-model` intended to ordering
    filter_horizontal = ()  # Leave it empty. You have neither `groups` or `user_permissions`
    fieldsets = UserAdmin.fieldsets + ()


# Register your models here.
admin.site.register(User, MyUserAdmin)
admin.site.register(UserProfile)
