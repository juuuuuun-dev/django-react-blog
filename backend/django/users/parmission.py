from rest_framework import permissions
from users.models import User

SAFE_METHODS = ('GET', 'HEAD')


class GuestReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        user = User.objects.get(pk=request.user.id)
        if request.method in SAFE_METHODS:
            return bool(user and user.is_authenticated)
        else:
            return bool(user and user.is_staff)
