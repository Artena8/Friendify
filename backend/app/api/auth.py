from app.utils.security import authenticate_user
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.user import User
from app.schemas.auth import TokenSchema
from app.services.auth import create_access_token
from passlib.context import CryptContext
from app.const import Tags

auth_router = APIRouter(tags=[Tags.AUTH])

# ----- ROUTE -----
@auth_router.post("/login", response_model=TokenSchema, summary="Connexion utilisateur")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiants invalides",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
