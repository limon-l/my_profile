import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection({ languages }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-user text-[10px]"></i>
            About
          </div>
          <h2 className="section-title">
            The Developer <span className="animated-gradient-text">Behind the Code</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Building meaningful digital experiences with a focus on performance, accessibility, and clean architecture.
          </p>
        </ScrollReveal>

        <div className="about-grid">
          {/* Left Column */}
          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <div className="glass-card editorial-card p-7">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className="fas fa-star text-sm"></i>
                  </span>
                  Professional Summary
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-[0.9rem]">
                  Final-year CSE student and aspiring software developer with a
                  strong foundation in modern JavaScript and web technologies. I
                  focus on building scalable, user-centered applications with
                  clean architecture, accessibility, and performance best practices.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card editorial-card p-7">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className="fas fa-bullseye text-sm"></i>
                  </span>
                  What I Drive Toward
                </h3>
                <ul className="space-y-3.5 text-[var(--text-secondary)] text-[0.9rem]">
                  {[
                    "Deepen full-stack skills across React, Node.js, and databases while applying clean code and system design principles.",
                    "Build production-ready projects that solve real problems and highlight performance, security, and UX.",
                    "Collaborate effectively and keep learning modern tools, testing practices, and deployment workflows.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} stagger>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "4+", label: "Projects" },
                  { value: "15+", label: "Skills" },
                  { value: "4", label: "Certifications" },
                ].map((stat) => (
                  <div key={stat.label} className="neu-card p-5 text-center">
                    <div className="text-2xl font-extrabold gradient-text mb-1">{stat.value}</div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ScrollReveal delay={150} animation="reveal-right">
              <div className="glass-card editorial-card p-7">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className="fas fa-graduation-cap text-sm"></i>
                  </span>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-[var(--surface-1)] border-l-2 border-[var(--accent)] hover:bg-[rgba(0,225,255,0.03)] transition-colors">
                    <h4 className="font-bold text-white text-[0.95rem]">B.Sc (Engg.) Computer Science & Engineering</h4>
                    <p className="text-[var(--accent)] text-sm font-medium mt-1">Metropolitan University, Sylhet</p>
                    <p className="text-[var(--text-muted)] text-xs mt-1">Jan 2023 – Dec 2026</p>
                  </div>
                  <div className="p-5 rounded-xl bg-[var(--surface-1)] border-l-2 border-white/20 hover:bg-[var(--surface-2)] transition-colors">
                    <h4 className="font-bold text-white text-[0.95rem]">Higher Secondary Certificate</h4>
                    <p className="text-[var(--accent)] text-sm font-medium mt-1">Dhaka City College, Dhaka</p>
                    <p className="text-[var(--text-muted)] text-xs mt-1">GPA: 5.00 / 5.00</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250} animation="reveal-right">
              <div className="glass-card editorial-card p-7">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className="fas fa-globe text-sm"></i>
                  </span>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span key={lang.name} className="px-4 py-2 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] text-sm text-[var(--text-secondary)] font-medium">
                      {lang.flag} {lang.name}
                      <span className="text-[var(--accent)] ml-1.5 opacity-60">{lang.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350} animation="reveal-right">
              <div className="glass-card editorial-card p-7">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                    <i className="fas fa-lightbulb text-sm"></i>
                  </span>
                  Currently Focused On
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["System Design", "TypeScript", "Testing", "CI/CD", "Performance Optimization", "Open Source"].map((focus) => (
                    <span key={focus} className="px-3 py-1.5 rounded-lg bg-[var(--accent-soft)] border border-[var(--border-accent)] text-xs text-[var(--accent)] font-medium">
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}
