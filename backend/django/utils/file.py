import base64
import os
import re
import shutil

from django.conf import settings
from django.core.files.base import ContentFile


def base64decode(string, finename='temp'):
    format, imgstr = string.split(';base64,')
    ext = format.split('/')[-1]
    return ContentFile(base64.b64decode(imgstr), name=finename + '.' + ext)


def delete_thumb(filename):
    m = re.match(r'(.*)(?=\.)', filename)
    if not m:
        return
    path = "{}/{}/{}".format(
        settings.MEDIA_ROOT,
        settings.IMAGEKIT_CACHEFILE_DIR,
        m.group()
    )
    if os.path.exists(path):
        shutil.rmtree(path)
