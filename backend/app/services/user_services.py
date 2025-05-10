from sqlalchemy import select
from app.utils.security import verify_password
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User

async def get_user_by_username(db: AsyncSession, username: str) -> User:
    stmt = select(User).filter(User.name == username)
    result = await db.execute(stmt)  
    return result.scalars().first()  

async def authenticate_user(db: AsyncSession, username: str, password: str) -> User:
    user = await get_user_by_username(db, username)  
    if not user or not verify_password(password, user.password):
        return None
    return user