import logging
logger = logging.getLogger(__name__)

class SetSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        session_uid = request.COOKIES.get('session_uid')
        if session_uid:
            logger.debug(f"Session UID found: {session_uid}")
            request.session['uid'] = session_uid
        else:
            logger.debug("No Session UID found in cookies.")
        response = self.get_response(request)
        return response
