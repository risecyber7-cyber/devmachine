import React from 'react';
import './ArchitectureDiagram.css';

function ArchitectureDiagram() {
  return (
    <section className="architecture-section" id="architecture">
      <h2>Architecture Diagram</h2>
      <div className="diagram-container">
        <div className="diagram">
          {/* Row 1: Developer */}
          <div className="diagram-row">
            <div className="diagram-box developer">
              <span className="box-icon">&#128187;</span>
              <span>Developer</span>
            </div>
          </div>

          <div className="diagram-arrow">&#8595;</div>

          {/* Row 2: GitHub */}
          <div className="diagram-row">
            <div className="diagram-box github">
              <span className="box-icon">&#128230;</span>
              <span>GitHub Repository</span>
            </div>
          </div>

          <div className="diagram-arrow">&#8595;</div>

          {/* Row 3: CI/CD */}
          <div className="diagram-row">
            <div className="diagram-box cicd">
              <span className="box-icon">&#9889;</span>
              <span>GitHub Actions CI/CD</span>
            </div>
          </div>

          <div className="diagram-arrow-split">
            <span>&#8601;</span>
            <span>&#8600;</span>
          </div>

          {/* Row 4: Docker + Registry */}
          <div className="diagram-row split-row">
            <div className="diagram-box docker">
              <span className="box-icon">&#128051;</span>
              <span>Docker Build</span>
            </div>
            <div className="diagram-box registry">
              <span className="box-icon">&#128230;</span>
              <span>Container Registry</span>
            </div>
          </div>

          <div className="diagram-arrow">&#8595;</div>

          {/* Row 5: AWS EC2 */}
          <div className="diagram-row">
            <div className="diagram-box aws">
              <span className="box-icon">&#9729;</span>
              <span>AWS EC2 Instance</span>
            </div>
          </div>

          <div className="diagram-arrow">&#8595;</div>

          {/* Row 6: Nginx */}
          <div className="diagram-row">
            <div className="diagram-box nginx">
              <span className="box-icon">&#128274;</span>
              <span>Nginx + SSL (HTTPS)</span>
            </div>
          </div>

          <div className="diagram-arrow-split">
            <span>&#8601;</span>
            <span>&#8600;</span>
          </div>

          {/* Row 7: Frontend + Backend */}
          <div className="diagram-row split-row">
            <div className="diagram-box frontend">
              <span className="box-icon">&#127912;</span>
              <span>React Frontend</span>
            </div>
            <div className="diagram-box backend">
              <span className="box-icon">&#9881;</span>
              <span>Express Backend</span>
            </div>
          </div>

          <div className="diagram-arrow">&#8595;</div>

          {/* Row 8: Monitoring */}
          <div className="diagram-row split-row">
            <div className="diagram-box monitoring">
              <span className="box-icon">&#128200;</span>
              <span>Prometheus</span>
            </div>
            <div className="diagram-box monitoring">
              <span className="box-icon">&#128202;</span>
              <span>Grafana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArchitectureDiagram;
