import json
import os
from datetime import datetime

class OrchestrationLogger:
    def __init__(self, log_dir="data/logs"):
        self.log_dir = log_dir
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)
        self.log_file = os.path.join(log_dir, "orchestration.jsonl")

    def log_event(self, event_type, user_input, decision, match_data=None):
        """
        Logs an orchestration event.
        event_type: 'DET' (Deterministic), 'SEM' (Semantic), 'FALLBACK' (AI)
        """
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "event_type": event_type,
            "input": user_input,
            "decision": decision,
            "match_data": match_data
        }
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(log_entry) + "\n")

# Singleton instance
logger = OrchestrationLogger()
