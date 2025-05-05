## Running the Project with Docker

This project is composed of two main services: a Python FastAPI backend and a TypeScript-based mobile app. Both are containerized and orchestrated using Docker Compose.

### Project-Specific Requirements

- **Backend**
  - Python 3.11 (slim image)
  - Dependencies specified in `backend/requirements.txt`
  - Expects a `.env` file in `backend/` (see below for required variables)

### Environment Variables

- **Backend**
  - Environment variables are loaded from `backend/.env` (example keys: `HOST`, `PORT`, `RELOAD`)
  - The Dockerfile sets defaults: `HOST=0.0.0.0`, `PORT=8000`, `RELOAD=True`

### Exposed Ports

- **Backend (FastAPI):** `8000` (host:container)

### Build and Run Instructions

1. Ensure Docker and Docker Compose are installed.
2. Place your environment variables in `backend/.env` as needed.
3. From the project root, build and start all services:

   ```sh
   docker compose up --build
   ```

   This will build both the backend and mobile app images and start the containers.

4. Access the services:
   - Backend API: [http://localhost:8000](http://localhost:8000)

---

_Keep this section up to date if you change the Docker setup or add new services._
