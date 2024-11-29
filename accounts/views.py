from accounts.models import User
from django.contrib import auth, messages
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect, render

from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.views.generic import View
from django.http import JsonResponse


# Create your views here.

from firebase_admin import auth, firestore
# Initialize Firestore
from demo.settings import db


def registration(request):
    if request.method == 'POST':
        try:
            # Extract user details from POST request
            name = request.POST['name']
            email = request.POST['email']
            password = request.POST['password']

            # Create the user in Firebase Authentication
            user = auth.create_user(
                email=email,
                password=password,
                display_name=name
            )

            # Store additional user details in Firestore
            db.collection('users').document(user.uid).set({
                'name': name,
                'email': email,
                'uid': user.uid,
            })

            # Send a success response
            return redirect('login')
            # return JsonResponse({'message': 'User registered successfully', 'uid': user.uid}, status=201)

        except Exception as e:
            # Handle errors (e.g., duplicate email, invalid input)
            return JsonResponse({'error': str(e)}, status=400)

    return render(request, 'registration.html')



def login(request):
    if request.method == 'POST':
        try:
            # Extract email and password from the POST request
            email = request.POST['email']
            password = request.POST['password']


            print('email',email)
            print('password',password)

            # Sign in the user with Firebase
            user = auth.get_user_by_email(email)
            
            # Check Firestore for user details (optional)
            user_doc = db.collection('users').document(user.uid).get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
            else:
                user_data = {'message': 'No additional user data found in Firestore.'}

            # You could also generate a custom token for additional operations
            custom_token = auth.create_custom_token(user.uid)

            print('custom_token',custom_token)

            # Send a success response with user data and custom token
            return JsonResponse({
                'message': 'Login successful',
                'user_data': user_data,
                'custom_token': custom_token.decode('utf-8'),
            }, status=200)

        except Exception as e:
            # Handle errors (e.g., invalid credentials or user not found)
            return JsonResponse({'error': str(e)}, status=401)

    return render(request, 'login.html')

