# flake8: noqa
# Basic Lib Import

from django.urls import include, path

from accounts.views import *

# Routing Implement
urlpatterns = [
    path('registration/', registration, name='registration'),
    path('login/', login, name='login'),
    path('clear-session/', clear_session, name='clear-session'),

    # path('sign-out/', SignOutView.as_view(), name='sign-out'),
    
]


