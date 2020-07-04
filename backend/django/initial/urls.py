from django.urls import path

from .views import InitialView

app_name = 'init'

urlpatterns = [path('',
                    InitialView.as_view(),
                    name="init-api"),
               ]
