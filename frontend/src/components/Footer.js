import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="author">
            Built by <strong>Keshav Kumar</strong> &mdash; Cloud &amp; DevOps
            Enthusiast
          </p>
          <a
            href="https://www.linkedin.com/in/keshav-kumar-7239693b4"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            LinkedIn Profile
          </a>
        </div>
        <p className="copyright">
          &copy; {new Date().getFullYear()} DevOps Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
