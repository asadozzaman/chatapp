class SetSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get 'session_uid' from cookies
        session_uid = request.COOKIES.get('session_uid')

        if session_uid:
            # Store it in the Django session
            request.session['uid'] = session_uid

        response = self.get_response(request)
        return response
