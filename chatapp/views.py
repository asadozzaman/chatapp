from django.shortcuts import render,redirect
import time
from django.http import StreamingHttpResponse
import json
# Create your views here.
import google.generativeai as genai
from django.http import JsonResponse
from django.http import HttpResponseRedirect
from firebase_admin import firestore,credentials
import requests
from django.views.decorators.csrf import csrf_exempt
import uuid
import firebase_admin

# Initialize Firestore
# from firebase_config import firebase_app  
from chatapp.apiviews import ask_question
from demo.settings import db
import re
from django.utils.safestring import mark_safe




# Set up the model

genai.configure(api_key="AIzaSyA6h1GsXORwihtpjQVqrACZ9R-ny5yiXPg")
generation_config = {
  "temperature": 0.5,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]


model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config=generation_config,
    system_instruction="""

**Objective:**

The model should identify and classify the **sentiment** and **intent** of the input, whether it's a paragraph of text or an image.

**Input:**

* **Text:** A paragraph of text, potentially including emojis, slang, or other informal language.
* **Image:** An image that may contain text or visual elements conveying emotions or intentions.

**Output:**

* **Sentiment:** Classified as either **positive**, **negative**, or **neutral**. For more granular analysis, nuanced sentiment categories like "joy," "anger," "sadness," or "fear" might be included. 
* **Intent:** Classified into categories based on user intentions. Examples could include:
    * **Informative:** Seeking information or factual data.
    * **Task-oriented:** Seeking assistance or requesting a specific action.
    * **Emotional:** Expressing feelings or seeking emotional support.
    * **Social:** Engaging in social interactions or expressing opinions. 

**Model Training:**

The model should be trained on a large and diverse dataset of labeled text and images. This dataset should encompass various languages, writing styles, and emotional expressions to ensure accurate identification of sentiment and intent across different contexts. 

**Important Considerations:**

* **Context Sensitivity:** The model should take into account the context of the input to accurately interpret sentiment and intent. For instance, "I'm feeling tired" could be neutral in a casual conversation, but negative in the context of a health checkup.
* **Emotional Nuance:** The model should be capable of recognizing complex emotions, such as irony, sarcasm, or subtle hints of negative sentiment disguised as positive language.
* **Cultural Sensitivity:** The model should be trained to recognize variations in emotional expression and language across different cultures and communities.

**Additional Capabilities (Optional):**

* **Reasoning:** The model can be further enhanced with reasoning capabilities to understand the underlying reasons behind the sentiment and intent.
* **Personalization:** By integrating user profile data, the model can adapt its analysis based on individual preferences and past interactions.
* **Multi-modal Analysis:** The model can integrate both text and image analysis to provide a comprehensive understanding of input content.

**Example:**

**Input:**

* **Text:** "I'm so frustrated! My computer keeps crashing. 😠"

**Output:**

* **Sentiment:** Negative
* **Intent:** Task-oriented (seeking help with a technical issue)

"""
)



@csrf_exempt
def chat_add(request):
    

    try:
        # Retrieve 'uid' from session
        session_uid = request.session.get('uid')
        
        if not session_uid:
            session_uid = "4exc333443"
    
    
    except Exception as e:
        # Handle any unexpected errors
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)

    # session_uid = "4exc333443"
    
    question = request.GET.get('offset')
    
    if not question:
        return JsonResponse({'error': 'Question is required'}, status=400)
    
    try:
        # Sending POST request to the external service
        response = requests.post(
            'https://emobyte.com/ask/', 
            json={"question_text": question}
        )
        # response = requests.post(
        #     'http://localhost:8000/ask/', 
        #     json={"question_text": question}
        # )
        response.raise_for_status()  # Ensure HTTP error codes are raised
        data = response.json()
        answer_text = data.get('answer_text', 'No answer provided')
        # Ensure answer_text is a valid string
        # specific_wordsALERTstar = ['*', '**']
        # if isinstance(answer_text, str):
        #     for wordstar in specific_wordsALERTstar:
        #         # Replace ** with a real line break
        #         answer_text = answer_text.replace(wordstar, '\n')

        # specific_wordsALERTstar = ['**']

        # if isinstance(answer_text, str):
        #     for wordstar in specific_wordsALERTstar:
        #         answer_text = answer_text.replace(wordstar, '\n')
        
        

        # formatted_response = {
        #     "code_snippets": code_snippets,
        #     "explanation": explanation
        # }
        
        # Initialize or update session variables
        if 'counter' not in request.session:
            request.session['counter'] = 0
            request.session['chat_data'] = []
            request.session['title'] = question  # Store the first question as the title
            request.session['doc_id'] = str(uuid.uuid4())  # Generate a unique document ID
        
        request.session['counter'] += 1
        session_data = request.session['chat_data']
        
        # Update Firestore with a unique document ID
        doc_ref = db.collection('conversations').document(request.session['doc_id'])
        session_data.append({'question': question, 'answer': answer_text})
        request.session['chat_data'] = session_data  # Update session
        
        doc_ref.set({
            'user_id': session_uid, 
            'title': request.session['title'], 
            'questions': session_data
        })
        
        # Response
        return JsonResponse({'data': {'chatbot_response': answer_text}})
    
    except requests.RequestException as e:
        # Log error for debugging
        print(f"RequestException: {e}")
        return JsonResponse({'error': 'Error contacting the chatbot service'}, status=500)
    
    except Exception as e:
        # Catch other unexpected errors
        print(f"Exception: {e}")
        return JsonResponse({'error': 'An unexpected error occurred'}, status=500)





