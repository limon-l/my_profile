import React, { useRef, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ProjectsSection({ projects, openModal }) {
  const cardsRef = useRef({});

  const handleMouseMove = useCallback((e, key) => {
    const card = cardsRef.current[key];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);

    const spotlight = card.querySelector(".project-spotlight");
    if (spotlight) {
      spotlight.style.left = `${e.clientX - rect.left}px`;
      spotlight.style.top = `${e.clientY - rect.top}px`;
    }
  }, []);

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label inline-flex mx-auto mb-4">
            <i className="fas fa-briefcase text-[0.6rem]"></i>
            Projects
          </div>
          <h2 className="section-title mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Selected projects showcasing full-stack development, clean architecture, and attention to user experience.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(projects).map((k, idx) => {
            const p = projects[k];
            return (
              <ScrollReveal key={k} delay={idx * 100}>
                <div
                  ref={(el) => (cardsRef.current[k] = el)}
                  onMouseMove={(e) => handleMouseMove(e, k)}
                  className="project-card glass-card group cursor-pointer"
                  onClick={() => openModal(k)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openModal(k)}
                  aria-label={`View details for ${p.title}`}>
                  {/* Spotlight */}
                  <div className="project-spotlight" />

                  {/* Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="project-img w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-textGray text-sm mb-4 leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] text-[0.7rem] text-textGray rounded-lg font-medium">
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 3 && (
                        <span className="px-2.5 py-1 bg-accent/[0.06] border border-accent/[0.12] text-[0.7rem] text-accent rounded-lg font-medium">
                          +{p.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-accent text-sm font-semibold">
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
