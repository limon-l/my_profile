import React, { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = ["home", "about", "skills", "projects", "testimonials", "contact"];
const NAV_ICONS = {
  home: "fas fa-home",
  about: "fas fa-user",
  skills: "fas fa-code",
  projects: "fas fa-briefcase",
  testimonials: "fas fa-quote-right",
  contact: "fas fa-envelope",
};

export default function Navigation({ scrollY }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isScrolled = scrollY > 50;

  const updateScrollProgress = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) setScrollProgress((window.scrollY / docHeight) * 100);
  }, []);

  useEffect(() => {
    if (scrollY < 100) {
      setHidden(false);
      setLastScrollY(scrollY);
      return;
    }
    const diff = scrollY - lastScrollY;
    if (diff > 10 && scrollY > 200) setHidden(true);
    else if (diff < -10) setHidden(false);
    setLastScrollY(scrollY);
  }, [scrollY, lastScrollY]);

  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [updateScrollProgress]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[101]" style={{ pointerEvents: 'none' }}>
        <div
          className="h-full rounded-r-full"
          style={{
            width: `${scrollProgress}%`,
            background: 'var(--gradient-hero)',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <nav
        className={`navbar fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? "scrolled" : ""
        } ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="container px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="navbar-logo group">
            <span className="navbar-logo-icon group-hover:shadow-[0_0_20px_rgba(0,225,255,0.3)] transition-shadow duration-300">
              L
            </span>
            <span>
              <span className="animated-gradient-text">LIMON</span>
              <span className="text-white/70">.DEV</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`navbar-link ${activeSection === item ? "active" : ""}`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
              className="navbar-kbd cursor-pointer"
              aria-label="Open command palette">
              <i className="fas fa-search text-[10px]"></i>
              <span>⌘K</span>
            </button>

            <a href="#contact" className="navbar-hire-btn">
              <i className="fas fa-paper-plane text-[10px]"></i>
              Hire Me
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="navbar-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}>
            <span className={`transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div className={`navbar-mobile ${mobileOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={() => setMobileOpen(false)}
            className={`navbar-link ${activeSection === item ? "active" : ""}`}
            style={{ transitionDelay: `${i * 50}ms`, fontSize: '1.1rem', padding: '12px 24px' }}>
            <i className={`${NAV_ICONS[item]} w-5 text-center text-sm mr-3`}></i>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}

        <div className="mt-8 pt-6 border-t border-white/5 space-y-3 w-full max-w-[280px]">
          <button
            onClick={() => {
              setMobileOpen(false);
              setTimeout(() => {
                document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
              }, 300);
            }}
            className="btn-secondary w-full justify-center">
            <i className="fas fa-search text-xs"></i>
            Command Palette
            <kbd className="text-[10px] text-white/30 font-mono">⌘K</kbd>
          </button>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
            <i className="fas fa-paper-plane"></i>
            Get In Touch
          </a>
        </div>
      </div>
    </>
  );
}
