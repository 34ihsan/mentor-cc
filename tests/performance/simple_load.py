import threading
import requests
import time
from concurrent.futures import ThreadPoolExecutor

BASE_URL = "http://localhost:3000"
TOTAL_REQUESTS = 100
CONCURRENT_USERS = 20

def run_user(user_id):
    try:
        # 1. Homepage
        start = time.time()
        res = requests.get(f"{BASE_URL}/", timeout=10)
        duration = (time.time() - start) * 1000
        print(f"[User {user_id}] Homepage: {res.status_code} ({duration:.2f}ms)")
        
        # 2. API Session
        start = time.time()
        res = requests.get(f"{BASE_URL}/api/auth/session", timeout=10)
        duration = (time.time() - start) * 1000
        print(f"[User {user_id}] Auth Session: {res.status_code} ({duration:.2f}ms)")
        
    except Exception as e:
        print(f"[User {user_id}] Error: {e}")

def main():
    print(f"Starting Load Test: {CONCURRENT_USERS} concurrent users, {TOTAL_REQUESTS} total loops")
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=CONCURRENT_USERS) as executor:
        for i in range(TOTAL_REQUESTS):
            executor.submit(run_user, i)
            
    total_duration = time.time() - start_time
    print(f"\n--- Load Test Finished ---")
    print(f"Total time: {total_duration:.2f}s")
    print(f"Average RPS: { (TOTAL_REQUESTS * 2) / total_duration:.2f}")

if __name__ == "__main__":
    main()
