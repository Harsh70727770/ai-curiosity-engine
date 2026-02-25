from django.urls import path
from .views import AnalyticsDashboardView

urlpatterns = [
    path('metrics/', AnalyticsDashboardView.as_view(), name='dashboard-metrics'),
]