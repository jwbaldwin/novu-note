from django.test import TestCase
from .models import Note
from rest_framework.test import APIClient
from rest_framework import status
from django.core.urlresolvers import reverse

class ModelTestCase(TestCase):
    """This class defines the test suite for the note model."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.text = "Write world class code"
        self.note = Note(text=self.text)

    def test_model_can_create_a_note(self):
        """Test the note model can create a note."""
        old_count = Note.objects.count()
        self.note.save()
        new_count = Note.objects.count()
        self.assertNotEqual(old_count, new_count)

class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        self.client = APIClient()
        self.note_data = {'text': 'Go to Ibiza'}
        self.response = self.client.post(
            reverse('create'),
            self.note_data,
            format="json")

    def test_api_can_create_a_note(self):
        """Test the api has note creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)