from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Note(models.Model):
    """This class represents the note model."""
    text = models.CharField(max_length=255, blank=False, unique=False)
    category_tags = ArrayField(models.CharField(max_length=20, blank=True, null=True))

    creator = models.ForeignKey('auth.User',
    related_name='notes', 
    on_delete=models.CASCADE) 

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "{}".format(self.text)