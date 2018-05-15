import datetime

from django.urls import reverse
from django.test import TestCase
from django.utils import timezone

from .models import Note

def create_note(note_text, days):
    """
    Create a note with the given `note_text` and published the
    given number of `days` offset to now (negative for notes published
    in the past, positive for notes that have yet to be published).
    """
    time = timezone.now() + datetime.timedelta(days=days)
    return Note.objects.create(note_text=note_text, pub_date=time)

class NoteModelTests(TestCase):
    """ Test cases for the Note Model """

    def test_was_published_recently_with_future_note(self):
        """
        was_published_recently() returns False for notes whose pub_date is in the future.
        """
        time = timezone.now() + datetime.timedelta(days=30)
        future_note = Note(pub_date=time)
        self.assertIs(future_note.was_published_recently(), False)

    def test_was_published_recently_with_old_note(self):
        """
        was_published_recently() returns False for notes whose pub_date is older than 1 day.
        """
        time = timezone.now() - datetime.timedelta(days=1, seconds=1)
        old_note = Note(pub_date=time)
        self.assertIs(old_note.was_published_recently(), False)

    def test_was_published_recently_with_recent_note(self):
        """
        was_published_recently() returns True for notes whose pub_date is within the last day.
        """
        time = timezone.now() - datetime.timedelta(hours=23, minutes=59, seconds=59)
        recent_note = Note(pub_date=time)
        self.assertIs(recent_note.was_published_recently(), True)

class NoteIndexViewTests(TestCase):
    """ Test cases for the Note IndexView """

    def test_no_notes(self):
        """
        If no notes exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('notes:index'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "No notes are available.")
        self.assertQuerysetEqual(response.context['latest_notes_list'], [])

    def test_past_note(self):
        """
        notes with a pub_date in the past are displayed on the index page.
        """
        create_note(note_text="Past note.", days=-30)
        response = self.client.get(reverse('notes:index'))
        self.assertQuerysetEqual(
            response.context['latest_notes_list'],
            ['<Note: Past note.>']
        )

    def test_future_note(self):
        """
        notes with a pub_date in the future aren't displayed on the index page.
        """
        create_note(note_text="Future note.", days=30)
        response = self.client.get(reverse('notes:index'))
        self.assertContains(response, "No notes are available.")
        self.assertQuerysetEqual(response.context['latest_notes_list'], [])

    def test_future_note_and_past_note(self):
        """
        Even if both past and future notes exist, only past notes are displayed.
        """
        create_note(note_text="Past note.", days=-30)
        create_note(note_text="Future note.", days=30)
        response = self.client.get(reverse('notes:index'))
        self.assertQuerysetEqual(
            response.context['latest_notes_list'],
            ['<Note: Past note.>']
        )

    def test_two_past_notes(self):
        """
        The notes index page may display multiple notes.
        """
        create_note(note_text="Past note 1.", days=-30)
        create_note(note_text="Past note 2.", days=-5)
        response = self.client.get(reverse('notes:index'))
        self.assertQuerysetEqual(
            response.context['latest_notes_list'],
            ['<Note: Past note 2.>', '<Note: Past note 1.>']
        )

class NoteDetailViewTests(TestCase):
    def test_future_note(self):
        """
        The detail view of a note with a pub_date in the future
        returns a 404 not found.
        """
        future_note = create_note(note_text='Future note.', days=5)
        url = reverse('notes:detail', args=(future_note.id,))
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

    def test_past_note(self):
        """
        The detail view of a note with a pub_date in the past
        displays the note's text.
        """
        past_note = create_note(note_text='Past note.', days=-5)
        url = reverse('notes:detail', args=(past_note.id,))
        response = self.client.get(url)
        self.assertContains(response, past_note.note_text)