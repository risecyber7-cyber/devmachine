# DevOps Full-Stack Project

> End-to-end DevOps implementation showcasing real-world production practices including CI/CD pipelines, containerization, cloud deployment, reverse proxy, HTTPS, monitoring, and infrastructure automation.

---

## Project Overview

This project demonstrates an end-to-end DevOps implementation including:

- **CI/CD Pipeline** - Automated build, test, and deploy with GitHub Actions
- **Dockerized Application** - Multi-stage Docker builds for frontend and backend
- **Cloud Deployment** - AWS EC2 with Terraform infrastructure as code
- **Reverse Proxy Setup** - Nginx with load balancing and rate limiting
- **HTTPS Configuration** - Let's Encrypt SSL/TLS certificates
- **Infrastructure Automation** - Terraform for reproducible infrastructure
- **Monitoring** - Prometheus metrics collection + Grafana dashboards

---

## Architecture Diagram

```
                    ┌──────────────┐
                    │  Developer   │
                    └──────┬───────┘
                           │ git push
                    ┌──────▼───────┐
                    │    GitHub    │
                    │  Repository  │
                    └──────┬───────┘
                           │ triggers
                    ┌──────▼───────┐
                    │GitHub Actions│
                    │   CI/CD      │
                    └──┬───────┬───┘
                       │       │
              ┌────────▼──┐ ┌──▼────────┐
              │  Docker   │ │ Container │
              │  Build    │ │ Registry  │
              └────────┬──┘ └──┬────────┘
                       │       │
                    ┌──▼───────▼──┐
                    │  AWS EC2    │
                    │  Instance   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Nginx     │
                    │ + SSL/HTTPS │
                    └──┬───────┬──┘
                       │       │
              ┌────────▼──┐ ┌──▼────────┐
              │  React    │ │  Express  │
              │ Frontend  │ │  Backend  │
              └───────────┘ └─────┬─────┘
                                  │
                    ┌─────────────▼─────────────┐
                    │  Prometheus  →  Grafana    │
                    │  (Metrics)    (Dashboards) │
                    └───────────────────────────┘
```

---

## Tech Stack

| Component          | Technology        |
|--------------------|-------------------|
| Frontend           | React.js          |
| Backend            | Node.js / Express |
| Containerization   | Docker            |
| CI/CD              | GitHub Actions    |
| Cloud Provider     | AWS EC2           |
| Web Server         | Nginx             |
| SSL                | Let's Encrypt     |
| Infrastructure     | Terraform         |
| Metrics            | Prometheus        |
| Dashboards         | Grafana           |

---

## Project Structure

```
├── frontend/                    # React.js frontend application
│   ├── public/                  # Static assets
│   ├── src/                     # React source code
│   │   ├── components/          # Reusable components
│   │   ├── App.js               # Main application component
│   │   └── index.js             # Entry point
│   ├── Dockerfile               # Multi-stage frontend build
│   ├── nginx.conf               # Frontend Nginx config (SPA routing)
│   └── package.json
│
├── backend/                     # Node.js / Express backend API
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   ├── __tests__/           # Unit tests
│   │   ├── app.js               # Express application setup
│   │   └── server.js            # Server entry point
│   ├── Dockerfile               # Backend container build
│   └── package.json
│
├── nginx/                       # Nginx reverse proxy configuration
│   ├── nginx.conf               # Main Nginx config
│   └── conf.d/
│       └── default.conf         # Server blocks (HTTP/HTTPS)
│
├── terraform/                   # Infrastructure as Code
│   ├── main.tf                  # AWS resources (EC2, SG, IAM)
│   ├── variables.tf             # Input variables
│   ├── outputs.tf               # Output values
│   ├── user_data.sh             # EC2 bootstrap script
│   └── terraform.tfvars.example # Example variable values
│
├── monitoring/                  # Monitoring stack
│   ├── prometheus/
│   │   └── prometheus.yml       # Prometheus scrape config
│   └── grafana/
│       └── provisioning/        # Auto-provisioned dashboards
│
├── .github/workflows/           # CI/CD pipelines
│   ├── ci.yml                   # Continuous Integration
│   └── cd.yml                   # Continuous Deployment
│
├── scripts/                     # Utility scripts
│   ├── setup.sh                 # Local development setup
│   ├── deploy.sh                # Manual deployment script
│   └── ssl-setup.sh             # SSL certificate setup
│
├── docker-compose.yml           # Production compose
├── docker-compose.dev.yml       # Development overrides
└── .env.example                 # Environment variable template
```

