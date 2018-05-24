# api/serializers.py
from rest_framework.validators import UniqueValidator
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    """Serializer to map the Note instance into JSON format."""

    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Note
        fields = ('id', 'text','category_tags', 'creator', 'date_created', 'date_modified')
        read_only_fields = ('creator', 'date_created', 'date_modified')

class UserSerializer(serializers.ModelSerializer):
    """Serializer to map the User instance into JSON format."""

    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