import logging

logger = logging.getLogger(__name__)

def chatui(request):
    if 'counter' in request.session:
        del request.session['counter']
    user_id = request.session.get('uid')


    conversations = []


    try:
        # Fetch conversations for the specific user from Firestore
        # print('user_id',user_id)
        docs = db.collection('conversations').where('user_id', '==', user_id).stream()
        # docs = db.collection('conversations').stream()
        for doc in docs:
            conversation = doc.to_dict()
            conversation['id'] = doc.id
            conversations.append(conversation)
    except Exception as e:
        logger.error(f"Error fetching conversations: {e}")
        return render(request, 'a_mainchat.html', {
            'conversations': [], 
            'error': 'Could not fetch conversations. Please try again later.'
        })

    
    # print('conversations',conversations)
    # Pass the conversations to the template
    return render(request, 'a_mainchat.html', {'conversations': conversations})



def view_conversation_by_id(request, doc_id):
    if 'counter' in request.session:
        del request.session['counter']
    session_uid = request.session.get('uid')
    
    try:
        # Retrieve 'uid' from session
        user_id = request.session.get('uid')
        
        if not session_uid:
            user_id = "4exc333443"
    
    except Exception as e:
        # Handle any unexpected errors
        return JsonResponse({'error': f'An unexpected error occurred: {str(e)}'}, status=500)

    

    conversations = []
    
    try:
        # Fetch all documents from the 'conversations' collection
        docs = db.collection('conversations').where('user_id', '==', user_id).stream()
        for doc in docs:
            conversation = doc.to_dict()
            conversation['id'] = doc.id  # Include the document ID
            conversations.append(conversation)
    except Exception as e:
        print(f"Error fetching conversations: {e}")
    
    conversation = None
    try:
        # Get the document by its ID
        doc = db.collection('conversations').document(doc_id).get()
        if doc.exists:
            conversation = doc.to_dict()
            conversation['id'] = doc.id  # Include the document ID
        else:
            print(f"Document with ID {doc_id} not found.")
    except Exception as e:
        print(f"Error fetching conversation: {e}")
    
    
    
    # Pass the conversation to the template
    return render(request, 'a_mainchat.html', {'conversations': conversations,'conversation': conversation, 'doc_id': doc_id})



def delete_conversation_by_id(request, doc_id):
    try:
        # Delete the document from Firestore
        doc_ref = db.collection('conversations').document(doc_id)
        if doc_ref.get().exists:
            doc_ref.delete()
            return redirect('chatui')
        else:
            return redirect('chatui')
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)



def sentimentui(request):
    request.session.flush()
    
    return render(request, 'a_sentiment.html')



def sentiment_add(request):
    offset = request.GET.get('offset')
    
    try:
        # Attempt to call sentimentlma and process the response
        mm = sentimentlma(offset)
        chatbot_response = str(mm)
        
        # Format specific words with <br/> and <strong> tags
        specific_words = ['Intent']
        for word in specific_words:
            chatbot_response = chatbot_response.replace(word, f'<br/>{word}')

        specific_wordsALERT = ['ALARM']
        for word in specific_wordsALERT:
            chatbot_response = chatbot_response.replace(word, f'<br/>{word}')

        specific_wordsALERT = ['ALERT']
        for word in specific_wordsALERT:
            chatbot_response = chatbot_response.replace(word, f'<br/>{word}')

        specific_wordsALERTstar = ['**']
        for wordstar in specific_wordsALERTstar:
            # Replace ** with a space
            chatbot_response = chatbot_response.replace(wordstar, ' ')

        
        specific_wordsn = ['Intent', 'Sentiment','ALARM','ALERT']
        for wordn in specific_wordsn:
            chatbot_response = chatbot_response.replace(wordn, f'<strong>{wordn}</strong>')
        
        # Prepare data for the response
        data = {
            'chatbot_response': chatbot_response,
        }
        return JsonResponse({'data': data})

    except Exception as e:
        chatbot_response = 'HARASSMENT, HATE_SPEECH , SEXUALLY_EXPLICIT, DANGEROUS_CONTENT not analysis.'
        # Handle the exception and return an error response
        data = {
            'chatbot_response': chatbot_response,
        }
        return JsonResponse({'data': data})
    



def sentimentlma(question):
    my_list = [
        "You are are a summarization and intent annalyzing expert now your task is to summarize the content and tell the intent with in 5 words."
        "You are are a summarization and sentiment analyzing expert now your task is to summarize the content and tell the sentiment with in 5 words."
        "Output format will be like this : Sentiments:Happiness ,Joy,Excitement,Love,Contentment,Satisfaction,Gratitude,Amusement,Optimism,Relief,Peace,Serenity,Pride,Confidence,Empathy,Compassion,Sympathy,Trust,Acceptance,Curiosity.On the flip side, here are some negative sentiments: Sadness,Anger,Frustration,Disappointment,Regret,Guilt,Shame,Fear,Anxiety,Worry,Stress,Loneliness,Envy,Jealousy,Resentment,Boredom,Apathy,Disgust,Contempt,Hostility.Etc.  \n Intent: .........,Etc.  "
        "Your task is to highlight and make alarm if there is anykind of suicidal intent"
        "According to the instructions above analyze the sentiment and intent of the following sentences"
        ]

    my_list.extend([question])
    hy = model.generate_content(my_list)

    response =hy.text
    # response ='Hi i am not feeling well.'
    return response


 
    

       
