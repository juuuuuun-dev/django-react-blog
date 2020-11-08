from django.shortcuts import render
from rest_framework import (filters, generics, permissions, response, status,
                            views)
from site_settings.models import SiteSetting
from site_settings.serializers import SiteSettingSerializer
from utils.file import delete_thumb


class AdminSiteSettingView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = SiteSetting.getSiteSetting()
        serializer = SiteSettingSerializer(queryset, context={
            "request": request})
        return response.Response(serializer.data)

    def put(self, request):
        site_setting = SiteSetting.getSiteSetting()
        serializer = SiteSettingSerializer(
            site_setting,
            data=request.data,
            context={
                "request": request
            }
        )
        if serializer.is_valid():
            if "logo" in self.request.data:
                delete_thumb(site_setting.logo.name)
            serializer.save()
            return response.Response(serializer.data)
        return response.Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)
