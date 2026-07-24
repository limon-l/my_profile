import React from "react";

const TECH_ICONS = [
  { icon: "fab fa-react", color: "#61dafb", size: 28 },
  { icon: "fab fa-js", color: "#f7df1e", size: 24 },
  { icon: "fab fa-node-js", color: "#68a063", size: 26 },
  { icon: "fab fa-html5", color: "#e34c26", size: 22 },
  { icon: "fab fa-css3-alt", color: "#38bdf8", size: 22 },
  { icon: "fas fa-database", color: "#13aa52", size: 20 },
  { icon: "fab fa-github", color: "#ffffff", size: 24 },
  { icon: "fas fa-code", color: "#ffffff", size: 20 },
  { icon: "fab fa-python", color: "#3776ab", size: 24 },
  { icon: "fas fa-server", color: "#90c53f", size: 20 },
  { icon: "fas fa-fire", color: "#ff9100", size: 20 },
  { icon: "fab fa-git-alt", color: "#f1502f", size: 20 },
  { icon: "fas fa-laptop-code", color: "#38bdf8", size: 22 },
  { icon: "fas fa-terminal", color: "#4a90e2", size: 20 },
  { icon: "fas fa-rocket", color: "#f59e0b", size: 22 },
];

const POSITIONS = TECH_ICONS.map(() => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 10,
  duration: 18 + Math.random() * 12,
}));

export default function AnimatedBackground() {
  return (
    <div className="aurora-container" aria-hidden="true">
      {/* Aurora blobs */}
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none">
        {TECH_ICONS.map((tech, i) => (
          <div
            key={i}
            className="tech-float-icon"
            style={{
              left: `${POSITIONS[i].x}%`,
              top: `${POSITIONS[i].y}%`,
              animationDelay: `${POSITIONS[i].delay}s`,
              animationDuration: `${POSITIONS[i].duration}s`,
            }}>
            <i
              className={tech.icon}
              style={{
                color: tech.color,
                opacity: 0.08,
                fontSize: `${tech.size}px`,
                filter: "blur(0.5px)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Particles */}
      <div className="particle-field">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* Meteors */}
      <span className="meteor meteor-1" />
      <span className="meteor meteor-2" />
      <span className="meteor meteor-3" />
    </div>
  );
}
