from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.db import get_db
from app.models.user import User
from app.const import Tags

user_router = APIRouter()

@user_router.get("/users", summary="Liste des utilisateurs", tags=[Tags.USERS])
async def read_users(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users

@user_router.get("/users/{id}", summary="Fiche d'un utilisateur", tags=[Tags.USERS])
async def read_user(id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.id == id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

