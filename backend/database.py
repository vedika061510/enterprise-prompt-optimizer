from sqlalchemy import *

engine = create_engine("sqlite:///prompts.db")

metadata = MetaData()

history = Table(
    "history",
    metadata,

    Column("id", Integer, primary_key=True),

    Column("query", String),

    Column("prompt_type", String),

    Column("response", String),

    Column("latency", Float)
)

from sqlalchemy import Table, Column, Integer, String

users = Table(
    "users",
    metadata,

    Column(
        "id",
        Integer,
        primary_key=True
    ),

    Column(
        "username",
        String
    ),

    Column(
        "email",
        String,
        unique=True
    ),

    Column(
        "password_hash",
        String
    )
)

metadata.create_all(engine)

conn = engine.connect()