import React, { useCallback, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ProjectsSection({ projects, openModal }) {
  const projectKeys = Object.keys(projects);
  const featuredKey = projectKeys.includes("p4") ? "p4" : projectKeys[0];
  const featuredProject = projects[featuredKey];
  const supportingKeys = projectKeys.filter((key) => key !== featuredKey);
  const [rotation, setRotation] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shelfPaused, setShelfPaused] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const rotateProjects = useCallback(() => {
    if (supportingKeys.length < 2) return;
    setRotation((current) => (current + 1) % supportingKeys.length);
    setIsRotating(true);
    window.setTimeout(() => setIsRotating(false), 900);
  }, [supportingKeys.length]);

  useEffect(() => {
    if (shelfPaused || supportingKeys.length < 2) return undefined;
    const timer = window.setInterval(rotateProjects, 7000);
    return () => window.clearInterval(timer);
  }, [rotateProjects, shelfPaused, supportingKeys.length]);

  const orderedSupportingKeys = supportingKeys.map(
    (_, index) => supportingKeys[(index + rotation) % supportingKeys.length]
  );
  const displayedSupportingKeys = isExpanded
    ? orderedSupportingKeys
    : orderedSupportingKeys.slice(0, 3);

  const ProjectActions = ({ project, compact = false }) => (
    <div className={`project-actions ${compact ? "project-actions-compact" : ""}`}>
      <button
        type="button"
        className="project-view-button"
        onClick={(event) => {
          event.stopPropagation();
          openModal(project.key);
        }}>
        <span>Explore case study</span>
        <i className="fas fa-arrow-up-right-from-square" aria-hidden="true"></i>
      </button>
      {project.links?.live && (
        <a
          href={project.links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="project-live-link"
          onClick={(event) => event.stopPropagation()}>
          <i className="fas fa-globe" aria-hidden="true"></i>
          Live
        </a>
      )}
    </div>
  );

  const renderProject = (key, index, featured = false) => {
    const p = { ...projects[key], key };
    return (
      <ScrollReveal key={key} animation="reveal-deconstruct" delay={index * 100} className={featured ? "project-featured-wrap" : ""}>
        <article
          className={`project-card ${featured ? "project-card-featured" : "project-card-supporting"}`}
          onClick={() => openModal(key)}
          onMouseMove={(event) => {
            if (window.matchMedia("(pointer: coarse)").matches) return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
            event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
            event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - rect.top) / rect.height - 0.5) * -2.2}deg`);
            event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 2.2}deg`);
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.setProperty("--tilt-x", "0deg");
            event.currentTarget.style.setProperty("--tilt-y", "0deg");
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              openModal(key);
            }
          }}
          aria-label={`View details for ${p.title}`}>
          <div className="project-card-image">
            <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
            <div className="project-image-shade" />
            <div className="project-image-grid" aria-hidden="true" />
            <span className="project-image-mark" aria-hidden="true">↗</span>
            <div className="project-hover-signal" aria-hidden="true">
              <span className="project-hover-signal-label">
                <i className={`fas ${p.category === "Real-time Systems" ? "fa-bolt" : p.category === "Developer Tools" ? "fa-terminal" : p.category === "EdTech" ? "fa-graduation-cap" : "fa-layer-group"}`} />
                {p.category || "Product system"}
              </span>
              <span className="project-hover-signal-bars">
                <i /><i /><i /><i /><i />
              </span>
            </div>
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            {p.status && (
              <div className="project-card-status">
                <span style={{ background: p.statusColor }} />
                {p.status}
              </div>
            )}
            {p.category && <span className="project-category">{p.category}</span>}
            {featured && (
              <span className="project-featured-label">
                <i className="fas fa-sparkles" aria-hidden="true" />
                Featured build
              </span>
            )}
          </div>

          <div className="project-card-body">
            <div className="project-card-heading">
              <div>
                <span className="project-card-kicker">{featured ? "Flagship case study" : "Selected project"}</span>
                <h3 className="project-card-title">{p.title}</h3>
              </div>
              {p.timeline && (
                <span className="project-timeline">
                  <i className="fas fa-clock" aria-hidden="true" />
                  {p.timeline}
                </span>
              )}
            </div>
            <p className="project-card-desc">{p.desc}</p>

            {featured && p.details?.[0] && (
              <p className="project-card-proof">
                <i className="fas fa-arrow-trend-up" aria-hidden="true" />
                {p.details[0]}
              </p>
            )}

            <div className="project-card-footer">
              <div className="project-card-tech">
                {p.stack.slice(0, featured ? 4 : 3).map((tech) => <span key={tech}>{tech}</span>)}
                {p.stack.length > (featured ? 4 : 3) && <span className="project-tech-more">+{p.stack.length - (featured ? 4 : 3)}</span>}
              </div>
              <ProjectActions project={p} compact={!featured} />
            </div>
          </div>
        </article>
      </ScrollReveal>
    );
  };

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
            A closer look at how I turn complex requirements into useful, considered digital products.
          </p>
        </ScrollReveal>

        <div className="projects-showcase">
          <div className="projects-featured">
            {renderProject(featuredKey, 0, true)}
          </div>
          <div
            className={`projects-supporting ${isRotating ? "is-rotating" : ""}`}
            onMouseEnter={() => setShelfPaused(true)}
            onMouseLeave={() => setShelfPaused(false)}
            onFocus={() => setShelfPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setShelfPaused(false);
            }}>
            <div className="projects-supporting-intro">
              <div>
                <span className="projects-overline">More selected work</span>
                <span className="projects-rotation-note">
                  <i className={`fas fa-${shelfPaused ? "pause" : "rotate"}`} aria-hidden="true" />
                  {shelfPaused ? "Paused while browsing" : "Rotates every 7 seconds"}
                </span>
              </div>
              <span className="projects-count">{String(supportingKeys.length).padStart(2, "0")} builds</span>
            </div>
            {displayedSupportingKeys.map((key, index) => renderProject(key, index + 1))}
            <button
              type="button"
              className="projects-expand-button"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              aria-expanded={isExpanded}>
              {isExpanded ? "Show less" : "See more"}
              <i className={`fas fa-chevron-${isExpanded ? "up" : "down"}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
