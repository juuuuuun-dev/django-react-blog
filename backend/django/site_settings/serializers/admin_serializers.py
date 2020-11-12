from rest_framework import serializers
from site_settings.models import SiteSetting


class AdminSiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'
