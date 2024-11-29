from django.urls import include, path
from myapp.views import *

# Routing Implement
urlpatterns = [
       path('faq/', faq, name='faq'),
       path('price/', price, name='price'),
       path('reset/', reset, name='reset'),
       path('about/', about, name='about'),
       path('contact/', contact, name='contact'),
       path('blog/', blog, name='blog'),
       path('service/', service, name='service'),
       path('pricing/', pricing, name='pricing'),
       path('', welcome, name='welcome'),
       path('faq/', faq, name='faq'),
       path('profile/', profile, name='profile'),
]


