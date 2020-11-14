from django.shortcuts import render
from rest_framework import (filters, generics, permissions, response, status,
                            views)
from site_settings.models import SiteSetting
from site_settings.serializers.admin_serializers import \
    AdminSiteSettingSerializer
from utils.file import delete_thumb


class AdminSiteSettingView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        queryset = SiteSetting.getSiteSetting()
        serializer = AdminSiteSettingSerializer(queryset, context={
            "request": request})
        return response.Response(
            {
                "data": serializer.data,
                "config": {
                    "main_image_size": SiteSetting.main_image_size,
                    "logo_size": SiteSetting.logo_size,
                }
            }
        )

    def put(self, request):
        site_setting = SiteSetting.getSiteSetting()
        if "delete_logo" in self.request.data:
            delete_thumb(site_setting.logo.name)
            site_setting.logo.delete()
        if "delete_main_image" in self.request.data:
            site_setting.main_image.delete()
        serializer = AdminSiteSettingSerializer(
            site_setting,
            data=request.data,
            context={
                "request": request
            }
        )
        if serializer.is_valid():
            if "logo" in self.request.data:
                if hasattr(site_setting, 'logo'):
                    delete_thumb(site_setting.logo.name)

            serializer.save()
            return response.Response(serializer.data)
        return response.Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST)
