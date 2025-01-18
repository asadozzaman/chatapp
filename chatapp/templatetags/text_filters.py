import re
from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter
def format_bold(value):
    """
    Replace text enclosed in * or ** with bold HTML tags (<strong>).
    Example: *text* or **text** -> <strong>text</strong>
    """
    # Regex pattern to match single or double asterisks surrounding text
    pattern = r'\*{1,2}([^\*]+?)\*{1,2}'
    # Replace with bold HTML tags
    replaced_text = re.sub(pattern, r'<strong>\1</strong>', value)
    return mark_safe(replaced_text)
