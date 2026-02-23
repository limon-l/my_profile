import React from "react";
import SkillSpeedometer from "./SkillSpeedometer";

export default function SkillsSection({
  skills,
  certifications,
  getProficiencyLabel,
}) {
  return (
    <section id="skills" className="py-20">
      <div className="container">
        <h2 className="section-title text-4xl font-bold text-center mb-6 animate-slideUp">
          <span className="border-b-4 border-accent pb-2">
            Technical Skills
          </span>
        </h2>
        <p className="text-center text-textGray max-w-3xl mx-auto mb-12">
          A balanced skill set across frontend, backend, and production tooling,
          with emphasis on performance, accessibility, and clean architecture.
        </p>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-all animate-slideInLeft">
            <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-laptop-code text-3xl text-accent"></i>
              <div>
                <h3 className="text-xl font-bold">Programming Languages</h3>
                <p className="text-textGray text-sm">
                  Core languages & problem solving
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {skills.programming.map((skill) => (
                <SkillSpeedometer
                  key={skill.name}
                  skill={skill}
                  getProficiencyLabel={getProficiencyLabel}
                />
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-all animate-slideInLeft">
            <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-code text-3xl text-accent"></i>
              <div>
                <h3 className="text-xl font-bold">Frontend Engineering</h3>
                <p className="text-textGray text-sm">
                  UI architecture & interaction design
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {skills.frontend.map((skill) => (
                <SkillSpeedometer
                  key={skill.name}
                  skill={skill}
                  getProficiencyLabel={getProficiencyLabel}
                />
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-all animate-slideUp">
            <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-server text-3xl text-accent"></i>
              <div>
                <h3 className="text-xl font-bold">Backend & Data</h3>
                <p className="text-textGray text-sm">
                  APIs, authentication, and data modeling
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {skills.backend.map((skill) => (
                <SkillSpeedometer
                  key={skill.name}
                  skill={skill}
                  getProficiencyLabel={getProficiencyLabel}
                />
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm hover:border-accent/40 transition-all animate-slideInRight">
            <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-tools text-3xl text-accent"></i>
              <div>
                <h3 className="text-xl font-bold">Tooling & Platforms</h3>
                <p className="text-textGray text-sm">
                  Delivery, collaboration, and deployment
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool) => (
                <span
                  key={tool.name}
                  className="tool-badge px-3 py-2 rounded-full border border-accent/30 bg-accent/10 text-sm font-semibold text-accent flex items-center gap-2">
                  <i className={tool.icon}></i>
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm animate-slideInLeft">
            <h4 className="text-lg font-semibold text-accent mb-4">
              Core Strengths
            </h4>
            <ul className="space-y-3 text-textGray">
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-accent"></i>
                Component-driven UI design with scalable patterns
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-accent"></i>
                Performance tuning, accessibility, and responsive layouts
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-check-circle text-accent"></i>
                Secure API integrations and state management
              </li>
            </ul>
          </div>
          <div className="p-6 bg-primary/40 border border-accent/20 rounded-2xl backdrop-blur-sm animate-slideInRight">
            <h4 className="text-lg font-semibold text-accent mb-4">
              Preferred Workflow
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                "Discovery",
                "Wireframing",
                "Component Build",
                "API Integration",
                "Testing",
                "Deployment",
              ].map((step) => (
                <div
                  key={step}
                  className="px-4 py-3 bg-secondary/40 border border-accent/10 rounded-lg text-center text-textGray">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-12 animate-slideUp">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent">
            <i className="fas fa-certificate text-3xl"></i>Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="cert-card group relative p-6 bg-gradient-to-br from-primary/60 to-secondary/40 border-2 border-accent/20 rounded-xl hover:border-accent/60 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all hover:-translate-y-2 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                  <div className="absolute top-0 right-0 w-32 h-32 border-accent border-t-2 border-r-2"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-accent border-b-2 border-l-2"></div>
                </div>

                {/* Certificate Badge */}
                <div className="relative flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-accent/10 border-2 border-accent/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all">
                    <i className="fas fa-award text-accent text-2xl"></i>
                  </div>
                  <span className="text-xs text-accent/60 font-semibold uppercase tracking-wider">
                    {cert.date}
                  </span>
                </div>

                {/* Certificate Type */}
                <div className="relative mb-2">
                  <p className="text-xs text-accent/80 font-semibold uppercase tracking-widest mb-1">
                    {cert.certificate}
                  </p>
                  <div className="h-px bg-gradient-to-r from-accent/40 via-accent/20 to-transparent mb-3"></div>
                </div>

                {/* Course Name */}
                <h4 className="relative font-bold text-white text-base mb-3 leading-snug group-hover:text-accent transition-colors">
                  {cert.courseName}
                </h4>

                {/* Author/Instructor */}
                <div className="relative mb-2">
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <i className="fas fa-user-tie text-accent/60 text-xs"></i>
                    <span className="text-textGray">{cert.author}</span>
                  </p>
                </div>

                {/* Issuer/Platform */}
                <div className="relative flex items-center gap-2 mt-4 pt-3 border-t border-accent/10">
                  <i className="fas fa-building text-accent/60 text-xs"></i>
                  <p className="text-sm text-accent font-medium">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
