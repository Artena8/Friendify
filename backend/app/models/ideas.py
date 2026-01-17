# LE MODELE
from sqlalchemy import Column, Integer, String, Boolean
from app.database.db import Base

class Idea(Base):
    __tablename__ = "ideas"

    # ------------------------------------- Champs de la table ----------------------------------------------------
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)

    description = Column(String(500), nullable=True, doc="Description de l'idée")

    
