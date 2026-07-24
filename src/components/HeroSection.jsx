import React, { useState, useEffect } from "react";
import RoundedCarousel from "./RoundedCarousel";
import ScrollReveal from "./ScrollReveal";

const TYPED_ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "UI Engineer",
  "Software Architect",
  "Problem Solver",
];

export default function HeroSection({ techIcons }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = TYPED_ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentRole.substring(0, displayText.length - 1)
              : currentRole.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — Text Content */}
        <div className="space-y-6">
          <ScrollReveal delay={100}>
            <div className="hero-badge">
              <span className="status-dot"></span>
              Available for work
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="hero-name">
              Hi, I&apos;m{" "}
              <span className="accent">Limon</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="typewriter-wrapper">
              <span className="typewriter-text">{displayText}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <p className="text-textGray max-w-lg text-[0.95rem] leading-relaxed">
              Fourth-year CSE student focused on software development, with
              hands-on experience in React, Next.js, and Tailwind CSS. I build
              responsive, user-focused products with clean architecture,
              performance in mind, and attention to detail.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="btn-primary">
                Get In Touch
                <i className="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
              </a>
              <a href="#projects" className="btn-secondary">
                <i className="fas fa-eye text-sm"></i>
                View Projects
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={700}>
            <div className="flex items-center gap-3 pt-4">
              <a
                href="https://github.com/limon-l"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn"
                aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://linkedin.com/in/limonroyapu"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn"
                aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="mailto:limonroyapu101@gmail.com"
                className="social-link-btn"
                aria-label="Email">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — Portrait */}
        <ScrollReveal animation="reveal-scale" delay={300} className="flex justify-center">
          <div className="relative">
            {/* Glow bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/15 via-transparent to-indigo-500/10 rounded-3xl blur-3xl animate-pulse-soft" />

            {/* Rectangle SVG */}
            <svg
              className="rectriangle -left-10 -top-10"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <defs>
                <linearGradient id="heroGrad" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.04" />
                </linearGradient>
              </defs>
              <path
                d="M10 10 L90 25 L30 90 Z"
                fill="url(#heroGrad)"
                stroke="#38bdf8"
                strokeOpacity="0.1"
                strokeWidth="0.8"
              />
            </svg>

            {/* Portrait Container */}
            <div className="hero-portrait w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-visible border border-white/10 shadow-2xl relative z-10 bg-gradient-to-br from-accent/8 to-transparent">
              <div className="orbit-ring"></div>
              <div className="orbit-dot orbit-dot-1"></div>
              <div className="orbit-dot orbit-dot-2"></div>
              <img
                src="/hero.jpeg"
                alt="Limon Roy Apu — Full Stack Developer"
                className="w-full h-full object-cover rounded-3xl relative z-20"
                loading="eager"
              />
              <div className="absolute bottom-0 left-0 w-full translate-y-1/2 flex justify-center z-30 pointer-events-auto">
                <RoundedCarousel items={techIcons} interval={2200} />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-textGray">Scroll</span>
        <i className="fas fa-chevron-down text-accent text-xs"></i>
      </div>
    </section>
  );
}
