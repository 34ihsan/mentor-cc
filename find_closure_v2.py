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
            # Main object closed
            line = content.count('\n', 0, i) + 1
            print(f"Main object closed at line {line}, index {i}")
            if i + 1 < len(content):
                extra = content[i+1:].strip()
                if extra:
                    print(f"Extra data found after index {i}: {repr(extra[:100])}")
            break
else:
    if stack:
        print(f"Unclosed braces at indices: {stack}")
