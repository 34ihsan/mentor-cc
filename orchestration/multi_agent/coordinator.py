class AssistantAgent:
    def __init__(self, name, role):
        self.name = name
        self.role = role

    def work(self, task, context=None):
        print(f"[{self.role}] {self.name}: Working on '{task}'...")
        # In a real implementation, this would call an LLM with 'context'
        # For our system, we simulation success or failure for the QA loop
        if self.role == "QA":
            # Simulate a QA check that might find an error the first time
            if "with fix requested" not in task:
                return "FAIL: Missing SEO tags in header"
            return "PASS: All checks passed"
            
        return f"CODE: Generated output for {task}"

class Coordinator:
    def __init__(self):
        self.agents = {
            "designer": AssistantAgent("Alice", "Designer"),
            "coder": AssistantAgent("Bob", "Coder"),
            "qa": AssistantAgent("Charlie", "QA")
        }

    def delegate(self, complex_task):
        print(f"[*] Coordinator: Received complex task '{complex_task}'")
        
        # 1. Design Phase
        design = self.agents["designer"].work(f"Design UI for {complex_task}")
        
        # 2. Coding Phase (with Self-Healing Loop)
        max_retries = 3
        current_code = ""
        qa_feedback = ""
        
        for i in range(max_retries):
            coding_task = f"Implement code for {complex_task}"
            if qa_feedback:
                coding_task += f" (Fix requested: {qa_feedback})"
            
            current_code = self.agents["coder"].work(coding_task, context=design)
            
            # 3. QA / Verification Phase
            print(f"[*] Coordinator: Running QA Verification (Pass {i+1})...")
            qa_result = self.agents["qa"].work(f"Verify code: {current_code}")
            
            if qa_result.startswith("PASS"):
                print("[+] Coordinator: QA passed. Finalizing deployment.")
                return [design, current_code, qa_result]
            else:
                qa_feedback = qa_result.split("FAIL: ")[1]
                print(f"[!] Coordinator: QA failed! Feedback: {qa_feedback}")
                print("[*] Coordinator: Sending back to Coder for self-healing...")

        print("[!] Coordinator: Maximum retries reached. Handing over with warnings.")
        return [design, current_code, "QA_FAILED"]

if __name__ == "__main__":
    swarm = Coordinator()
    swarm.delegate("New Landing Page")
