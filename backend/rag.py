from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def chunk_text(text, chunk_size=500):

    chunks = []

    for i in range(0, len(text), chunk_size):
        chunk = text[i:i+chunk_size]

        if chunk.strip():
            chunks.append(chunk)

    return chunks

def create_embeddings(chunks):

    embeddings = model.encode(chunks)

    return np.array(embeddings)