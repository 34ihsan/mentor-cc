import sys
import os
import json

# Add project root to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from execution.utils.project_manager import ProjectManager

def main():
    print("--- PROJECT INITIALIZATION ---")
    
    # In a real scenario, these could be inputs
    name = input("Project Name (e.g., Luxury Watch Shop): ")
    niche = input("Industry/Niche: ")
    services = input("Services (comma separated): ").split(',')
    competitors = input("Competitor URLs (comma separated): ").split(',')
    
    specs = {
        "primary_colors": input("Logo/Primary Colors: "),
        "tone": "Premium",
        "target_city": input("Target City (if local): ")
    }

    pm = ProjectManager()
    pm.create_project(
        name=name.strip(),
        niche=niche.strip(),
        services=[s.strip() for s in services],
        competitors=[c.strip() for c in competitors],
        specs=specs
    )

    print(f"\n[SUCCESS] Project '{name}' initialized.")
    print("The Orchestrator will now begin analysis and development.")

if __name__ == "__main__":
    main()
