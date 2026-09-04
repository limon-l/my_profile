import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const SKILL_GROUPS = [
  { title: "Programming Languages", subtitle: "Core languages & problem solving", icon: "fas fa-laptop-code", skills: "programming", delay: 0 },
  { title: "Frontend Engineering", subtitle: "UI architecture & interaction design", icon: "fas fa-code", skills: "frontend", delay: 100 },
  { title: "Backend & Data", subtitle: "APIs, authentication, and data modeling", icon: "fas fa-server", skills: "backend", delay: 200 },
  { title: "Tooling & Platforms", subtitle: "Delivery, collaboration, and deployment", icon: "fas fa-wrench", skills: "tools", delay: 300 },
];

export default function SkillsSection({ skills, certifications }) {
  const [fullscreenCert, setFullscreenCert] = useState(null);

  return (
    <section id="skills" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-code text-[10px]"></i>
            Skills
          </div>
          <h2 className="section-title">
            Technical <span className="animated-gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A balanced skill set across frontend, backend, and production tooling,
            with emphasis on performance, accessibility, and clean architecture.
          </p>
        </ScrollReveal>

        {/* Skill Groups */}
        <div className="grid lg:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group) => (
            <ScrollReveal key={group.title} delay={group.delay}>
              <div className="glass-card editorial-card p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className={`${group.icon} text-base`}></i>
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{group.title}</h3>
                    <p className="text-[var(--text-muted)] text-xs">{group.subtitle}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skills[group.skills].map((skill) => (
                      <span key={skill.name} className="skill-chip px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] font-medium flex items-center gap-2">
                        <i className={skill.icon}></i>
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Strengths + Workflow */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <ScrollReveal delay={100}>
            <div className="glass-card editorial-card p-6">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                  <i className="fas fa-check text-xs"></i>
                </span>
                Core Strengths
              </h4>
              <ul className="space-y-3 text-[var(--text-secondary)] text-sm">
                {[
                  "Component-driven UI design with scalable patterns",
                  "Performance tuning, accessibility, and responsive layouts",
                  "Secure API integrations and state management",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card editorial-card p-6">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                  <i className="fas fa-stream text-xs"></i>
                </span>
                Preferred Workflow
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { step: "Discovery", icon: "fas fa-search" },
                  { step: "Wireframing", icon: "fas fa-pencil-ruler" },
                  { step: "Build", icon: "fas fa-code" },
                  { step: "Integrate", icon: "fas fa-plug" },
                  { step: "Test", icon: "fas fa-vial" },
                  { step: "Deploy", icon: "fas fa-rocket" },
                ].map((item) => (
                  <div key={item.step} className="workflow-step px-3 py-3 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] text-center">
                    <i className={`${item.icon} text-[var(--accent)] opacity-50 text-xs mb-1.5 block`}></i>
                    <span className="text-[var(--text-secondary)] text-xs font-medium">{item.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Certifications */}
        <ScrollReveal className="mt-10" delay={100}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
              <i className="fas fa-certificate text-sm"></i>
            </span>
            Certifications
          </h3>

          <div className="certs-carousel" aria-label="Certifications carousel">
            <div className="certs-track">
            {[...certifications, ...certifications].map((cert, idx) => (
              <div
                key={`${cert.courseName}-${idx}`}
                className={`cert-card group cursor-pointer ${idx >= certifications.length ? "cert-card-clone" : ""}`}
                onClick={() => setFullscreenCert(cert)}
                role="button"
                tabIndex={idx >= certifications.length ? -1 : 0}
                aria-hidden={idx >= certifications.length}
                onKeyDown={(e) => e.key === "Enter" && setFullscreenCert(cert)}
                aria-label={`View certificate: ${cert.courseName}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 bg-[var(--accent-soft)] rounded-xl flex items-center justify-center border border-[var(--border-accent)] group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <i className={`${cert.icon || "fas fa-award"} text-[var(--accent)] text-base`}></i>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] font-medium uppercase tracking-wider">{cert.date}</span>
                </div>
                <p className="text-[10px] text-[var(--accent)] opacity-70 font-semibold uppercase tracking-[0.15em] mb-1">{cert.certificate}</p>
                <h4 className="font-bold text-white text-sm mb-2 leading-snug group-hover:text-[var(--accent)] transition-colors">{cert.courseName}</h4>
                <p className="text-xs text-[var(--text-muted)] mb-3">{cert.author}</p>
                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-building text-[var(--accent)] opacity-40 text-[10px]"></i>
                    <span className="text-xs text-[var(--accent)] font-medium">{cert.issuer}</span>
                  </div>
                  <i className="fas fa-expand text-[var(--text-muted)] opacity-40 text-[10px] group-hover:text-[var(--accent)] transition-colors"></i>
                </div>
              </div>
            ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Fullscreen Certificate Viewer */}
        {fullscreenCert && (
          <div className="fixed inset-0 z-[200] bg-[rgba(0,0,0,0.85)] backdrop-blur-md flex items-center justify-center p-6 animate-fade-in" onClick={() => setFullscreenCert(null)} role="dialog" aria-modal="true" aria-label="Certificate viewer">
            <div className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[var(--radius-xl)] max-w-lg w-full p-10 text-center relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setFullscreenCert(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-[var(--border-strong)] transition-all" aria-label="Close">
                <i className="fas fa-times text-sm"></i>
              </button>

              <div className="w-20 h-20 bg-[var(--accent-soft)] rounded-3xl flex items-center justify-center border border-[var(--border-accent)] mx-auto mb-6">
                <i className={`${fullscreenCert.icon || "fas fa-award"} text-[var(--accent)] text-3xl`}></i>
              </div>
              <p className="text-[11px] text-[var(--accent)] opacity-70 font-semibold uppercase tracking-[0.2em] mb-3">{fullscreenCert.certificate}</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">{fullscreenCert.courseName}</h2>
              <p className="text-[var(--text-secondary)] text-base mb-2">by <span className="text-white font-medium">{fullscreenCert.author}</span></p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] text-sm text-[var(--accent)] font-medium mb-6">
                <i className="fas fa-building text-xs"></i>
                {fullscreenCert.issuer}
              </div>
              <p className="text-[var(--text-muted)] text-sm">Issued: <span className="text-white">{fullscreenCert.date}</span></p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
