import React, { useState, useEffect, useRef, useMemo } from "react";

const PARTICLE_COUNT = 20;

function LoaderParticle({ index }) {
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    animationDuration: `${1.5 + Math.random() * 1.5}s`,
    width: `${2 + Math.random() * 3}px`,
    height: `${2 + Math.random() * 3}px`,
    background: ['#00e1ff', '#7c3aed', '#f472b6'][index % 3],
  }), [index]);
  return <div className="loader-particle" style={style} />;
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [phase, setPhase] = useState("loading");
  const rafRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 2000;

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 4);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPhase("complete");
        setTimeout(() => {
          setHidden(true);
          document.getElementById("root")?.classList.add("app-ready");
          setTimeout(() => onComplete?.(), 700);
        }, 500);
      }
    }

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <div
      className={`loading-screen ${hidden ? "hidden" : ""}`}
      aria-hidden={hidden}
      role="status"
      aria-label="Loading portfolio">
      <div className="loader-particles">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <LoaderParticle key={i} index={i} />
        ))}
      </div>

      <div className="loader-logo">
        <div className="loader-logo-ring">
          <div className="loader-logo-text">LR</div>
        </div>
      </div>

      <div className="loader-progress" style={{ width: '200px' }}>
        <div
          className="loader-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="loader-percent">{progress}%</span>
        {phase === "complete" && (
          <span className="text-[10px] text-[var(--accent)] font-semibold tracking-wider uppercase animate-fade-in">
            Ready
          </span>
        )}
      </div>
    </div>
  );
}
