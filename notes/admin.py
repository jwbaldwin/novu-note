from django.contrib import admin

from .models import Note

class NoteAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['note_text']}),
        ('Date information', {'fields': ['pub_date']}),
    ]
    list_display = ('note_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['note_text']

admin.site.register(Note, NoteAdmin)
