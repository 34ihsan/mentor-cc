with open('messages/tr.json', 'r', encoding='utf-8') as f:
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
        if line == 1546:
            print(f"At line 1546, }} popped {{ from line {start_line}")
            print(f"Stack was: {stack}")
