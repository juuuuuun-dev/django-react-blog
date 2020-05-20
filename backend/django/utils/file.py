import os
import re
import shutil
from django.conf import settings


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
