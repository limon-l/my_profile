import React from "react";
import RoundedCarousel from "./RoundedCarousel";

export default function HeroSection({ techIcons }) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-6 px-6 relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-10 items-center">
        <div className="hero-text animate-fadeInUp">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/30">
              <i className="fas fa-code mr-2"></i>Full Stack Developer
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Hi, I'm <span className="text-accent">Limon</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
            Building Modern Web Experiences
          </h2>
          <p className="text-textGray max-w-lg mb-8 text-lg leading-relaxed">
            Fourth-year CSE student focused on software development, with
            hands-on experience in React, Next.js, and Tailwind CSS. I build
            responsive, user-focused products with clean architecture,
            performance in mind, and attention to detail.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group cta-button px-8 py-3 bg-gradient-to-r from-accent via-blue-500 to-accent text-white font-bold rounded-full transition-all shadow-[0_6px_30px_rgba(56,189,248,0.25)] flex items-center gap-2">
              Get In Touch
              <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
            </a>

            {/* little sparkles */}
            <span
              className="sparkle"
              style={{ left: "20%", top: "18%" }}></span>
            <span
              className="sparkle"
              style={{
                left: "35%",
                top: "6%",
                width: 8,
                height: 8,
              }}></span>
            <span
              className="sparkle"
              style={{ left: "62%", top: "28%" }}></span>

            <div className="flex gap-4 items-center">
              <a
                href="https://github.com/limon-l"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://linkedin.com/in/limonroyapu"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a
                href="mailto:limonroyapu101@gmail.com"
                className="social-link w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-img flex justify-center animate-float">
          <div className="relative">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl blur-3xl animate-pulse"></div>

            {/* Rectangle SVG */}
            <svg
              className="rectriangle -left-10 -top-10"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <path
                d="M10 10 L90 25 L30 90 Z"
                fill="url(#g1)"
                stroke="#38bdf8"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
            </svg>

            {/* Image Container */}
            <div className="hero-portrait w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-visible border-2 border-accent/30 shadow-2xl relative z-10 bg-gradient-to-br from-accent/10 to-transparent p-0">
              <div className="orbit-ring"></div>
              <div className="orbit-dot orbit-dot-1"></div>
              <div className="orbit-dot orbit-dot-2"></div>
              <img
                src="/hero.jpeg"
                alt="hero profile"
                className="w-full h-full object-cover rounded-3xl relative z-20"
              />
              <div className="absolute bottom-0 left-0 w-full translate-y-1/2 flex justify-center z-30 pointer-events-auto">
                <RoundedCarousel items={techIcons} interval={1800} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
