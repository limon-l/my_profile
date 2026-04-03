import React from "react";

export default function AboutSection({ languages }) {
  return (
    <section id="about" className="py-20 bg-secondary/30 backdrop-blur-sm">
      <div className="container">
        <h2 className="section-title text-4xl font-bold text-center mb-16 animate-slideUp">
          <span className="border-b-4 border-accent pb-2">About Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slideInLeft">
            <div className="p-6 bg-primary/40 border border-accent/20 rounded-xl backdrop-blur-sm hover:border-accent/40 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
              <h3 className="text-xl font-bold text-accent mb-3">
                <i className="fas fa-star mr-2"></i>Professional Summary
              </h3>
              <p className="text-textGray leading-relaxed">
                Fourth-year CSE student and aspiring software developer with a
                strong foundation in modern JavaScript and web technologies. I
                focus on building scalable, user-centered applications with
                clean architecture, accessibility, and performance best
                practices.
              </p>
            </div>

            <div className="p-6 bg-primary/40 border border-accent/20 rounded-xl backdrop-blur-sm objective-card">
              <h3 className="text-xl font-bold text-accent mb-3">
                <i className="fas fa-bullseye mr-2"></i>Professional Objectives
              </h3>
              <ul className="space-y-3 text-textGray">
                <li className="flex items-start gap-3">
                  <span className="objective-dot"></span>
                  Deepen full-stack skills across React, Node.js, and databases
                  while applying clean code and system design principles.
                </li>
                <li className="flex items-start gap-3">
                  <span className="objective-dot"></span>
                  Build production-ready projects that solve real problems and
                  highlight performance, security, and UX.
                </li>
                <li className="flex items-start gap-3">
                  <span className="objective-dot"></span>
                  Collaborate effectively and keep learning modern tools,
                  testing practices, and deployment workflows.
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                <div className="text-2xl font-bold text-accent mb-1">3+</div>
                <div className="text-sm text-textGray">Projects Built</div>
              </div>
              <div className="stat-card p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                <div className="text-2xl font-bold text-accent mb-1">5+</div>
                <div className="text-sm text-textGray">Skills Mastered</div>
              </div>
              <div className="stat-card p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                <div className="text-2xl font-bold text-accent mb-1">4</div>
                <div className="text-sm text-textGray">Certifications</div>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slideInRight">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-accent">
                <i className="fas fa-graduation-cap mr-2"></i>Education
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/40 border-l-4 border-accent rounded hover:shadow-lg transition-all">
                  <h4 className="font-bold text-white">
                    B.Sc (Engg.) Computer Science & Engineering
                  </h4>
                  <p className="text-accent text-sm">
                    Metropolitan University, Sylhet
                  </p>
                  <p className="text-textGray text-sm">Jan 2023 – Dec 2026</p>
                </div>
                <div className="p-4 bg-primary/40 border-l-4 border-gray-500 rounded hover:shadow-lg transition-all">
                  <h4 className="font-bold text-white">
                    Higher Secondary Certificate
                  </h4>
                  <p className="text-accent text-sm">
                    Dhaka City College, Dhaka
                  </p>
                  <p className="text-textGray text-sm">GPA: 5.00/5.00</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-accent">
                <i className="fas fa-globe mr-2"></i>Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span
                    key={lang.name}
                    className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm border border-accent/30">
                    {lang.name} • {lang.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
