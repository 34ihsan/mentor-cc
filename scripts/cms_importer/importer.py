#!/usr/bin/env python3
"""Simple CSV/JSON -> CMS import JSON converter.
Usage:
  python importer.py --input path/to/file.csv --mapping content_models/cms_schemas/content_map.json --collection services --outdir data/import_ready

The mapping file should contain a top-level object with collection keys mapping source column names to target field names.
"""
import argparse
import csv
import json
import os
from pathlib import Path


def load_input(path):
    p = Path(path)
    if p.suffix.lower() == ".csv":
        with p.open(encoding="utf-8") as f:
            reader = csv.DictReader(f)
            return list(reader)
    else:
        with p.open(encoding="utf-8") as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            # try to find list under common keys
            for k in ("items", "data", "records"):
                if k in data and isinstance(data[k], list):
                    return data[k]
            raise SystemExit("Unsupported JSON format: must be list or contain 'items'/'data'/'records')")


def normalize_value(v):
    if v is None:
        return None
    if isinstance(v, list):
        return v
    v = str(v).strip()
    if v == "":
        return None
    # try JSON parse
    try:
        parsed = json.loads(v)
        return parsed
    except Exception:
        pass
    # split by | as simple array delimiter
    if "|" in v:
        parts = [p.strip() for p in v.split("|") if p.strip()]
        return parts
    return v


def convert_row(row, mapping):
    out = {}
    for src, dst in mapping.items():
        # support mapping where dst can be object {"field":"name","type":"..."} or string
        if isinstance(dst, str):
            target_field = dst
        elif isinstance(dst, dict):
            target_field = dst.get("field")
        else:
            continue
        val = None
        # src may be absent if mapping uses constant value like "@team_email"
        if isinstance(src, str) and src.startswith("@"):
            # constant: @hello -> mapping value will be in dst.constant maybe
            val = dst.get("constant") if isinstance(dst, dict) else None
        else:
            val = row.get(src)
        out[target_field] = normalize_value(val)
    return out


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--mapping", required=True)
    parser.add_argument("--collection", required=True)
    parser.add_argument("--outdir", default="data/import_ready")
    args = parser.parse_args()

    mapping_file = Path(args.mapping)
    if not mapping_file.exists():
        raise SystemExit(f"Mapping file not found: {mapping_file}")
    mapping_all = json.loads(mapping_file.read_text(encoding="utf-8"))
    if args.collection not in mapping_all:
        raise SystemExit(f"Collection '{args.collection}' not found in mapping file")
    mapping = mapping_all[args.collection]

    rows = load_input(args.input)
    outdir = Path(args.outdir) / args.collection
    outdir.mkdir(parents=True, exist_ok=True)

    for i, row in enumerate(rows, start=1):
        item = convert_row(row, mapping)
        slug = item.get("slug") or item.get("title") or f"item-{i}"
        # sanitize slug file name
        safe = "".join(c for c in slug if c.isalnum() or c in ("-","_"))
        outpath = outdir / f"{safe}.json"
        outpath.write_text(json.dumps(item, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Wrote {outpath}")

    print(f"Imported {len(rows)} items to {outdir}")


if __name__ == "__main__":
    main()
