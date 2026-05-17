CMS Importer
=============

Purpose
-------
A small utility to convert CSV/JSON export files into per-item JSON files ready for CMS import. Uses a simple mapping file (content_models/cms_schemas/content_map.json) that maps source column names to target CMS fields.

Quick start
-----------
Install Python 3.8+ and run:

```bash
python scripts/cms_importer/importer.py --input data/import_templates/services_template.csv --mapping content_models/cms_schemas/content_map.json --collection services --outdir data/import_ready
```

This will create `data/import_ready/services/university-placement.json`.

Mapping
-------
Edit `content_models/cms_schemas/content_map.json` to control how CSV/JSON fields map to CMS fields. Top-level keys are collection names.

CSV templates
-------------
Example CSV templates are in `data/import_templates/` for `services` and `packages`.

Notes & limitations
-------------------
- The script performs simple normalization: splits `|` into arrays and attempts JSON parse for complex fields.
- It writes one JSON file per row using `slug` or `title` to name the file. Slugs are sanitized.
- For production imports you may want to extend the script to:
  - Resolve references (service slug -> service id)
  - Validate required fields/types
  - Upload assets to storage and replace URLs with asset IDs
  - Support CMS APIs directly (Contentful, Strapi, Sanity, etc.)

Next steps
----------
- I can add reference resolution (e.g., replace `service` slug with CMS item id) for a target CMS if you tell me which CMS you'll import into.
- I can create a sample import-ready JSON set for `University Placement` and its `Full Support` package.
