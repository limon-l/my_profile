import React, { useState, useEffect, useRef, useCallback } from "react";

const NAV_SECTIONS = [
  { id: "home", label: "Home", icon: "fas fa-home", shortcut: "⌘H" },
  { id: "about", label: "About", icon: "fas fa-user", shortcut: "⌘A" },
  { id: "skills", label: "Skills", icon: "fas fa-code", shortcut: "⌘S" },
  { id: "projects", label: "Projects", icon: "fas fa-briefcase", shortcut: "⌘P" },
  { id: "testimonials", label: "Testimonials", icon: "fas fa-quote-right", shortcut: "⌘T" },
  { id: "contact", label: "Contact", icon: "fas fa-envelope", shortcut: "⌘E" },
];

const QUICK_ACTIONS = [
  { id: "github", label: "View GitHub", icon: "fab fa-github", action: () => window.open("https://github.com/limon-l", "_blank") },
  { id: "linkedin", label: "LinkedIn Profile", icon: "fab fa-linkedin-in", action: () => window.open("https://linkedin.com/in/limonroyapu", "_blank") },
  { id: "email", label: "Send Email", icon: "fas fa-envelope", action: () => window.location.href = "mailto:limonroyapu101@gmail.com" },
  { id: "resume", label: "Download Resume", icon: "fas fa-file-download", action: () => {} },
  { id: "top", label: "Back to Top", icon: "fas fa-arrow-up", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const allItems = [
    ...NAV_SECTIONS.map(s => ({ ...s, type: "section" })),
    ...QUICK_ACTIONS.map(a => ({ ...a, type: "action" })),
  ];

  const filtered = query.trim()
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  const toggle = useCallback(() => {
    setOpen(prev => !prev);
    setQuery("");
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, toggle]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  function executeItem(item) {
    if (item.type === "section") {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      item.action?.();
    }
    setOpen(false);
  }

  function onKeyNav(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      executeItem(filtered[activeIndex]);
    }
  }

  useEffect(() => {
    const el = listRef.current?.children[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  return (
    <div className="command-overlay active" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Command Palette">
      <div className="command-palette" onClick={e => e.stopPropagation()}>
        <div className="command-input-wrapper">
          <i className="fas fa-search text-[var(--accent)]"></i>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyNav}
            placeholder="Type a command or search..."
            className="command-input"
            aria-label="Search commands"
          />
          <kbd className="px-2 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[10px] text-[var(--text-muted)] font-mono">ESC</kbd>
        </div>

        <div className="command-results custom-scroll" ref={listRef} role="listbox">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-[var(--text-muted)]">
              <i className="fas fa-search text-xl mb-2 opacity-40"></i>
              <p className="text-sm">No results found</p>
            </div>
          )}
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              className={`command-item ${idx === activeIndex ? "active" : ""}`}
              onClick={() => executeItem(item)}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseEnter={() => setActiveIndex(idx)}>
              <div className="command-item-icon">
                <i className={`${item.icon}`}></i>
              </div>
              <div className="command-item-text">
                <div className="command-item-title">{item.label}</div>
              </div>
              <div>
                {item.type === "section" && (
                  <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-2)] border border-[var(--border)] text-[9px] text-[var(--text-muted)] font-mono">{item.shortcut}</kbd>
                )}
                {item.type === "action" && (
                  <i className="fas fa-arrow-right text-[10px] text-[var(--text-muted)]"></i>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="command-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
