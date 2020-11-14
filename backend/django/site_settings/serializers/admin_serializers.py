from rest_framework import serializers
from site_settings.models import SiteSetting


class AdminSiteSettingSerializer(serializers.ModelSerializer):
    logo_mini = serializers.ImageField(read_only=True)

    class Meta:
        model = SiteSetting
        fields = '__all__'
