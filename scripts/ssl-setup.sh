#!/bin/bash
# ──────────────────────────────────────────────
# SSL Certificate Setup with Let's Encrypt
# Run this on the EC2 instance
# ──────────────────────────────────────────────

set -euo pipefail

DOMAIN="${1:?'Usage: ./ssl-setup.sh <domain> <email>'}"
EMAIL="${2:?'Usage: ./ssl-setup.sh <domain> <email>'}"

echo "========================================="
echo "  SSL Setup for: ${DOMAIN}"
echo "========================================="

# Stop nginx temporarily for standalone verification
docker-compose stop nginx 2>/dev/null || true

# Obtain certificate
docker run --rm -it \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  -p 80:80 \
  certbot/certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "${EMAIL}" \
    -d "${DOMAIN}" \
    -d "www.${DOMAIN}"

echo ""
echo "SSL certificate obtained successfully!"
echo "Restarting nginx..."

# Start nginx with SSL
docker-compose up -d nginx

echo ""
echo "HTTPS is now configured for ${DOMAIN}"
echo "Access your application at: https://${DOMAIN}"
