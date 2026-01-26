# LE MODELE
from sqlalchemy import Column, Integer, String, Boolean
from app.database.db import Base

class Review(Base):
    __tablename__ = "reviews"

    # ------------------------------------- Champs de la table ----------------------------------------------------
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    author = Column(String(100), nullable=False, index=True, doc="Auteur de l'avis")
    description = Column(String(500), nullable=True, doc="Description de l'idée")
    rating = Column(Integer, nullable=False, doc="Note de l'avis")
    
