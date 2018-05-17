import datetime

from django.db import models
from django.utils import timezone

class Note(models.Model):
    note_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.note_text

    def was_published_recently(self):
        """ check if the note was published recently and not in the future """
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
        
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'
