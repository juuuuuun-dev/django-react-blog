"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

from django.utils.translation import ugettext_lazy
from datetime import timedelta
import environ
import sys
import re
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

TEST_RUNNER = 'my_project.runner.PytestTestRunner'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'v5brmsg&*d&u((wk6bxpj48-tp)5&n19*45%7e#44&=6vo2j)i'

# SECURITY WARNING: don't run with debug turned on in production!

env = environ.Env()
env.read_env(os.path.join(BASE_DIR, '.env'))
DEBUG = env('DEBUG')
sysStr = str(sys.argv[0])
if len(sys.argv) > 1 and re.match(r'.*test$', sysStr):
    TESTING = True
else:
    TESTING = False

ALLOWED_HOSTS = []

# API
API_VERSION = "api/v1/"

# Application definition

INSTALLED_APPS = [
    'categories',
    'tags',
    'posts',
    'users',
    'media',
    'blog_auth',
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    # 'rest_framework.authtoken',
    'django_filters',
    # 'allauth',
    # 'allauth.account',
    # "allauth.socialaccount",
    # 'rest_auth',
    # 'rest_auth.registration',
    'djoser',
]
SITE_ID = 1
SITE_NAME = "My blog!"
URL = "http://localhost:8000"
FRONT_URL = env('FRONT_URL')
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

ROOT_URLCONF = 'config.urls'

# REST
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTTokenUserAuthentication',
    ],
}


# CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    env('CORS_ORIGIN_WHITELIST').split(',')
    # 'http://localhost:3010',
    # 'http://127.0.0.1:3010',
    # 'http://192.168.11.10:3010'
)


SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST = env('EMAIL_HOST')

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

# date format
DATE_FORMAT = '%Y-%m-%d'
DATETIME_FORMAT = '%Y-%m-%d %H:%M:%S'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog',
        'USER': 'user',
        'PASSWORD': 'pass',
        'HOST': 'db',
        'PORT': '3306',
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


LANGUAGE_CODE = env('LANGUAGE_CODE')

TIME_ZONE = env('TIME_ZONE')

USE_I18N = True

USE_L10N = True

USE_TZ = False

LANGUAGES = (
    ('ja', ugettext_lazy('Japanese')),
    ('en', ugettext_lazy('English')),
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

STATIC_URL = '/static/'
STATIC_ROOT = 'static'
AUTH_USER_MODEL = "users.User"
