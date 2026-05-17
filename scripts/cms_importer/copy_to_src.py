#!/usr/bin/env python3
"""Copy import-ready JSON items into src/content by collection.
Usage: python copy_to_src.py
"""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'data' / 'import_ready'
DST = ROOT / 'src' / 'content'

DST.mkdir(parents=True, exist_ok=True)

for coll in SRC.iterdir():
    if coll.is_dir():
        dest_coll = DST / coll.name
        dest_coll.mkdir(parents=True, exist_ok=True)
        for item in coll.glob('*.json'):
            shutil.copy2(item, dest_coll / item.name)
            print(f'Copied {item} -> {dest_coll / item.name}')

print('Done.')
