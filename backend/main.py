from database import history, conn
from sqlalchemy import select
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from llm import generate

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