from database import history, conn
from sqlalchemy import insert
from dotenv import load_dotenv
from groq import Groq
from prompts import PROMPTS
import os
import time

load_dotenv()

#print(os.getenv("GROQ_API_KEY"))  # For testing

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def generate(prompt_type, query):

    prompt = PROMPTS[prompt_type].format(
        query=query
    )

    start = time.time()

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    latency = round(time.time() - start, 2)

    answer = response.choices[0].message.content
    
    stmt = insert(history).values(
        query=query,
        prompt_type=prompt_type,
        response=answer,
        latency=latency
    )

    conn.execute(stmt)
    conn.commit()

    return {
        "response": answer,
        "latency": latency,
        "word_count": len(answer.split())
    }
    # return response.choices[0].message.content