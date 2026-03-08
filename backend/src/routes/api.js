const express = require('express');
const router = express.Router();

const startTime = Date.now();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'devops-backend',
    version: process.env.npm_package_version || '1.0.0',
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// System info endpoint
router.get('/info', (req, res) => {
  res.json({
    service: 'DevOps Full-Stack Project',
    author: 'Keshav Kumar',
    description: 'End-to-end DevOps implementation',
    techStack: {
      frontend: 'React.js',
      backend: 'Node.js / Express',
      containerization: 'Docker',
      cicd: 'GitHub Actions',
      cloud: 'AWS EC2',
      webServer: 'Nginx',
      ssl: "Let's Encrypt",
      iac: 'Terraform',
      monitoring: 'Prometheus + Grafana',
    },
    links: {
      github: 'https://github.com/risecyber7-cyber/devmachine',
      linkedin: 'https://www.linkedin.com/in/keshav-kumar-7239693b4',
    },
  });
});

// Sample data endpoint
router.get('/data', (req, res) => {
  res.json({
    message: 'Sample API response',
    data: [
      { id: 1, name: 'CI/CD Pipeline', status: 'active' },
      { id: 2, name: 'Docker Container', status: 'running' },
      { id: 3, name: 'Nginx Proxy', status: 'configured' },
      { id: 4, name: 'SSL Certificate', status: 'valid' },
      { id: 5, name: 'Monitoring', status: 'enabled' },
    ],
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
