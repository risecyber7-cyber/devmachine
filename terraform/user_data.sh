#!/bin/bash
# ──────────────────────────────────────────────
# EC2 User Data Script
# Installs Docker, Docker Compose, and configures the server
# ──────────────────────────────────────────────

set -euo pipefail

# Update system
yum update -y

# Install Docker
amazon-linux-extras install docker -y
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user

# Install Docker Compose
DOCKER_COMPOSE_VERSION="2.24.0"
curl -L "https://github.com/docker/compose/releases/download/v$${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
  -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Git
yum install -y git

# Install Certbot for SSL
amazon-linux-extras install epel -y
yum install -y certbot

# Create application directory
mkdir -p /opt/app
chown ec2-user:ec2-user /opt/app

# Clone the repository
cd /opt/app
git clone https://github.com/risecyber7-cyber/devmachine.git .

# Set up environment file
cp backend/.env.example backend/.env

# Initial SSL certificate (if domain is configured)
if [ "${domain_name}" != "your-domain.com" ]; then
  certbot certonly --standalone \
    --non-interactive \
    --agree-tos \
    --email "${email}" \
    -d "${domain_name}" \
    -d "www.${domain_name}" || true
fi

# Start the application
docker-compose up -d --build

echo "Deployment complete! Application is starting..."
