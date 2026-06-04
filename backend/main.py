from database import history, conn
from sqlalchemy import select
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm import generate
from llm import client
from fastapi import UploadFile, File
from pdf_utils import extract_text
import document_store
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Working"}

@app.get("/history")
def get_history():
    stmt = select(history)

    result = conn.execute(stmt)

    rows = []

    for row in result:
        rows.append({
            "id": row.id,
            "query": row.query,
            "prompt_type": row.prompt_type,
            "latency": row.latency
        })

    return rows

@app.get("/compare")
def compare(query: str):
    return {
    "zero_shot": generate("zero_shot", query),
    "role_based": generate("role_based", query),
    "few_shot": generate("few_shot", query),
    "cot": generate("cot", query)
}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text(file_path)
    document_store.DOCUMENT_TEXT = text
    return {
        "message": "Uploaded successfully",
        "preview": text[:1000]
    }

@app.get("/ask-document")
def ask_document(query: str):

    context = document_store.DOCUMENT_TEXT[:5000]

    prompt = f"""
    Answer only using the document below.

    Document:
    {context}

    Question:
    {query}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "answer": response.choices[0].message.content
    }