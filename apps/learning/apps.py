from django.apps import AppConfig

class LearningConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.learning'

    def ready(self):
        # Import the signals file when the app is ready
        import apps.learning.signals