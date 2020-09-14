from django.shortcuts import render
from rest_framework import filters, generics, permissions, status, views
from site_settings.models import SiteSetting


class AdminSiteSettingView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = SiteSetting.objects.get(id, 1)
