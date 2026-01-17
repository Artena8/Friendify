from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.db import get_db
from app.models.user import User
from app.const import Tags
from app.models.ideas import Idea
from app.schemas.idea import IdeaCreate, IdeaOut

idea_router = APIRouter()

@idea_router.post("/ideas", response_model=IdeaOut)
async def create_idea(payload: IdeaCreate, db: AsyncSession = Depends(get_db)):
    idea = Idea(description=payload.description)
    db.add(idea)
    await db.commit()
    await db.refresh(idea)
    return idea

@idea_router.get("/ideas", summary="Liste des idées")
async def read_ideas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Idea))
    ideas = result.scalars().all()
    return ideas
