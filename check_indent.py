with open('messages/tr.json', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(1400, 1480):
    line = lines[i]
    indent = len(line) - len(line.lstrip())
    print(f"{i+1:4}: {indent:2} | {line.strip()}")
