# # context_processors.py
# def user_context(request):
#     user_id = request.session.get('uid')
#     return {'user_id': user_id}


from demo.settings import db



def user_context(request):
    if 'uid' in request.session:
        user_id = request.session.get('uid')
        doc_ref = db.collection('users').document(user_id)
        doc = doc_ref.get()
        user_data = doc.to_dict()
        return {'user_name': user_data.get("name"),'user_id': user_id,}
    return {}
