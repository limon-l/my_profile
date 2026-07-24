import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function PhilosophySection({ philosophy }) {
  return (
    <section id="philosophy" className="section">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-lightbulb text-[10px]"></i>
            Philosophy
          </div>
          <h2 className="section-title">
            Development <span className="animated-gradient-text">Philosophy</span>
          </h2>
          <p className="section-subtitle mx-auto">
            The principles that guide every line of code I write and every system I design.
          </p>
        </ScrollReveal>

        <div className="philosophy-grid">
          {philosophy.map((item, idx) => (
            <ScrollReveal key={item.title} delay={idx * 100}>
              <div className="philosophy-card group text-center">
                <div className="philosophy-icon group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 mx-auto">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <h3 className="philosophy-title group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h3>
                <p className="philosophy-desc">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Workflow Pipeline */}
        <ScrollReveal delay={200} className="mt-10">
          <div className="glass-card p-8">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                <i className="fas fa-stream text-sm"></i>
              </span>
              How I Work
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { step: "01", title: "Discover", desc: "Understand requirements & goals", icon: "fas fa-search" },
                { step: "02", title: "Plan", desc: "Architecture & system design", icon: "fas fa-sitemap" },
                { step: "03", title: "Design", desc: "Wireframes & component system", icon: "fas fa-pencil-ruler" },
                { step: "04", title: "Develop", desc: "Clean, testable code", icon: "fas fa-code" },
                { step: "05", title: "Test", desc: "QA, performance, accessibility", icon: "fas fa-vial" },
                { step: "06", title: "Deploy", desc: "CI/CD, monitoring, iteration", icon: "fas fa-rocket" },
              ].map((item) => (
                <div key={item.step} className="text-center group/step">
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-3 group-hover/step:bg-[var(--accent-soft)] group-hover/step:border-[var(--border-accent)] transition-all">
                    <i className={`${item.icon} text-[var(--accent)] opacity-50 text-sm group-hover/step:text-[var(--accent)] group-hover/step:opacity-100 transition-colors`}></i>
                  </div>
                  <div className="text-[var(--accent)] font-mono text-[10px] font-bold tracking-widest mb-1">STEP {item.step}</div>
                  <h4 className="text-white text-sm font-bold mb-1">{item.title}</h4>
                  <p className="text-[var(--text-muted)] text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
