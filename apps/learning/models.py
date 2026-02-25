from django.db import models
from django.conf import settings

class StudyInteraction(models.Model):
    INTERACTION_CHOICES = [
        ('read', 'Read Article/Notes'),
        ('watch', 'Watched Video'),
        ('search', 'Searched Query'),
        ('quiz', 'Attempted Quiz'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='study_interactions'
    )
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_CHOICES)
    content_title = models.CharField(max_length=255, help_text="Title of the video, article, or search query")
    content_text = models.TextField(help_text="The raw text, notes, or transcript for the AI to analyze")
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # AI Processing Pipeline Flag
    is_processed_by_ai = models.BooleanField(
        default=False, 
        help_text="True if the NLP engine has already extracted concepts from this interaction"
    )
    
    def __str__(self):
        return f"{self.user.username} | {self.get_interaction_type_display()} | {self.content_title}"