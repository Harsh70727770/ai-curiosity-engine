from django.contrib import admin
from .models import StudyInteraction

@admin.register(StudyInteraction)
class StudyInteractionAdmin(admin.ModelAdmin):
    list_display = ('user', 'interaction_type', 'content_title', 'timestamp', 'is_processed_by_ai')
    list_filter = ('interaction_type', 'is_processed_by_ai', 'timestamp')
    search_fields = ('content_title', 'content_text', 'user__username')