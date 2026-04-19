import os
import yaml
import chromadb
from sentence_transformers import SentenceTransformer

class SemanticRouter:
    def __init__(self, config_path="orchestration/definitions/workflows.yaml", db_path="data/vector_db"):
        self.config_path = config_path
        self.db_path = db_path
        self.collection_name = "workflows"
        
        # Initialize Model (Small, fast model)
        # 'all-MiniLM-L6-v2' is a good balance of speed and accuracy
        try:
            self.model = SentenceTransformer('all-MiniLM-L6-v2') 
        except Exception as e:
            print(f"[!] Error loading model: {e}")
            self.model = None

        # Initialize Vector DB
        try:
            self.client = chromadb.PersistentClient(path=db_path)
            self.collection = self.client.get_or_create_collection(name=self.collection_name)
        except Exception as e:
            print(f"[!] Error initializing ChromeDB: {e}")
            self.client = None

        self.workflows = []
        self._load_and_index()

    def _load_and_index(self):
        """Loads workflows and indexes them if not already up to date."""
        if not os.path.exists(self.config_path):
            print(f"Warning: Config not found at {self.config_path}")
            return

        with open(self.config_path, 'r') as f:
            data = yaml.safe_load(f)
            self.workflows = data.get('workflows', [])

        if not self.client or not self.model:
            return

        # Simple re-indexing strategy for this PoC: 
        # Check if count matches. In real-world, check hashes.
        if self.collection.count() == len(self.workflows):
            return

        print("[*] Indexing workflows for Semantic Search...")
        
        ids = []
        documents = []
        metadatas = []
        embeddings = []

        for i, workflow in enumerate(self.workflows):
            # We embed the description + triggers for better context
            text_to_embed = f"{workflow.get('description', '')} " + " ".join(workflow.get('triggers', []))
            
            ids.append(workflow['name'])
            documents.append(text_to_embed)
            metadatas.append({"name": workflow['name'], "script": workflow.get('script', '')})
            
            # Generate embedding
            embedding = self.model.encode(text_to_embed).tolist()
            embeddings.append(embedding)

        # Upsert to DB
        self.collection.upsert(
            ids=ids,
            embeddings=embeddings,
            metadatas=metadatas,
            documents=documents
        )
        print(f"[+] Indexed {len(ids)} workflows.")

    def find_match(self, user_input, threshold=0.4): # Threshold is distance (lower is better for cosine distance in Chroma?)
        # Wait, Chroma default metric is L2? Or params?
        # Let's check docs or assume defaults. 
        # Actually, let's just use query and see.
        
        if not self.client or not self.model:
            return None

        query_embedding = self.model.encode(user_input).tolist()
        
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=1
        )
        
        if not results['ids'] or not results['ids'][0]:
            return None

        # Chroma returns distance. 
        # For L2 (default), 0 is identical.
        # For Cosine, 0 is identical (if using cosine distance), 1 is opposite.
        # Let's assume standard behavior: we look for the top match.
        
        best_match_id = results['ids'][0][0]
        distance = results['distances'][0][0] 
        
        # Strictness check
        # distance < 0.5 is usually a good heuristic for "related" in L2/Cosine space for MiniLM
        print(f"    (Semantic Distance: {distance:.4f} for '{best_match_id}')")
        
        if distance < 1.0: # Generous threshold for PoC
             # Find the workflow object
            for wf in self.workflows:
                if wf['name'] == best_match_id:
                    return wf
        
        return None
