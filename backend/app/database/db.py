import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from typing import Generator

# ================================  Création session cnx db ===============================================
env_path = Path(__file__).resolve().parents[2] / '.env'
load_dotenv(dotenv_path=env_path)
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL.startswith("sqlite"):
    BASE_DIR = Path(__file__).resolve().parents[2]
    DATABASE_URL = f"sqlite:///{BASE_DIR}/app/database/db.sqlite3"

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ================================  Création des tables ===============================================
Base = declarative_base()

# ================================  Fonction de création de la base de données ========================
def create_db():
    try:
        # Vérifier si le fichier SQLite existe déjà
        db_file_path = Path(__file__).resolve().parents[2] / "app/database/db.sqlite3"
        is_new_db = not db_file_path.exists()

        if is_new_db:
            # création de la db
            Base.metadata.create_all(engine)
            # données de test (uniquement si nouvelle DB)
            db = SessionLocal()
            from app.tests.data import get_test_data
            test_data = get_test_data()
            db.add_all(test_data)
            db.commit()
            db.close()            

        db_status = "connected"
    except SQLAlchemyError as e:
        db_status = f"connection failed: {str(e)}"
    return db_status

# ================================  Fonction de création de la base de données ========================
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()