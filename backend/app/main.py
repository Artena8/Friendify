from fastapi import FastAPI

from app.database.db import create_db
from app.api import user_router,auth_router
from app.core.cors import add_cors_middleware

from app.const import (
    OPEN_API_DESCRIPTION,
    OPEN_API_TITLE
)
from app.version import __version__

# ----------------------------------- CONFIG -----------------------------------
app = FastAPI(    
    title=OPEN_API_TITLE,
    description=OPEN_API_DESCRIPTION,
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
)

add_cors_middleware(app)

# ----------------------------------- ROUTERS -----------------------------------
app.include_router(user_router)
app.include_router(auth_router)

# ----------------------------------- LAUNCH API -----------------------------------
db_status = ""

@app.on_event("startup")
def on_startup():
    global db_status
    db_status = create_db()

@app.get("/", summary="Base")
def read_root():
    return {"message": "Hello from FastAPI", "db": db_status}
