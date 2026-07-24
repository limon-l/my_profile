import React, { useRef, useCallback, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const CATEGORIES = ["All", "Full Stack", "Frontend"];

export default function ProjectsSection({ projects, openModal }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const cardsRef = useRef({});

  const projectKeys = Object.keys(projects);
  const filteredKeys = activeFilter === "All"
    ? projectKeys
    : projectKeys.filter((k) => projects[k].category === activeFilter);

  const handleMouseMove = useCallback((e, key) => {
    const card = cardsRef.current[key];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
    const tiltX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const tiltY = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback((key) => {
    const card = cardsRef.current[key];
    if (card) card.style.transform = "";
  }, []);

  return (
    <section id="projects" className="section">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-briefcase text-[10px]"></i>
            Projects
          </div>
          <h2 className="section-title">
            Featured <span className="animated-gradient-text">Work</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Selected projects showcasing full-stack development, clean architecture, and attention to user experience.
          </p>
        </ScrollReveal>

        {/* Filter buttons */}
        <div className="projects-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`projects-filter-btn ${activeFilter === cat ? "active" : ""}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredKeys.map((k, idx) => {
            const p = projects[k];
            return (
              <ScrollReveal key={k} delay={idx * 100}>
                <div
                  ref={(el) => (cardsRef.current[k] = el)}
                  onMouseMove={(e) => handleMouseMove(e, k)}
                  onMouseLeave={() => handleMouseLeave(k)}
                  className="project-card group cursor-pointer"
                  onClick={() => openModal(k)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openModal(k)}
                  aria-label={`View details for ${p.title}`}>

                  {/* Spotlight overlay */}
                  <div className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,225,255,0.06), transparent 70%)',
                    }} />

                  {/* Image */}
                  <div className="project-card-image">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent opacity-60" />

                    {p.status && (
                      <div className="project-card-status">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.statusColor }} />
                        {p.status}
                      </div>
                    )}

                    {p.category && (
                      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[var(--accent-soft)] backdrop-blur-md border border-[var(--border-accent)]">
                        <span className="text-[11px] font-semibold text-[var(--accent)]">{p.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="project-card-body">
                    <h3 className="project-card-title group-hover:text-[var(--accent)] transition-colors">
                      {p.title}
                    </h3>
                    <p className="project-card-desc">{p.desc}</p>

                    {p.timeline && (
                      <div className="flex items-center gap-3 mb-3 text-[11px] text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-clock text-[var(--accent)] opacity-50"></i>
                          {p.timeline}
                        </span>
                        {p.completion !== undefined && (
                          <span className="flex items-center gap-1">
                            <i className="fas fa-check-circle text-[var(--accent)] opacity-50"></i>
                            {p.completion}%
                          </span>
                        )}
                      </div>
                    )}

                    {p.completion !== undefined && (
                      <div className="project-card-progress">
                        <div className="project-card-progress-bar">
                          <div className="project-card-progress-fill" style={{ width: `${p.completion}%` }} />
                        </div>
                      </div>
                    )}

                    <div className="project-card-tech mt-4">
                      {p.stack.slice(0, 3).map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                      {p.stack.length > 3 && (
                        <span className="!bg-[var(--accent-soft)] !border-[var(--border-accent)] !text-[var(--accent)]">
                          +{p.stack.length - 3}
                        </span>
                      )}
                    </div>

                    {p.highlights && (
                      <div className="flex items-center gap-4 mt-3 text-[11px] text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <i className="fas fa-star text-amber-400 opacity-60"></i>
                          {p.highlights.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <i className="fas fa-code-branch text-[var(--accent)] opacity-50"></i>
                          {p.highlights.forks}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[var(--accent)] text-sm font-semibold mt-4">
                      <span>View Details</span>
                      <i className="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
