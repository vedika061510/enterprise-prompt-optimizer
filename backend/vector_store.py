import faiss
import numpy as np

index = None
stored_chunks = []

def create_index(embeddings, chunks):

    global index
    global stored_chunks

    if len(chunks) == 0:
        raise Exception("No text chunks found in PDF")

    stored_chunks = chunks

    dimension = embeddings.shape[-1]

    index = faiss.IndexFlatL2(dimension)

    index.add(
        embeddings.astype("float32")
    )

def search(query):

    global index
    global stored_chunks

    if index is None:
        raise Exception(
            "PDF not uploaded or index not created"
        )

    from rag import model

    query_embedding = model.encode([query])

    query_embedding = np.array(
        query_embedding
    ).astype("float32")

    distances, indices = index.search(
        query_embedding,
        3
    )

    results = []

    for idx in indices[0]:
        if idx < len(stored_chunks):
            results.append(
                stored_chunks[idx]
            )

    return results