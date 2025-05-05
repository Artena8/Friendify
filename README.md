## Running the Project with Docker

This project is composed of two main services: a Python FastAPI backend and a TypeScript-based mobile app. Both are containerized and orchestrated using Docker Compose.

### Project-Specific Requirements

- **Backend**
  - Python 3.11 (slim image)
  - Dependencies specified in `backend/requirements.txt`
  - Expects a `.env` file in `backend/` (see below for required variables)

- **Mobile App**
  - Node.js version 22.14.0
  - Yarn version 4.6.0
  - Dependencies specified in `mobile-app/package.json` and `yarn.lock`

### Environment Variables

- **Backend**
  - Environment variables are loaded from `backend/.env` (example keys: `HOST`, `PORT`, `RELOAD`)
  - The Dockerfile sets defaults: `HOST=0.0.0.0`, `PORT=8000`, `RELOAD=True`

- **Mobile App**
  - No `.env` file is required by default. If needed, uncomment the `env_file` line in `docker-compose.yml` and provide `mobile-app/.env`.

### Exposed Ports

- **Backend (FastAPI):** `8000` (host:container)
- **Mobile App:** `3000` (host:container)

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
   - Mobile App: [http://localhost:3000](http://localhost:3000)

### Special Configuration Notes

- Both services run as non-root users inside their containers for improved security.
- The backend service uses a healthcheck to ensure the FastAPI app is running.
- The mobile app service is set up for development; adjust the Dockerfile and compose file for production as needed.
- Both services are connected via a custom Docker network (`app-network`).

---

_Keep this section up to date if you change the Docker setup or add new services._
