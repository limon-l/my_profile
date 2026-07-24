import React from "react";
import SkillSpeedometer from "./SkillSpeedometer";
import ScrollReveal from "./ScrollReveal";

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    subtitle: "Core languages & problem solving",
    icon: "fas fa-laptop-code",
    skills: "programming",
    delay: 0,
  },
  {
    title: "Frontend Engineering",
    subtitle: "UI architecture & interaction design",
    icon: "fas fa-code",
    skills: "frontend",
    delay: 100,
  },
  {
    title: "Backend & Data",
    subtitle: "APIs, authentication, and data modeling",
    icon: "fas fa-server",
    skills: "backend",
    delay: 200,
  },
  {
    title: "Tooling & Platforms",
    subtitle: "Delivery, collaboration, and deployment",
    icon: "fas fa-wrench",
    skills: "tools",
    delay: 300,
  },
];

export default function SkillsSection({
  skills,
  certifications,
  getProficiencyLabel,
}) {
  return (
    <section id="skills" className="py-24 bg-white/[0.01]">
      <div className="container">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label inline-flex mx-auto mb-4">
            <i className="fas fa-code text-[0.6rem]"></i>
            Skills
          </div>
          <h2 className="section-title mb-4">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="section-subtitle mx-auto">
            A balanced skill set across frontend, backend, and production tooling,
            with emphasis on performance, accessibility, and clean architecture.
          </p>
        </ScrollReveal>

        {/* Skill Groups Grid */}
        <div className="grid lg:grid-cols-2 gap-5">
          {SKILL_GROUPS.map((group) => (
            <ScrollReveal key={group.title} delay={group.delay}>
              <div className="glass-card p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <i className={`${group.icon} text-base`}></i>
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{group.title}</h3>
                    <p className="text-textGray text-xs">{group.subtitle}</p>
                  </div>
                </div>

                {group.skills === "tools" ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((tool) => (
                      <span key={tool.name} className="tool-badge">
                        <i className={tool.icon}></i>
                        {tool.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5">
                    {skills[group.skills].map((skill) => (
                      <SkillSpeedometer
                        key={skill.name}
                        skill={skill}
                        getProficiencyLabel={getProficiencyLabel}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Strengths + Workflow */}
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <ScrollReveal delay={100}>
            <div className="glass-card p-6">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <i className="fas fa-check text-xs"></i>
                </span>
                Core Strengths
              </h4>
              <ul className="space-y-3 text-textGray text-sm">
                {[
                  "Component-driven UI design with scalable patterns",
                  "Performance tuning, accessibility, and responsive layouts",
                  "Secure API integrations and state management",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-card p-6">
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
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
                  <div
                    key={item.step}
                    className="px-3 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                    <i className={`${item.icon} text-accent/50 text-xs mb-1.5 block`}></i>
                    <span className="text-textGray text-xs font-medium">{item.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Certifications */}
        <ScrollReveal className="mt-10" delay={100}>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <i className="fas fa-certificate text-sm"></i>
            </span>
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card glass-card p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center border border-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all">
                    <i className="fas fa-award text-accent text-base"></i>
                  </div>
                  <span className="text-[0.65rem] text-textGray font-medium uppercase tracking-wider">
                    {cert.date}
                  </span>
                </div>
                <p className="text-[0.6rem] text-accent/70 font-semibold uppercase tracking-[0.15em] mb-1">
                  {cert.certificate}
                </p>
                <h4 className="font-bold text-white text-sm mb-2 leading-snug group-hover:text-accent transition-colors">
                  {cert.courseName}
                </h4>
                <p className="text-xs text-textGray mb-3">{cert.author}</p>
                <div className="pt-3 border-t border-white/[0.05] flex items-center gap-2">
                  <i className="fas fa-building text-accent/40 text-[0.6rem]"></i>
                  <span className="text-xs text-accent font-medium">{cert.issuer}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
