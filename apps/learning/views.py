from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import StudyInteraction
from .serializers import StudyInteractionSerializer

class StudyInteractionViewSet(viewsets.ModelViewSet):
    serializer_class = StudyInteractionSerializer
    permission_classes = [IsAuthenticated] # Ensures only logged-in users can access this
    
    # This ensures a user can only see their own study interactions
    def get_queryset(self):
        return StudyInteraction.objects.filter(user=self.request.user).order_by('-timestamp')
    
    # This automatically assigns the logged-in user to the interaction when they create it
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)