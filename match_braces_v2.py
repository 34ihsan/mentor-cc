with open('messages/tr.json', 'r', encoding='utf-8') as f:
    content = f.read()

stack = []
for i, char in enumerate(content):
    if char == '{':
        line = content.count('\n', 0, i) + 1
        stack.append((i, line))
    elif char == '}':
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"EXTRA }} at line {line}")
            continue
        start_idx, start_line = stack.pop()
        if not stack:
            line = content.count('\n', 0, i) + 1
            print(f"Level 0 }} at line {line} (matched line {start_line})")
