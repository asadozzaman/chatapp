from django.shortcuts import render


def welcome(request):
    return render(request, 'welcome.html')

def pricing(request):
    return render(request, 'pricing.html')


def reset(request):
    return render(request, 'reset.html')


def blog(request):
    return render(request, 'blog.html')

def price(request):
    return render(request, 'price.html')

def login(request):
    return render(request, 'login.html')


def faq(request):
    return render(request, 'faq.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    return render(request, 'contact.html')

def service(request):
    return render(request, 'service.html')


def faq(request):
    return render(request, 'faq.html')

def profile(request):
    return render(request, 'profile.html')






