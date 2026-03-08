import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Footer from './components/Footer';

const API_URL = process.env.REACT_APP_API_URL || '/api';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();
        setHealthStatus(data);
        setError(null);
      } catch (err) {
        setError('Unable to connect to backend API');
        setHealthStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1>DevOps Full-Stack Project</h1>
          <p className="subtitle">
            End-to-end CI/CD pipeline with Docker, AWS, Nginx, and monitoring
          </p>
        </section>

        <section className="status-section">
          <h2>System Status</h2>
          <div className="status-grid">
            <StatusCard
              title="Backend API"
              status={loading ? 'checking' : error ? 'error' : 'healthy'}
              detail={
                loading
                  ? 'Checking...'
                  : error
                  ? error
                  : `Uptime: ${healthStatus?.uptime || 'N/A'}s`
              }
            />
            <StatusCard
              title="Frontend"
              status="healthy"
              detail="React App Running"
            />
            <StatusCard
              title="Docker"
              status="healthy"
              detail="Containerized"
            />
            <StatusCard
              title="CI/CD"
              status="healthy"
              detail="GitHub Actions"
            />
          </div>
        </section>

        <section className="tech-stack-section">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            {[
              { name: 'React.js', category: 'Frontend' },
              { name: 'Node.js / Express', category: 'Backend' },
              { name: 'Docker', category: 'Containerization' },
              { name: 'GitHub Actions', category: 'CI/CD' },
              { name: 'AWS EC2', category: 'Cloud Provider' },
              { name: 'Nginx', category: 'Web Server' },
              { name: "Let's Encrypt", category: 'SSL' },
              { name: 'Terraform', category: 'IaC' },
              { name: 'Prometheus', category: 'Monitoring' },
              { name: 'Grafana', category: 'Dashboards' },
            ].map((tech) => (
              <div key={tech.name} className="tech-card">
                <h3>{tech.name}</h3>
                <span className="tech-category">{tech.category}</span>
              </div>
            ))}
          </div>
        </section>

        <ArchitectureDiagram />

        <section className="features-section">
          <h2>Security Features</h2>
          <ul className="features-list">
            <li>IAM role-based access control</li>
            <li>HTTPS using SSL certificate (Let's Encrypt)</li>
            <li>Firewall configured for ports 22, 80, 443</li>
            <li>Secure environment variables handling</li>
            <li>Docker container isolation</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
