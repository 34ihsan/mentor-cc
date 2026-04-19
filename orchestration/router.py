import os
import sys
import yaml
import re
import subprocess
import json
from datetime import datetime

# Add project root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from orchestration.agent_fallback import handle_with_agent
    from orchestration.logger import logger
except ImportError:
    # Fallback if not yet implemented
    def handle_with_agent(user_input):
        print(f"[Fallback] Agent would handle: {user_input}")
    
    class MockLogger:
        def log_event(self, *args, **kwargs): pass
    logger = MockLogger()

class SmartRouter:
    def __init__(self, config_path="orchestration/definitions/workflows.yaml"):
        self.load_config(config_path)
        
        # Initialize Semantic Router
        try:
            from orchestration.semantic_router import SemanticRouter
            print("[*] Initializing Semantic Router (Vector DB)...")
            self.semantic_router = SemanticRouter(config_path)
        except Exception as e:
            print(f"[!] Warning: Semantic Router could not be loaded: {e}")
            self.semantic_router = None

    def load_config(self, path):
        """Loads the workflow definitions from YAML."""
        if not os.path.exists(path):
            print(f"Warning: Config not found at {path}")
            self.workflows = []
            return

        with open(path, 'r') as f:
            data = yaml.safe_load(f)
            self.workflows = data.get('workflows', [])

    def route(self, user_input):
        """
        Decides who handles the input:
        1. Checks deterministic rules (Regex/Keywords)
        2. Checks Semantic Match (Vector DB)
        3. Calls AI Agent (Fallback)
        """
        print(f"[*] Analyzing request: '{user_input}'")
        
        # 1. Deterministic Matching
        matched_workflow = self._find_match(user_input)
        if matched_workflow:
            print(f"[+] Exact Match found: {matched_workflow['name']}")
            logger.log_event("DET", user_input, matched_workflow['name'])
            return self._execute_workflow(matched_workflow, user_input)

        # 2. Semantic Matching
        if self.semantic_router:
            print("[*] No exact match. Checking Semantic Vector DB...")
            semantic_match = self.semantic_router.find_match(user_input)
            if semantic_match:
                print(f"[+] Semantic Match found: {semantic_match['name']}")
                logger.log_event("SEM", user_input, semantic_match['name'])
                return self._execute_workflow(semantic_match, user_input)
        
        # 3. AI Fallback
        print("[-] No known rule found. Switching to AI Agent...")
        logger.log_event("FALLBACK", user_input, "MultiAgentSwarm")
        return handle_with_agent(user_input)

    def _find_match(self, user_input):
        """Simple regex/keyword matching strategy."""
        for workflow in self.workflows:
            triggers = workflow.get('triggers', [])
            for trigger in triggers:
                # Case-insensitive partial match for now. 
                # Can be upgraded to Regex or Embedding Similarity.
                if trigger.lower() in user_input.lower():
                    return workflow
        return None

    def _execute_workflow(self, workflow, user_input):
        """Executes the mapped script."""
        script_path = workflow.get('script')
        
        if not script_path:
            print(f"Error: No script defined for {workflow['name']}")
            return False

        if not os.path.exists(script_path):
            print(f"Error: Script not found at {script_path}")
            return False

        print(f"[>] Executing: {script_path}")
        
        # Simple argument parsing: take anything after the trigger as args
        # This is a naive implementation; a real one would use argparse or similar in the script
        args = user_input.split()
        # Find where the trigger ends (rough approximation)
        # For now, just pass the whole split list to the script as args, 
        # letting the script decide what to use (sys.argv will contain them)
        # actually, let's just pass the words *after* the first two words (assuming "command subcmd arg1 arg2")
        # A better way is to pass the raw args.
        
        script_args = args[2:] if len(args) > 2 else []
        
        try:
            # Running as a subprocess to keep isolation
            cmd = ["python", script_path] + script_args
            result = subprocess.run(
                cmd, 
                capture_output=True, 
                text=True
            )
            print(result.stdout)
            if result.stderr:
                print("Errors:", result.stderr)
            return True
        except Exception as e:
            print(f"Execution failed: {e}")
            return False

if __name__ == "__main__":
    # Test CLI
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        router = SmartRouter()
        router.route(query)
    else:
        print("Usage: python orchestration/router.py 'your command'")
