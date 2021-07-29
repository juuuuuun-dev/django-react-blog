"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import re
import sys
from datetime import timedelta

import environ
import requests
from django.utils.translation import gettext_lazy

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MEDIA_ROOT = os.path.join(BASE_DIR, 'storage')
MEDIA_URL = '/storage/'

TEST_RUNNER = 'my_project.runner.PytestTestRunner'
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
if "ENV_NAME" not in os.environ or os.environ['ENV_NAME'] == 'ci':
    envfile = '.env.ci'
else:
    envfile = '.env'

env = environ.Env(DEBUG=(bool, False),)
env.read_env(os.path.join(BASE_DIR, envfile))
DEBUG = env.bool('DEBUG', default=False)
sysStr = str(sys.argv[0])
DJANGO_SUPERUSER_PASSWORD = env('DJANGO_SUPERUSER_PASSWORD')

if len(
        sys.argv) > 1 and re.match(
            r'.*test$',
        sysStr) or os.environ.get("TESTING"):
    TESTING = True
else:
    TESTING = False

if DEBUG:
    STATIC_URL = '/static/'
    STATIC_ROOT = 'static'
else:
    DEFAULT_FILE_STORAGE = 'utils.custom_s3boto.CustomS3Boto3Storage'
    STATICFILES_STORAGE = 'utils.custom_s3boto.CustomS3Boto3Storage'
    AWS_ACCESS_KEY_ID = env('AWS_S3_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = env('AWS_S3_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')
    AWS_S3_STORAGE_CUSTOM_DOMAIN = env(
        'AWS_S3_STORAGE_CUSTOM_DOMAIN', default=None)
    AWS_DEFAULT_ACL = env('AWS_DEFAULT_ACL', default='public-read')
    AWS_LOCATION = 'storage'
    if AWS_S3_STORAGE_CUSTOM_DOMAIN:
        AWS_S3_CUSTOM_DOMAIN = AWS_S3_STORAGE_CUSTOM_DOMAIN
    else:
        AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')
CORS_ORIGIN_ALLOW_ALL = True

# CORS_ORIGIN_WHITELIST is not working
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=["127.0.0.1", "localhost"])

# ECS Fargate health check
if 'ECS_CONTAINER_METADATA_URI' in os.environ:
    METADATA_URI = os.environ['ECS_CONTAINER_METADATA_URI']
    container_metadata = requests.get(METADATA_URI).json()
    ALLOWED_HOSTS.append(container_metadata['Networks'][0]['IPv4Addresses'][0])
# API
API_VERSION = "api/v1/"

# Application definition
INSTALLED_APPS = [
    'categories',
    'tags',
    'posts',
    'users',
    'media',
    'utils',
    'initial',
    'blog_auth',
    'site_settings',
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sitemaps',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'django_filters',
    'djoser',
    'django_cleanup.apps.CleanupConfig',
    'imagekit',
    'storages',
]
SITE_ID = 1
SITE_NAME = "Django and React blog"
FRONTEND_URL = env('FRONTEND_URL')
API_GATEWAY_URL = env('API_GATEWAY_URL', default="")
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': env('CACHE_LOCATION'),
        'TIMEOUT': env.int('CACHE_TIMEOUT', default=120)
    }
}

ROOT_URLCONF = 'config.urls'

# testing page_size is 1
PAGE_SIZE = env.int('PAGE_SIZE', default=10) if not TESTING else 1
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTTokenUserAuthentication',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'main': '30/minute',
        'login': '10/minute',
    },
    # 'DEFAULT_FILTER_BACKENDS': [
    #     'django_filters.rest_framework.DjangoFilterBackend',
    # ],
    'DEFAULT_PAGINATION_CLASS':
        'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': PAGE_SIZE,
}


# help(env)

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_PORT = env('EMAIL_PORT', default=None)
EMAIL_HOST = env('EMAIL_HOST', default=None)

EMAIL_USE_TLS = False

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env.int('DB_PORT'),
        'OPTIONS': {
            'charset': 'utf8mb4',
            "init_command": "SET foreign_key_checks = 0;",
        },
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/


LANGUAGE_CODE = env('LANGUAGE_CODE', default="ja")

TIME_ZONE = env('TIME_ZONE', default="Asia/Tokyo")

USE_I18N = True

USE_L10N = True

USE_TZ = False

LANGUAGES = (
    ('ja', gettext_lazy('Japanese')),
    ('en', gettext_lazy('English')),
)

LOGGING = {
    'version': 1,
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        }
    },
    'loggers': {
        'django.db.backends': {
            'level': 'DEBUG',
            'handlers': ['console'],
        },
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/


AUTH_USER_MODEL = "users.User"
