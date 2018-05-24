from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from ..models import Note


class ViewTestCase(TestCase):
    """Test suite for the api views."""

    def setUp(self):
        """Define the test client and other test variables."""
        # Initialize client and force it to use authentication
        self.user = User.objects.create(username="nerd")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Create a JSON POST request
        self.url = reverse('create')
        self.sample_note_data = { 
            'text': 'A new idea!',
            'category_tags': ['django', 'testing'],
            'creator': self.user.id
        }
        self.response = self.client.post(
            self.url, self.sample_note_data, format='json')

    def test_api_can_create_a_note(self):
        """POST: Test the api has note creation capability."""
        self.assertEqual(self.response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(Note.objects.get().text, self.sample_note_data.get('text'))
        self.assertEqual(Note.objects.get().category_tags, self.sample_note_data.get('category_tags'))

    def test_api_can_get_a_note(self):
        """GET: Test the api can get a given note."""
        note = Note.objects.get()
        response = self.client.get(
            reverse('details',
            kwargs= { 'pk': note.id }),
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, note)

    def test_api_can_update_note(self):
        """PUT: Test the api can update a given note."""
        note = Note.objects.get()

        modified_note = { 
            'text': 'A modified new idea!',
            'category_tags': ['rest', 'test'],
            'creator': self.user.id
        }
        response = self.client.put(
            reverse('details', 
            kwargs= { 'pk': note.id }),
            modified_note, 
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Note.objects.get().category_tags, modified_note.get('category_tags'))

    def test_api_can_delete_note(self):
        """DELETE: Test the api can delete a note."""
        note = Note.objects.get()

        response = self.client.delete(
            reverse('details', 
            kwargs={ 'pk': note.id }),
            format='json',
            follow=True)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 0)
