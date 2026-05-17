with open('messages/tr.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line_idx = 1378 - 14 # Adjusting for the shift? No, let's just find it.
for i, line in enumerate(lines):
    if '"Mappings": {' in line:
        indent = len(line) - len(line.lstrip())
        print(f"Line {i+1}: {indent} spaces | {line.strip()}")
