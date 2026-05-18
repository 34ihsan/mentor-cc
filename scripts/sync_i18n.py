import json
import os
from collections import OrderedDict

def deep_merge_and_sync(source, target, path=""):
    """
    Recursively merges target into source-style structure.
    Returns a new dict with the same keys as source.
    """
    synced = OrderedDict()
    for key, value in source.items():
        current_path = f"{path}.{key}" if path else key
        if key in target:
            if isinstance(value, dict) and isinstance(target[key], dict):
                synced[key] = deep_merge_and_sync(value, target[key], current_path)
            elif isinstance(value, list) and isinstance(target[key], list):
                # For lists, we try to preserve target items if possible, otherwise use source structure
                # This is tricky for JSON i18n, but usually we want to keep the list structure from source
                # and translate each item's strings if it's a list of dicts.
                new_list = []
                for i, item in enumerate(value):
                    if i < len(target[key]):
                        if isinstance(item, dict) and isinstance(target[key][i], dict):
                            new_list.append(deep_merge_and_sync(item, target[key][i], f"{current_path}[{i}]"))
                        else:
                            new_list.append(target[key][i])
                    else:
                        new_list.append(item)
                synced[key] = new_list
            else:
                synced[key] = target[key]
        else:
            # Key missing in target
            synced[key] = value
    return synced

def sync_files():
    # Resolve paths relative to this script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(os.path.dirname(script_dir), "messages")
    tr_path = os.path.join(base_path, "tr.json")
    en_path = os.path.join(base_path, "en.json")
    de_path = os.path.join(base_path, "de.json")

    with open(tr_path, 'r', encoding='utf-8') as f:
        # Use object_pairs_hook=OrderedDict to preserve key order
        tr_data = json.load(f, object_pairs_hook=OrderedDict)

    for lang, path in [("en", en_path), ("de", de_path)]:
        print(f"Syncing {lang}...")
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
                if content:
                    target_data = json.loads(content, object_pairs_hook=OrderedDict)
                else:
                    target_data = OrderedDict()
        else:
            target_data = OrderedDict()

        synced_data = deep_merge_and_sync(tr_data, target_data)

        # Write back with indentation
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(synced_data, f, ensure_ascii=False, indent=2)
        print(f"Done syncing {lang}.")

if __name__ == "__main__":
    sync_files()
