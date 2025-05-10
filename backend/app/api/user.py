# app/api/user.py

from fastapi import APIRouter, HTTPException, Depends
from app.database.db import AsyncSessionLocal
from app.models.user import User
from app.const import Tags

user_router = APIRouter()

def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

@user_router.get("/users", summary="Liste des utilisateurs", tags=[Tags.USERS])
def read_user(db: AsyncSessionLocal = Depends(get_db)):
    users = db.query(User).all()
    return users

@user_router.get("/users/{id}", summary="Fiche d'un utilisateur", tags=[Tags.USERS])
def read_user(id: int, db: AsyncSessionLocal = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    if user is None:
        raise HTTPException(status=404, message="User not found")
    return user