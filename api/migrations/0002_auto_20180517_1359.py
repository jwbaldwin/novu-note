# Generated by Django 2.0.5 on 2018-05-17 17:59

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2018, 5, 17, 17, 59, 53, 547933, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='note',
            name='date_modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='note',
            name='note_text',
            field=models.CharField(default=datetime.datetime(2018, 5, 17, 17, 59, 59, 163784, tzinfo=utc), max_length=255),
            preserve_default=False,
        ),
    ]