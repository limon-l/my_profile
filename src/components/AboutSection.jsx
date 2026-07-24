import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function AboutSection({ languages }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="container">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label inline-flex mx-auto mb-4">
            <i className="fas fa-user text-[0.6rem]"></i>
            About
          </div>
          <h2 className="section-title mb-4">
            The Developer <span className="text-gradient">Behind the Code</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Building meaningful digital experiences with a focus on performance, accessibility, and clean architecture.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            <ScrollReveal delay={100}>
              <div className="glass-card p-7">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className="fas fa-star text-sm"></i>
                  </span>
                  Professional Summary
                </h3>
                <p className="text-textGray leading-relaxed text-[0.9rem]">
                  Fourth-year CSE student and aspiring software developer with a
                  strong foundation in modern JavaScript and web technologies. I
                  focus on building scalable, user-centered applications with
                  clean architecture, accessibility, and performance best
                  practices.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="glass-card p-7 objective-card">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className="fas fa-bullseye text-sm"></i>
                  </span>
                  What I Drive Toward
                </h3>
                <ul className="space-y-3.5 text-textGray text-[0.9rem]">
                  {[
                    "Deepen full-stack skills across React, Node.js, and databases while applying clean code and system design principles.",
                    "Build production-ready projects that solve real problems and highlight performance, security, and UX.",
                    "Collaborate effectively and keep learning modern tools, testing practices, and deployment workflows.",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="objective-dot" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} stagger>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "3+", label: "Projects Built" },
                  { value: "5+", label: "Skills Mastered" },
                  { value: "4", label: "Certifications" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card p-5 text-center cursor-default">
                    <div className="text-2xl font-extrabold text-gradient mb-1">
                      {stat.value}
                    </div>
                    <div className="text-[0.7rem] text-textGray uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ScrollReveal delay={150} animation="reveal-right">
              <div className="glass-card p-7">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className="fas fa-graduation-cap text-sm"></i>
                  </span>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-white/[0.02] border-l-2 border-accent hover:bg-accent/[0.03] transition-colors">
                    <h4 className="font-bold text-white text-[0.95rem]">
                      B.Sc (Engg.) Computer Science & Engineering
                    </h4>
                    <p className="text-accent text-sm font-medium mt-1">
                      Metropolitan University, Sylhet
                    </p>
                    <p className="text-textGray text-xs mt-1">Jan 2023 – Dec 2026</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border-l-2 border-white/20 hover:bg-white/[0.04] transition-colors">
                    <h4 className="font-bold text-white text-[0.95rem]">
                      Higher Secondary Certificate
                    </h4>
                    <p className="text-accent text-sm font-medium mt-1">
                      Dhaka City College, Dhaka
                    </p>
                    <p className="text-textGray text-xs mt-1">GPA: 5.00 / 5.00</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250} animation="reveal-right">
              <div className="glass-card p-7">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className="fas fa-globe text-sm"></i>
                  </span>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-textGray font-medium">
                      {lang.name}
                      <span className="text-accent/60 ml-1.5">{lang.level}</span>
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350} animation="reveal-right">
              <div className="glass-card p-7">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className="fas fa-lightbulb text-sm"></i>
                  </span>
                  Currently Focused On
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "System Design",
                    "TypeScript",
                    "Testing",
                    "CI/CD",
                    "Performance Optimization",
                    "Open Source",
                  ].map((focus) => (
                    <span
                      key={focus}
                      className="px-3 py-1.5 rounded-lg bg-accent/[0.06] border border-accent/[0.12] text-xs text-accent font-medium">
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
