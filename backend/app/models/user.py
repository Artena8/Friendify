# LE MODELE
from sqlalchemy import Column, Integer, String
from app.database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, index=True, doc="Nom complet de l'utilisateur")
    email = Column(String(120), unique=True, nullable=False, index=True, doc="Adresse email de l'utilisateur")
