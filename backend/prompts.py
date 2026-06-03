PROMPTS = {
    "zero_shot": """
    Answer professionally.

    Question: {query}
    """,

    "role_based": """
    You are a customer support manager.

    Question: {query}
    """,

    "few_shot": """
    Example:

    Q: How do I reset password?
    A: Go to settings and click reset password.

    Now answer:

    Q: {query}
    """,

    "cot": """
    Think step by step before answering.

    Question: {query}
    """
}