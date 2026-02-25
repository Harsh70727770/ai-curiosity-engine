from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'learning_goal', 'is_staff']
    
    # This adds our custom fields to the admin form
    fieldsets = UserAdmin.fieldsets + (
        ('Curiosity Engine Profile', {'fields': ('bio', 'learning_goal')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)