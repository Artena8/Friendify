from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.db import get_db
from app.models.user import User
from app.const import Tags
from app.models.reviews import Review
from app.schemas.review import ReviewCreate, ReviewOut

review_router = APIRouter()

@review_router.post("/review", response_model=ReviewOut)
async def create_idea(payload: ReviewCreate, db: AsyncSession = Depends(get_db)):
    rev = Review(description=payload.description, author=payload.author, rating=payload.rating)
    db.add(rev)
    await db.commit()
    await db.refresh(rev)
    return rev

@review_router.get("/reviews", summary="Liste des reviews")
async def read_ideas(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Review))
    ideas = result.scalars().all()
    return ideas
