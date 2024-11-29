from rest_framework import serializers

class QuestionSerializer(serializers.Serializer):
    question_text = serializers.CharField(max_length=255)
    answer_text = serializers.CharField(read_only=True)
