from rest_framework import serializers
from .models import StudyInteraction

class StudyInteractionSerializer(serializers.ModelSerializer):
    # We make 'user' read-only so it automatically gets pulled from the logged-in request
    # and the user doesn't have to submit their ID in the JSON body.
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = StudyInteraction
        fields = ['id', 'user', 'interaction_type', 'content_title', 'content_text', 'timestamp', 'is_processed_by_ai']
        read_only_fields = ['is_processed_by_ai', 'timestamp']