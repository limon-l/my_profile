import React, { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"];

const NAV_ICONS = {
  home: "fas fa-home",
  about: "fas fa-user",
  skills: "fas fa-code",
  projects: "fas fa-briefcase",
  contact: "fas fa-envelope",
};

export default function Navigation({ scrollY }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const isScrolled = scrollY > 50;

  const updateScrollProgress = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      setScrollProgress((window.scrollY / docHeight) * 100);
    }
  }, []);

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
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav className={`nav-glass fixed w-full top-0 z-50 ${isScrolled ? "scrolled" : ""}`}>
        <div className="container px-6 py-4 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-1 group">
            <span className="text-xl font-extrabold tracking-wider text-gradient">LIMON</span>
            <span className="text-xl font-extrabold tracking-wider text-white/90">.DEV</span>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className={`nav-link px-4 py-2 rounded-lg text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
                    activeSection === item
                      ? "text-accent active"
                      : "text-textGray hover:text-white"
                  }`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-[0.75rem] !rounded-xl">
            <i className="fas fa-paper-plane text-[0.65rem]"></i>
            Hire Me
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-accent/30 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}>
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile panel */}
      <div className={`mobile-nav-panel ${mobileOpen ? "active" : ""}`}>
        <div className="flex flex-col gap-1">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMobileOpen(false)}
              className={`mobile-nav-link ${activeSection === item ? "active" : ""}`}
              style={{ transitionDelay: `${i * 50}ms` }}>
              <i className={`${NAV_ICONS[item]} w-5 text-center text-sm`}></i>
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </a>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary w-full justify-center !text-sm">
            <i className="fas fa-paper-plane"></i>
            Get In Touch
          </a>
        </div>
      </div>
    </>
  );
}
