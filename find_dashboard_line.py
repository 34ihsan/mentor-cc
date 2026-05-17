with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

for i, char in enumerate(content):
    if char == '{':
        line = content.count('\n', 0, i) + 1
        # Check if "Dashboard" is in the previous 20 chars
        snippet = content[max(0, i-20):i]
        if "Dashboard" in snippet:
            print(f"Found Dashboard {char} at line {line}")
