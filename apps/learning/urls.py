from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudyInteractionViewSet

router = DefaultRouter()
router.register(r'interactions', StudyInteractionViewSet, basename='study-interaction')

urlpatterns = [
    path('', include(router.urls)),
]