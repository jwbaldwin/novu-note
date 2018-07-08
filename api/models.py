from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    slack_id = models.CharField(max_length=32, blank=True)

# Profile/User signals
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Note(models.Model):
    """This class represents the note model"""
    text = models.CharField(max_length=255, blank=False, unique=False)
    category_tags = ArrayField(models.CharField(
        max_length=20, blank=True, null=True))

    user = models.ForeignKey('auth.User',
                             related_name='notes',
                             on_delete=models.CASCADE)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return a human readable representation of the model instance"""
        return "{}".format(self.text)


class State(models.Model):
    """This class represents the state of the users work 
     - as supplied by slack dialog"""

    # Data about users state/flow
    state_type = models.CharField(max_length=64, blank=True)

    short_desc = models.CharField(max_length=255, blank=True)
    extra_info = models.TextField(max_length=512, blank=True)
    resource_info = models.URLField(blank=True)  # consider using FilePath
    location_info = models.CharField(max_length=255, blank=True)
    active = models.BooleanField(default=True)

    user = models.ForeignKey('auth.User',
                             related_name='states',
                             on_delete=models.CASCADE)

    # slack channel
    slack_channel = models.CharField(max_length=32, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return the human readable representation of the state"""
        return "state_type: {}\nshort_desc: {}\nextra_info: {}\nresource_info: {}\nlocation_info: {}".format(
            self.state_type,
            self.short_desc,
            self.extra_info,
            self.resource_info,
            self.location_info
        )
