"""This module imports views to be used for the notes"""
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic

from .models import Note

class IndexView(generic.ListView):
    """Generic index view"""
    template_name = 'notes/index.html'
    context_object_name = 'latest_notes_list'

    def get_queryset(self):
        """Return all published notes."""
        return Note.objects.order_by('-pub_date')


class DetailView(generic.DetailView):
    """Generic detail view"""
    model = Note
    template_name = 'notes/detail.html'
