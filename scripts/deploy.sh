#!/bin/bash
# ──────────────────────────────────────────────
# Deployment Script for EC2
# ──────────────────────────────────────────────

set -euo pipefail

# Configuration
EC2_HOST="${EC2_HOST:?'EC2_HOST environment variable is required'}"
EC2_USER="${EC2_USER:-ec2-user}"
SSH_KEY="${SSH_KEY:-~/.ssh/devops-key}"
APP_DIR="/opt/app"

echo "========================================="
echo "  Deploying to EC2: ${EC2_HOST}"
echo "========================================="

# Deploy via SSH
# Note: For first-time connections, manually verify and add the host key:
#   ssh-keyscan -H "${EC2_HOST}" >> ~/.ssh/known_hosts
ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=accept-new "${EC2_USER}@${EC2_HOST}" << 'DEPLOY_SCRIPT'
  set -euo pipefail

  cd /opt/app

  echo "Pulling latest changes..."
  git pull origin main

  echo "Building and restarting containers..."
  docker-compose pull
  docker-compose up -d --build --remove-orphans

  echo "Cleaning up old images..."
  docker image prune -f

  echo "Verifying deployment..."
  sleep 10
  if curl -sf http://localhost:5000/api/health > /dev/null; then
    echo "Health check PASSED"
  else
    echo "Health check FAILED"
    exit 1
  fi

  echo "Deployment successful!"
DEPLOY_SCRIPT

echo ""
echo "Deployment complete!"
echo "Application: https://${EC2_HOST}"
