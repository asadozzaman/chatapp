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

from django.views.decorators.csrf import csrf_exempt

from django.http import JsonResponse
from django.contrib.auth import logout


@csrf_exempt
def clear_session(request):
    if request.method == "POST":
        # Clear the Django session
        request.session.flush()  # Remove all session data
        logout(request)  # Log out the user if using Django authentication
        return JsonResponse({'message': 'Session cleared'}, status=200)
    return JsonResponse({'error': 'Invalid request method'}, status=400)



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
    email=request.POST.get('email')
    pasw=request.POST.get('password')
    try:
        # if there is no error then signin the user with given email and password
        user=auth.sign_in_with_email_and_password(email,pasw)
    except:
        message="Invalid Credentials!!Please ChecK your Data"
        return render(request,"login.html",{"message":message})
    session_id=user['idToken']
    request.session['uid']=str(session_id)
    return render(request,"a_mainchat.html",{"email":email})
 

