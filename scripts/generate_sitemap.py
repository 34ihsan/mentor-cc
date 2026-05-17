#!/usr/bin/env python3
"""Generate a simple sitemap.xml from data/import_ready content files.
Writes to public/sitemap.xml
"""
import json
from pathlib import Path

BASE_URL = "https://yourdomain.com"
INPUT_DIR = Path("data/import_ready")
OUT = Path("public/sitemap.xml")

urls = set()
for coll in INPUT_DIR.glob("**/*.json"):
    try:
        data = json.loads(coll.read_text(encoding='utf-8'))
    except Exception:
        continue
    slug = data.get('slug') or data.get('title')
    if not slug:
        continue
    # guess path by collection name
    parts = coll.parts
    # last but one is collection folder
    coll_name = coll.parents[0].name
    if coll_name == 'services':
        path = f"/services/{slug}"
    elif coll_name == 'case_studies':
        path = f"/projects/{slug}"
    elif coll_name == 'packages':
        path = f"/services/{data.get('service','')}/packages/{slug}"
    else:
        path = f"/{slug}"
    urls.add(f"{BASE_URL}{path}")

OUT.parent.mkdir(parents=True, exist_ok=True)
with OUT.open('w', encoding='utf-8') as f:
    f.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
    f.write("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n")
    for u in sorted(urls):
        f.write("  <url>\n")
        f.write(f"    <loc>{u}</loc>\n")
        f.write("  </url>\n")
    f.write("</urlset>\n")

print(f"Wrote sitemap with {len(urls)} URLs to {OUT}")