---

## CI/CD Pipeline Flow

```
1. Developer pushes code to GitHub
        │
2. GitHub Actions pipeline triggers automatically
        │
3. ┌─ Backend: Lint + Unit Tests
   └─ Frontend: Lint + Build
        │
4. Docker images build (multi-stage)
        │
5. Images pushed to GitHub Container Registry (GHCR)
        │
6. Application auto-deploys on EC2 via SSH
        │
7. Nginx serves the app securely over HTTPS
```

---

## Security Features

- **IAM Role-Based Access Control** - EC2 instance uses IAM roles (no static keys)
- **HTTPS with SSL** - Let's Encrypt certificates with auto-renewal
- **Firewall Rules** - Security group allows only ports 22, 80, 443
- **Security Headers** - Nginx adds X-Frame-Options, CSP, XSS-Protection, etc.
- **Rate Limiting** - Nginx rate limits for API and general endpoints
- **Non-Root Containers** - Backend runs as non-root user inside Docker
- **Container Health Checks** - Automatic container health monitoring
- **Environment Variables** - Secrets managed via `.env` files (never committed)
- **Helmet.js** - HTTP security headers for Express backend

---

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/) (for local development)
- [Terraform](https://www.terraform.io/) (for infrastructure provisioning)

### 1. Clone Repository

```bash
git clone https://github.com/risecyber7-cyber/devmachine.git
cd devmachine
```

### 2. Configure Environment

```bash
# Copy example environment files
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your values
```

### 3. Build & Run with Docker

```bash
# Production mode (all services)
docker-compose up --build -d

# Development mode (frontend + backend only)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

# Or use the setup script
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 4. Access Application

| Service    | URL                         |
|------------|-----------------------------|
| Frontend   | http://localhost:3000        |
| Backend    | http://localhost:5000        |
| API Health | http://localhost:5000/api/health |
| Prometheus | http://localhost:9090        |
| Grafana    | http://localhost:3001        |

---

## AWS Deployment with Terraform

### 1. Configure Terraform Variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS credentials and configuration
```

### 2. Deploy Infrastructure

```bash
terraform init
terraform plan
terraform apply
```

### 3. Configure SSL

```bash
# SSH into EC2 instance
ssh -i ~/.ssh/your-key.pem ec2-user@<EC2_PUBLIC_IP>

# Run SSL setup
chmod +x scripts/ssl-setup.sh
./scripts/ssl-setup.sh your-domain.com your-email@example.com
```

---

## GitHub Actions Secrets Required

Configure these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

| Secret              | Description                          |
|---------------------|--------------------------------------|
| `EC2_HOST`          | EC2 instance public IP or domain     |
| `EC2_SSH_KEY`       | Private SSH key for EC2 access       |
| `AWS_ACCESS_KEY_ID` | AWS access key (optional, for ECR)   |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key (optional, for ECR) |

---

## API Endpoints

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/api/health`  | Health check status    |
| GET    | `/api/info`    | Project information    |
| GET    | `/api/data`    | Sample data endpoint   |
| GET    | `/metrics`     | Prometheus metrics     |

---

## Monitoring

### Prometheus
- Collects backend application metrics (request rates, response times, memory, CPU)
- Scrapes metrics every 15 seconds
- 15-day data retention

### Grafana
- Pre-configured dashboard for backend metrics
- Default login: `admin` / `admin` (change in `.env`)
- Auto-provisioned Prometheus datasource

---

## Future Improvements

- [ ] Kubernetes deployment (EKS)
- [ ] Blue-Green deployment strategy
- [ ] Auto-scaling setup with ASG
- [ ] Centralized logging with ELK stack
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Redis caching layer
- [ ] API rate limiting with Redis
- [ ] Automated security scanning (Trivy, Snyk)
- [ ] Slack notifications for deployment status

---

## Author

**Keshav Kumar** - Cloud & DevOps Enthusiast

[LinkedIn](https://www.linkedin.com/in/keshav-kumar-7239693b4) | [GitHub](https://github.com/risecyber7-cyber)

---

## License

This project is open source and available under the [MIT License](LICENSE).
