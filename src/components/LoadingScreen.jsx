import React, { useState, useEffect } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf;
    let start = null;
    const duration = 1800;

    function step(ts) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));
      if (raw < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setHidden(true);
          document.getElementById("root")?.classList.add("app-ready");
          setTimeout(() => onComplete?.(), 600);
        }, 300);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      className={`loader-overlay ${hidden ? "hidden" : ""}`}
      aria-hidden={hidden}
      role="status"
      aria-label="Loading portfolio">
      <div className="loader-logo">LIMON.DEV</div>
      <div className="loader-bar-container">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-percent">{progress}%</div>
    </div>
  );
}
