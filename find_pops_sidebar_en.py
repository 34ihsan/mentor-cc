with open('messages/en.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    line = content.count('\n', 0, i) + 1
    if char == '{':
        stack.append(line)
    elif char == '}':
        if not stack:
            continue
        start_line = stack.pop()
        if start_line == 1269:
            print(f"Line {line}: }} matched {{ from line 1269 (Sidebar)")
