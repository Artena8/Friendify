import os
import asyncio
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker,declarative_base
from sqlalchemy.exc import SQLAlchemyError, OperationalError
from sqlalchemy import text
from typing import AsyncGenerator

# ==================================================  Chargement des variables d'environnement ===========================================================
load_dotenv()
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"mysql+asyncmy://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# ==================================================  Création moteur asynchrone et session ============================================================
engine = create_async_engine(DATABASE_URL, echo=True, future=True)

# Création de la session asynchrone
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    future=True
)

Base = declarative_base()

# ==================================================  On attend la database avant de lancer la database ============================================================
async def wait_for_db():
    while True:
        try:
            conn = await engine.connect()
            await conn.close()
            print("✅ MySQL is ready !")
            return
        except OperationalError as e:
            print("⏳ Waiting for MySQL...", e)
            await asyncio.sleep(2)

# ================================  Fonction de création de la base de données & injection des données de test ========================
async def create_db():
    try:
        # Création des tables de la base de données
        async with engine.begin() as conn:
            from app.models import user, friends
            await conn.run_sync(Base.metadata.create_all)
        
        # Connexion à la base de données pour vérifier s'il y a des données
        async with AsyncSessionLocal() as db:
            has_data = False
            for table_name in Base.metadata.tables.keys():
                count = await db.execute(text("SELECT 1 FROM users LIMIT 1"))
                if count.first():
                    has_data = True
                    break
            if not has_data:
                #injection données de test
                from app.tests.data import get_test_data
                test_data = get_test_data()
                db.add_all(test_data)
                await db.commit()
        db_status = "connected"
    except SQLAlchemyError as e:
        db_status = f"connection failed: {str(e)}"
    return db_status

# ================================  Fonction pour obtenir la session pour les requêtes ====================================================
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as db:
        yield db
