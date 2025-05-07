from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def get_user_by_email(db: Session, username: str):
    return db.query(User).filter(User.name == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_email(db, username)
    if not user or not verify_password(password, user.password):
        return None
    return user