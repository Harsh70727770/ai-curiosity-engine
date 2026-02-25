from rest_framework import serializers
from django.contrib.auth import get_user_model

# Grab your CustomUser model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # We satisfy Django's requirement by mapping the email to the username field
        user = User.objects.create_user(
            username=validated_data['email'],  # <-- THE FIX IS HERE
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user