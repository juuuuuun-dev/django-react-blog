"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))

######
use hyphens for the strings, and underscores for the package path:
######

"""
from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.contrib.staticfiles.urls import static
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("{}users/".format(settings.API_VERSION), include("users.urls")),

    # @TODO use hyphens
    path("{}blog_auth/".format(settings.API_VERSION),
         include("blog_auth.urls")),

    path("{}tags/".format(settings.API_VERSION), include("tags.urls")),
    path("{}categories/".format(settings.API_VERSION), include("categories.urls")),
    path("{}posts/".format(settings.API_VERSION), include("posts.urls")),
    path("{}media/".format(settings.API_VERSION), include("media.urls")),
    path("{}init/".format(settings.API_VERSION), include("initial.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
