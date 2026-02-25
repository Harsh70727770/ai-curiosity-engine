from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Custom fields for the Curiosity Engine
    bio = models.TextField(blank=True, null=True)
    learning_goal = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text="The main target the user is trying to achieve (e.g., 'Master Machine Learning')"
    )
    
    def __str__(self):
        return self.username