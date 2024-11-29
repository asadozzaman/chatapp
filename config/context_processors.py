# context_processors.py
def user_context(request):
    user_id = request.session.get('uid')
    return {'user_id': user_id}
