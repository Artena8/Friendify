FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app
ENV PYTHONPATH=/app

# Copier les fichiers de l'application dans le conteneur
COPY . /app

# Installer les dépendances
RUN pip install -r requirements.txt

# Exposer le port de l'API
EXPOSE 8000

# Démarrer Uvicorn avec l'application FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--reload"]
