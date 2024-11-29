# flake8: noqa
# Basic Lib Import

from django.urls import include, path

from accounts.views import *

# Routing Implement
urlpatterns = [
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    # path('sign-out/', SignOutView.as_view(), name='sign-out'),
    
]


