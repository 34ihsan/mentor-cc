with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        stack.append(i)
    elif char == '}':
        if not stack:
            continue
        start = stack.pop()
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"Level 0 closure at line {line}")
