from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView

urlpatterns = [
    # Login: React sends email/password, Django returns the JWT Token
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh: React gets a new token if the old one expires
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Register: React sends new user details here
    path('register/', RegisterView.as_view(), name='auth_register'),
]