with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        line = content.count('\n', 0, i) + 1
        stack.append(line)
    elif char == '}':
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"EXTRA }} at line {line}")
            continue
        start_line = stack.pop()
        line = content.count('\n', 0, i) + 1
        if line >= 1540 and line <= 1546:
            print(f"Line {line}: }} matches {{ from line {start_line}")
