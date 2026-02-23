import React from "react";

export default function AnimatedBackground() {
  const techIcons = [
    { icon: "fab fa-react", color: "#61dafb", size: "2xl" },
    { icon: "fab fa-js", color: "#f7df1e", size: "xl" },
    { icon: "fab fa-node-js", color: "#68a063", size: "2xl" },
    { icon: "fab fa-html5", color: "#e34c26", size: "xl" },
    { icon: "fab fa-css3-alt", color: "#38bdf8", size: "xl" },
    { icon: "fas fa-database", color: "#13aa52", size: "lg" },
    { icon: "fab fa-github", color: "#ffffff", size: "xl" },
    { icon: "fas fa-code", color: "#ffffff", size: "lg" },
    { icon: "fab fa-python", color: "#3776ab", size: "xl" },
    { icon: "fas fa-server", color: "#90c53f", size: "lg" },
    { icon: "fas fa-fire", color: "#ff9100", size: "lg" },
    { icon: "fab fa-git-alt", color: "#f1502f", size: "lg" },
    { icon: "fab fa-bootstrap", color: "#7952b3", size: "lg" },
    { icon: "fas fa-laptop-code", color: "#38bdf8", size: "xl" },
    { icon: "fas fa-terminal", color: "#4a90e2", size: "lg" },
    { icon: "fas fa-cloud", color: "#38bdf8", size: "xl" },
    { icon: "fas fa-mobile-alt", color: "#9333ea", size: "lg" },
    { icon: "fab fa-docker", color: "#2496ed", size: "xl" },
    { icon: "fas fa-cog", color: "#6b7280", size: "lg" },
    { icon: "fas fa-rocket", color: "#f59e0b", size: "xl" },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora aurora-1"></div>
      <div className="aurora aurora-2"></div>
      <div className="grid-overlay"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Floating Tech Icons in Space */}
      <div className="absolute inset-0 pointer-events-none">
        {techIcons.map((tech, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomDelay = Math.random() * 8;
          const randomDuration = 15 + Math.random() * 15;

          return (
            <div
              key={i}
              className="tech-float-icon absolute"
              style={{
                left: `${randomX}%`,
                top: `${randomY}%`,
                animationDelay: `${randomDelay}s`,
                animationDuration: `${randomDuration}s`,
              }}>
              <i
                className={`${tech.icon} text-${tech.size}`}
                style={{
                  color: tech.color,
                  opacity: 0.15,
                  textShadow: `0 0 20px ${tech.color}40`,
                  fontSize:
                    tech.size === "2xl"
                      ? "2rem"
                      : tech.size === "xl"
                        ? "1.5rem"
                        : "1.25rem",
                }}></i>
            </div>
          );
        })}
      </div>

      <div className="particle-field">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>
      <span className="meteor meteor-1"></span>
      <span className="meteor meteor-2"></span>
      <span className="meteor meteor-3"></span>
    </div>
  );
}
