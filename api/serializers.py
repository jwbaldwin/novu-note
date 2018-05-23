# api/serializers.py

from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Note
        fields = ('id', 'text','category_tags', 'creator', 'date_created', 'date_modified')
        read_only_fields = ('creator', 'date_created', 'date_modified')