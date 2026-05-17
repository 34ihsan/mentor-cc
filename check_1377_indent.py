with open('messages/tr.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[1377-1]
indent = len(line) - len(line.lstrip())
print(f"Line 1377: {indent} spaces | {line.strip()}")
