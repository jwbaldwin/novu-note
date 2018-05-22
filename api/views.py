from rest_framework import generics
from .serializers import NoteSerializer
from .models import Note

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new note."""
        serializer.save()

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
