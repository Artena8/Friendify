# LE MODELE
from sqlalchemy import Column, Integer, String, Boolean
from app.database.db import Base

class User(Base):
    __tablename__ = "users"

    # ------------------------------------- Champs de la table ----------------------------------------------------
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    username = Column(String(100), nullable=False, index=True, doc="Pseudo de l'utilisateur")
    password = Column(String(120), nullable=False, doc="Mot de passe hashé de l'utilisateur")
    
    email = Column(String(120), unique=True, nullable=False, index=True, doc="Adresse email de l'utilisateur")
    phone_number = Column(String(20), nullable=True, doc="Numéro de téléphone de l'utilisateur")

    description = Column(String(500), nullable=True, doc="Présentation ou bio de l'utilisateur")
    profile_picture = Column(String(255), nullable=True, doc="URL de la photo de profil")
    
    # Champs liés à Google
    google_id = Column(String(255), unique=True, nullable=True, index=True, doc="ID unique Google de l'utilisateur")
    is_google_account = Column(Boolean, nullable=False, default=False, doc="Compte créé via Google")
    
