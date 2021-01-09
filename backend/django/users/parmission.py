from rest_framework import permissions

SAFE_METHODS = ('GET', 'HEAD')


class GuestReadOnlyParmission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        else:
            return bool(request.user and request.user.is_staff)
