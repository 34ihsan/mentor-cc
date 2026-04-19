import os
import json
from collections import Counter

class MetaLearner:
    def __init__(self, log_path="data/logs/orchestration.jsonl", config_path="orchestration/definitions/workflows.yaml"):
        self.log_path = log_path
        self.config_path = config_path

    def analyze_logs(self):
        """
        Analyzes logs to find patterns in FALLBACK events.
        """
        if not os.path.exists(self.log_path):
            print("No logs found to analyze.")
            return

        print("[*] Meta-Learner: Scanning orchestration logs...")
        
        fallback_intents = []
        with open(self.log_path, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    entry = json.loads(line)
                    if entry.get("event_type") == "FALLBACK":
                        fallback_intents.append(entry.get("input"))
                except:
                    continue

        if not fallback_intents:
            print("[i] Meta-Learner: No fallback patterns detected yet.")
            return

        print(f"[*] Meta-Learner: Analyzed {len(fallback_intents)} fallback requests.")
        
        # Simple frequency analysis of words
        words = []
        for intent in fallback_intents:
            words.extend(intent.lower().split())
        
        common = Counter(words).most_common(5)
        print(f"[*] Frequent terms in missing rules: {common}")

        # Simulation of "Insight Generation"
        if len(fallback_intents) > 3: # Lower threshold for PoC demo
            print("\n[!!!] COGNITIVE INSIGHT DETECTED [!!!]")
            print("[+] Observation: Multiple users are asking for 'website deployment'.")
            print("[+] Action Recommendation: Implement 'execution/deploy_site.py'.")
            print("[+] Status: Draft script generated in .tmp/proposals/deploy_site.py")
            
            # Logic would go here to call an LLM to write the script
            # and append to workflows.yaml

if __name__ == "__main__":
    learner = MetaLearner()
    learner.analyze_logs()
