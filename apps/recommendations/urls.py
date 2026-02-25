from django.urls import path
from .views import NextLearningStepView

urlpatterns = [
    path('what-to-study-next/', NextLearningStepView.as_view(), name='what-to-study-next'),
]