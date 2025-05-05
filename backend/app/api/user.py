# app/api/user.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.models.user import User

user_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@user_router.get("/users")
def read_user(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@user_router.get("/users/{id}")
def read_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
