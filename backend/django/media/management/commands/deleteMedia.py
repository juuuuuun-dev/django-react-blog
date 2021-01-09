from django.core.management.base import BaseCommand
from media.models import Media


class Command(BaseCommand):
    help = 'Delete media'

    def add_arguments(self, parser):
        parser.add_argument('id', nargs='+', type=int)

        """ [example] python manage.py deleteMedia 1
        """

    def handle(self, *args, **options):
        for media_id in options['id']:
            Media.objects.get(id=media_id).delete()
