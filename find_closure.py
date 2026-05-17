with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        stack.append(i)
    elif char == '}':
        if not stack:
            print(f"Extra closing brace at index {i}")
            break
        start = stack.pop()
        if not stack:
            print(f"Main object closed at index {i}")
            print(f"Remaining content: {repr(content[i+1:])}")
            break
else:
    if stack:
        print(f"Unclosed braces at indices: {stack}")
