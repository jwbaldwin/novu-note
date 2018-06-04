from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .permissions import IsCreator
from .serializers import NoteSerializer
from django.contrib.auth.models import User
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

# class UserCreate(APIView):
#     """ Creates the user. """

#     permission_classes = ( permissions.AllowAny, )

#     def post(self, request, format='json'):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             if user:
#                 token = Token.objects.create(user=user)
#                 json = serializer.data
#                 json['token'] = token.key
#                 return Response(json, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)