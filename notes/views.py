"""This module imports views to be used for the notes"""
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.utils import timezone

from .models import Note

class IndexView(generic.ListView):
    """Generic index view"""
    template_name = 'notes/index.html'
    context_object_name = 'latest_notes_list'

    def get_queryset(self):
        """
        Return the last published notes (not including those set to be published in the future).
        """
        return Note.objects.filter(pub_date__lte=timezone.now()).order_by('-pub_date')


class DetailView(generic.DetailView):
    """Generic detail view"""
    model = Note
    template_name = 'notes/detail.html'
    def get_queryset(self):
        """
        Excludes any notes that aren't published yet.
        """
        return Note.objects.filter(pub_date__lte=timezone.now())
