from django.urls import include, path
from chatapp.views import *
from chatapp.apiviews import *


# Routing Implement
urlpatterns = [
    path('myapp/chatui/', chatui, name='chatui'),
    path('dynamic/<str:doc_id>/', view_conversation_by_id, name='dynamic'),
    path('dynamic_delete/<str:doc_id>/', delete_conversation_by_id, name='dynamic_delete'),
    path('sentimentui/', sentimentui, name='sentimentui'),
    path('sentiment_add/', sentiment_add, name='sentiment_add'),
    path('ask/', ask_question, name='ask_question'),
    path('chat_add/', chat_add, name='chat_add'),

]