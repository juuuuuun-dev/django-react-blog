from rest_framework import response, status, views
from site_settings.models import SiteSetting
from site_settings.serializers.admin_serializers import \
    AdminSiteSettingSerializer
from users.parmission import GuestReadOnly
from utils.file import delete_thumb


class AdminSiteSettingView(views.APIView):
    permission_classes = (GuestReadOnly, )

    def get(self, request):
        queryset = SiteSetting.get_site_setting()
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
        site_setting = SiteSetting.get_site_setting()
        if self.request.data['delete_logo'] == 'true':
            delete_thumb(site_setting.logo.name)
            site_setting.logo.delete()
        if self.request.data['delete_main_image'] == 'true':
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
