import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">&#9881;</span>
          <span className="logo-text">DevOps Project</span>
        </div>
        <nav className="nav">
          <a href="#status">Status</a>
          <a href="#architecture">Architecture</a>
          <a href="#tech">Tech Stack</a>
          <a
            href="https://github.com/risecyber7-cyber/devmachine"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
