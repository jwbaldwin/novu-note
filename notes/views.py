"""This module imports views to be used in the /notes namespace"""
from django.http import HttpResponse
from django.template import loader

from .models import Note

def index(request):
    """ Index view """
    latest_notes_list = Note.objects.order_by('-pub_date')[:5]
    template = loader.get_template('notes/index.html')
    context = {
        'latest_notes_list': latest_notes_list,
    }
    return HttpResponse(template.render(context, request))


def detail(request, note_id):
    """ Detail view of note """
    return HttpResponse("You're looking at note %s." % note_id)
