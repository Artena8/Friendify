from fastapi import FastAPI

from app.database.db import create_db
from app.api import user_router

app = FastAPI()
app.include_router(user_router)

db_status = ""
    
@app.on_event("startup")
def on_startup():
    global db_status
    db_status = create_db()

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI", "db": db_status}
