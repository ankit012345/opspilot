# OpsPilot — DevOps Deployment Dashboard

A beginner-friendly, containerized dashboard demo built to practise DevOps workflows.

## What it includes

- Responsive dashboard UI
- Node.js + Express API
- Sample service and deployment data
- Health endpoint at `/api/health`
- Dockerfile and Docker Compose
- Basic Node.js tests

> Important: the service health, uptime, and deployment records are sample data. This is a learning project, not a production monitoring system. No authentication is included.

## Requirements

- Node.js 20+ for running locally, or Docker with the Compose plugin
- Git (for version control)

## Run locally without Docker

```bash
npm install
npm test
npm start
```

Open http://localhost:3000

## Run with Docker Compose

```bash
docker compose up --build -d
docker compose ps
```

Open http://localhost:3000

Check the health API:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/services
curl http://localhost:3000/api/deployments
```

Stop the application:

```bash
docker compose down
```

## Project structure

```text
opspilot/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── test/
│   └── health.test.js
├── .dockerignore
├── .gitignore
├── compose.yaml
├── Dockerfile
├── package.json
├── README.md
└── server.js
```

## Suggested DevOps learning roadmap

1. Run locally and understand the folders.
2. Commit the project to GitHub.
3. Add a CI workflow to run tests and build the Docker image.
4. Publish the image to a registry.
5. Provision a small test environment with Terraform.
6. Deploy to a suitable platform (for example, an EC2 host first; Kubernetes later).
7. Add real metrics/logging and replace the sample dashboard data.
8. Add authentication, secrets management, and security controls before any production use.

Never commit cloud credentials, API keys, or `.env` secrets to Git.
