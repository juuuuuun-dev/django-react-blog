from rest_framework import permissions


class UserIsOwnerUserProfile(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user.id == obj.user.id
