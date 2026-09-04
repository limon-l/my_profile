import React, { useState, useEffect } from "react";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            {/* Logo */}
            <a href="#home" className="footer-logo group">
              <span className="footer-logo-icon group-hover:shadow-[0_0_16px_var(--accent-glow)] transition-shadow">L</span>
              <span>
                <span className="animated-gradient-text">LIMON</span>
                <span className="text-white/70">.DEV</span>
              </span>
            </a>

            {/* Nav Links */}
            <ul className="footer-links">
              {["home", "about", "experience", "skills", "projects", "testimonials", "contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} className="footer-link">{item}</a>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="footer-social">
              {[
                { href: "https://github.com/limon-l", icon: "fab fa-github", label: "GitHub" },
                { href: "https://linkedin.com/in/limonroyapu", icon: "fab fa-linkedin-in", label: "LinkedIn" },
                { href: "mailto:limonroyapu101@gmail.com", icon: "fas fa-envelope", label: "Email" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <p className="text-[var(--text-muted)]">
                <i className="fas fa-heart text-[var(--accent)] opacity-50 mr-1.5"></i>
                Built with passion. &copy; {year} Limon Roy Apu. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-[var(--text-muted)] opacity-50 font-mono">v3.0</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[var(--text-muted)] text-xs">Available for opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`footer-back-to-top ${showTop ? "visible" : ""}`}
        aria-label="Back to top">
        <i className="fas fa-arrow-up text-sm"></i>
      </button>
    </>
  );
}
