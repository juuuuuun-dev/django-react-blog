from django.db import models


# Create your models here.
class Category(models.Model):
    class Meta:
        db_table = 'categories'

    name = models.CharField(verbose_name='name', unique=True, max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s' % (self.name)
