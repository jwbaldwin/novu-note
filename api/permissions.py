from rest_framework.permissions import BasePermission
from .models import Note

class IsCreator(BasePermission):
    """Custom permission class to allow only note creators to edit them."""

    def has_object_permission(self, request, view, obj):
        """Return True if permission is granted to the note creator."""
        if isinstance(obj, Note):
            return obj.creator == request.user
        return obj.creator == request.user