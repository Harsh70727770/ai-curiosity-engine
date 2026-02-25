from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .analytics import DashboardAnalytics

class AnalyticsDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        analytics_engine = DashboardAnalytics()
        data = analytics_engine.calculate_mental_health_score(request.user.username)
        
        if "error" in data:
            return Response(data, status=500)
            
        return Response(data, status=200)