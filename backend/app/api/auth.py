from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError

from app.services.user_services import authenticate_user
from app.models.user import User
from app.database.db import get_db
from app.schemas.auth import TokenSchema
from app.services.auth_services import create_access_token, get_current_user
from app.const import Tags

auth_router = APIRouter(tags=[Tags.AUTH])

# ----- ROUTE -----
@auth_router.post("/login", response_model=TokenSchema, summary="Connexion utilisateur")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    try:
        if not form_data.username or not form_data.password:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Nom d'utilisateur ou mot de passe manquant ou mal formé.",
            )

        user = await authenticate_user(db, form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Identifiants invalides",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = create_access_token(data={"sub": user.name})
        return {"access_token": token, "token_type": "bearer"}

    except ValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Erreur de validation : {str(e)}",
        )
    except RequestValidationError as e:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Requête invalide : {str(e)}",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur interne : {str(e)}",
        )
        
@auth_router.get("/me", summary="Récupérer l'utilisateur connecté")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return {"name": current_user.name, "id": current_user.id}