from jose import jwt
import hashlib

SECRET_KEY = "vedika-secret-key"
ALGORITHM = "HS256"

def hash_password(password):

    return hashlib.sha256(
        password.encode()
    ).hexdigest()

def verify_password(
    plain_password,
    hashed_password
):

    return hash_password(
        plain_password
    ) == hashed_password

def create_token(data):

    return jwt.encode(
        data,
        SECRET_KEY,
        algorithm=ALGORITHM
    )