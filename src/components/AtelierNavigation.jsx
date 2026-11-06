import React, { useEffect, useRef, useState } from "react";
import { Icon, Link } from "./ui";

const links = [
  ["Work", "/#projects"],
  ["About", "/#about"],
  ["Lab", "/lab"],
  ["Journal", "/journal"],
];

export default function AtelierNavigation({ theme, onThemeToggle, path }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const last = panelRef.current?.querySelector("a:last-child");
        if (event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label="lra. The Digital Atelier ? Limon Roy Apu, home"
        >
          <span className="brand-mark" aria-hidden="true">
            lra<span>.</span>
          </span>
          <span className="brand-caption">
            THE DIGITAL
            <br />
            ATELIER
          </span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
              {label === "Lab" && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button theme-toggle"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
          </button>
          <Link className="nav-contact" href="/#contact">
            Let’s talk <Icon size={15} />
          </Link>
          <button
            ref={toggleRef}
            className="icon-button menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        ref={panelRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!open}
      >
        {[...links, ["Contact", "/#contact"]].map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setOpen(false)}>
            {label}
            <Icon size={16} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
