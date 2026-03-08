#!/bin/bash
# ──────────────────────────────────────────────
# Setup Script - Initialize the project locally
# ──────────────────────────────────────────────

set -euo pipefail

echo "========================================="
echo "  DevOps Project - Local Setup"
echo "========================================="

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || command -v docker compose >/dev/null 2>&1 || { echo "Docker Compose is required but not installed. Aborting."; exit 1; }

# Create .env files from examples
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo "Created backend/.env from example"
fi

if [ ! -f frontend/.env ]; then
  cp frontend/.env.example frontend/.env
  echo "Created frontend/.env from example"
fi

echo ""
echo "Building and starting services..."
echo ""

# Build and start with development config
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "Services running:"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:5000"
echo "  API Health: http://localhost:5000/api/health"
echo ""
echo "To view logs:"
echo "  docker-compose logs -f"
echo ""
echo "To stop:"
echo "  docker-compose down"
echo ""
