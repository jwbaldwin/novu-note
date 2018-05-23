from rest_framework import generics, permissions
from .permissions import IsCreator
from .serializers import NoteSerializer
from .models import Note

class CreateView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = ( permissions.IsAuthenticated, IsCreator )

    def perform_create(self, serializer):
        """Save the post data when creating a new note."""
        serializer.save(creator=self.request.user)

class DetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = ( permissions.IsAuthenticated, IsCreator )
