import React from 'react';
import './StatusCard.css';

function StatusCard({ title, status, detail }) {
  const statusColors = {
    healthy: '#4caf50',
    error: '#f44336',
    checking: '#ff9800',
  };

  const statusLabels = {
    healthy: 'Operational',
    error: 'Down',
    checking: 'Checking...',
  };

  return (
    <div className={`status-card status-${status}`}>
      <div className="status-indicator">
        <span
          className="status-dot"
          style={{ backgroundColor: statusColors[status] || '#757575' }}
        />
        <span className="status-label">
          {statusLabels[status] || 'Unknown'}
        </span>
      </div>
      <h3 className="status-title">{title}</h3>
      <p className="status-detail">{detail}</p>
    </div>
  );
}

export default StatusCard;
