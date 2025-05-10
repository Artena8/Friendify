import bcrypt

# ATTENTION PASSLIB PLUS BON
def hash_password(password: str):
    return bcrypt.hashpw(
        bytes(password, encoding="utf-8"),
        bcrypt.gensalt(),
    )
    
def verify_password(plain_password : str, hashed_password : str):
    return bcrypt.checkpw(
        bytes(plain_password, encoding="utf-8"),
        bytes(hashed_password, encoding="utf-8"),
    )

