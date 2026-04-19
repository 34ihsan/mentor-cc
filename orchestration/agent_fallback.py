from orchestration.multi_agent.coordinator import Coordinator

def handle_with_agent(user_input):
    """
    This function is called when the Smart Router cannot find a deterministic match.
    It now delegates to a Multi-Agent Swarm for coordinated execution.
    """
    print(f"\n[!] Smart Router: No deterministic rule found for '{user_input}'")
    print(f"[!] Delegation: Handing over to Multi-Agent Swarm (Coordinator)...")
    
    swarm = Coordinator()
    results = swarm.delegate(user_input)
    
    print(f"[i] Swarm Results Summary: {len(results)} actions taken.")
    return True

