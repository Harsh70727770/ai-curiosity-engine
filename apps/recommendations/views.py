from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ai_engine.gap_detection.prerequisite_model import GapDetector
from ai_engine.learning_path.path_generator import LearningPathGenerator # <-- New Import
import logging

logger = logging.getLogger(__name__)

class NextLearningStepView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        target_concept = request.data.get('target_concept')
        
        if not target_concept:
            return Response(
                {"error": "Please provide a 'target_concept'."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        username = request.user.username
        
        # 1. Detect Gaps
        detector = GapDetector()
        missing_concepts = detector.detect_missing_prerequisites(username, target_concept)
        
        # 2. Generate Ordered Roadmap
        path_generator = LearningPathGenerator()
        ordered_roadmap = path_generator.generate_path(target_concept, missing_concepts)
        
        if missing_concepts:
            return Response({
                "status": "gaps_detected",
                "message": "We reverse-engineered your knowledge map and found some gaps. Here is your living roadmap.",
                "learning_path": ordered_roadmap # <-- Now returning the ordered path!
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "status": "ready",
                "message": "Your fundamentals are strong. You are ready!",
                "learning_path": ordered_roadmap
            }, status=status.HTTP_200_OK)