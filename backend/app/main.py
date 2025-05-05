from fastapi import FastAPI

from app.database.db import create_db
from app.api import user_router
from app.core.cors import add_cors_middleware

app = FastAPI(    
    title="Friendify API",
    description="""
    API casi-officielle de l'application mobile **Friendify** développée par Artena8.
    """,
    version="0.0.1",
    contact={
        "name": "Artena8",
        "url": "https://artena8.github.io/but-portfolio-tailwind/"
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
    docs_url="/docs",
    redoc_url="/redoc",
    )
add_cors_middleware(app)
app.include_router(user_router)

db_status = ""
    
@app.on_event("startup")
def on_startup():
    global db_status
    db_status = create_db()

@app.get("/", summary="Base")
def read_root():
    return {"message": "Hello from FastAPI", "db": db_status}
