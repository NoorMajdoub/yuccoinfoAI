import chromadb
from sentence_transformers import SentenceTransformer


model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
chroma_client = chromadb.Client()
collection = chroma_client.create_collection(name="documents")
documents = ["We are excited to launch a cozy coffee shop overlooking the beach, where the sound of the waves and the warmth of the sun create the perfect atmosphere for relaxation. Our vision is to offer freshly brewed coffee, artisan pastries, and a welcoming space for both locals and tourists to unwind, work, or catch up with friends — all while enjoying breathtaking ocean views. It's more than just coffee; it's a seaside experience.", "We are thrilled to organize a school fundraising project aimed at supporting new educational programs and improving our facilities. Through community events, donations, and creative initiatives led by students and staff, we hope to raise funds that will directly benefit our school and create more opportunities for everyone. Together, we can make a lasting difference in the future of our students!"]
if collection.count() == 0:
    embeddings = model.encode(documents).tolist()
    collection.add(
        embeddings=embeddings,
        documents=documents,
        ids=[str(i) for i in range(len(documents))]
    )

def sem_search(query: str, n_results: int = 1) -> list[str]:
    """
    Perform semantic search and return matching documents
    
    Args:
        query: The search query text
        n_results: Number of results to return
        
    Returns:
        List of matching document texts
    """
    query_embedding = model.encode(query).tolist()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )

    return results['documents'][0] 
