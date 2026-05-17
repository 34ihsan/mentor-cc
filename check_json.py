import json
import sys

try:
    with open('messages/tr.json', 'r', encoding='utf-8') as f:
        json.load(f)
    print("JSON is valid")
except json.JSONDecodeError as e:
    print(f"Error: {e}")
    print(f"Line: {e.lineno}, Column: {e.colno}, Offset: {e.pos}")
