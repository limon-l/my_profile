import React, { useMemo } from "react";

const TECH_ICONS = [
  { icon: "fab fa-react", color: "#61dafb", size: 28 },
  { icon: "fab fa-js", color: "#f7df1e", size: 24 },
  { icon: "fab fa-node-js", color: "#68a063", size: 26 },
  { icon: "fab fa-html5", color: "#e34c26", size: 22 },
  { icon: "fab fa-css3-alt", color: "#00e1ff", size: 22 },
  { icon: "fas fa-database", color: "#13aa52", size: 20 },
  { icon: "fab fa-github", color: "#ffffff", size: 24 },
  { icon: "fas fa-code", color: "#ffffff", size: 20 },
  { icon: "fab fa-python", color: "#3776ab", size: 24 },
  { icon: "fas fa-server", color: "#90c53f", size: 20 },
  { icon: "fas fa-fire", color: "#ff9100", size: 20 },
  { icon: "fab fa-git-alt", color: "#f1502f", size: 20 },
  { icon: "fas fa-laptop-code", color: "#00e1ff", size: 22 },
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
  const particles = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 6}s`,
    animationDuration: `${4 + Math.random() * 4}s`,
    width: `${1 + Math.random() * 2}px`,
    height: `${1 + Math.random() * 2}px`,
    background: ['#00e1ff', '#7c3aed', '#f472b6'][i % 3],
    opacity: 0.1 + Math.random() * 0.15,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      {/* Mesh gradient orbs */}
      <div className="absolute w-[600px] h-[600px] -top-[200px] -left-[200px] rounded-full animate-aurora"
        style={{ background: 'radial-gradient(circle, rgba(0,225,255,0.06) 0%, transparent 70%)' }} />
      <div className="absolute w-[500px] h-[500px] top-[30%] -right-[150px] rounded-full animate-aurora-alt"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
      <div className="absolute w-[400px] h-[400px] -bottom-[100px] left-[30%] rounded-full animate-aurora"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 70%)', animationDelay: '-8s' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      {/* Floating tech icons */}
      {TECH_ICONS.map((tech, i) => (
        <div
          key={i}
          className="absolute animate-float"
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
              opacity: 0.05,
              fontSize: `${tech.size}px`,
              filter: "blur(0.5px)",
            }}
          />
        </div>
      ))}

      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} className="absolute rounded-full animate-particle-drift" style={p} />
      ))}

      {/* Meteors */}
      <div className="absolute top-[10%] left-[20%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-20 animate-meteor" style={{ animationDelay: '0s', transform: 'rotate(35deg)' }} />
      <div className="absolute top-[40%] left-[60%] w-[80px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-2)] to-transparent opacity-15 animate-meteor" style={{ animationDelay: '-2s', transform: 'rotate(30deg)' }} />
      <div className="absolute top-[70%] left-[30%] w-[60px] h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-3)] to-transparent opacity-10 animate-meteor" style={{ animationDelay: '-4s', transform: 'rotate(40deg)' }} />
    </div>
  );
}
