from rest_framework import serializers
from site_settings.models import SiteSetting


class MainSiteSettingSerializer(serializers.ModelSerializer):
    logo_mini = serializers.ImageField(read_only=True)

    class Meta:
        model = SiteSetting
        fields = ('logo_mini', 'name', 'description', 'logo', 'main_image',)
