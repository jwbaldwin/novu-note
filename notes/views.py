"""This module imports views to be used in the /notes namespace"""
from django.shortcuts import get_object_or_404, render

from .models import Note

def index(request):
    """ The home page - shows last 5 notes """
    latest_notes_list = Note.objects.order_by('-pub_date')[:5]
    context = {'latest_notes_list': latest_notes_list}
    return render(request, 'notes/index.html', context)


def detail(request, note_id):
    """ Detailed view of a note """
    note = get_object_or_404(Note, pk=note_id)
    return render(request, 'notes/detail.html', {'note': note})
