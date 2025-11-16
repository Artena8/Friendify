from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.database.db import create_db, wait_for_db
from app.api import user_router,auth_router
from app.common.cors import add_cors_middleware

from app.const import (
    OPEN_API_DESCRIPTION,
    OPEN_API_TITLE
)
from app.version import __version__

# ----------------------------------- CONFIG -----------------------------------
db_status = ""

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_status
    await wait_for_db()
    db_status = await create_db()
    yield
    
app = FastAPI(    
    title=OPEN_API_TITLE,
    description=OPEN_API_DESCRIPTION,
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

add_cors_middleware(app)

# ----------------------------------- ROUTERS -----------------------------------
app.include_router(user_router)
app.include_router(auth_router)

# ----------------------------------- LAUNCH API -----------------------------------
@app.get("/", summary="Base")
def read_root():
    return {"message": "Hello from FastAPI", "db": db_status}
