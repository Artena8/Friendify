from contextlib import asynccontextmanager
import os
from fastapi import FastAPI

from app.database.db import create_db, wait_for_db
from app.api import user_router,auth_router, idea_router
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
    await wait_for_db() # On attend que la database soit prête
    db_status = await create_db() # On crée la database et on injecte les données de test si nécessaire
    yield
    
app = FastAPI(    
    title=OPEN_API_TITLE,
    description=OPEN_API_DESCRIPTION,
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# ----------------------------------- CORS -----------------------------------
cors_origins = os.getenv("CORS_ORIGINS", "") # Récupère les origines CORS depuis les variables d'environnement
origins = [o.strip() for o in cors_origins.split(",") if o.strip()]

add_cors_middleware(app,origins)

# ----------------------------------- ROUTERS -----------------------------------
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(idea_router)

# ----------------------------------- LAUNCH API -----------------------------------
@app.get("/", summary="Base")
def read_root():
    return {"message": "Hello from FastAPI", "db": db_status}
