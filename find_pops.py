with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        line = content.count('\n', 0, i) + 1
        stack.append(line)
    elif char == '}':
        if not stack:
            continue
        start_line = stack.pop()
        line = content.count('\n', 0, i) + 1
        if start_line == 1124:
            print(f"Line {line}: }} closes Dashboard (line 1124)")
        if start_line == 1:
            print(f"Line {line}: }} closes Main Object (line 1)")
