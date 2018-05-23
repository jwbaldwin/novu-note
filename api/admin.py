from django.contrib import admin

from .models import Note

class NoteAdmin(admin.ModelAdmin):
    fields = ['text', 'category_tags', 'creator']
    list_display = ('text', 'category_tags', 'creator', 'date_created')
    list_filter = ['date_created']
    search_fields = ['text']
# Register your models here.
admin.site.register(Note, NoteAdmin)