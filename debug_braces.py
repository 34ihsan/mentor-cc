with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        stack.append(i)
    elif char == '}':
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"EXTRA CLOSING BRACE at line {line}, index {i}")
            # Just to continue and find more if any
            continue
        start = stack.pop()
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"Main object CLOSED at line {line}, index {i}")
            # We don't break here to see what's after
