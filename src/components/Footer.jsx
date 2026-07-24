import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-white/[0.05]">
      {/* Top glow line */}
      <div className="footer-glow" />

      <div className="container">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-1">
              <span className="text-lg font-extrabold tracking-wider text-gradient">LIMON</span>
              <span className="text-lg font-extrabold tracking-wider text-white/90">.DEV</span>
            </a>

            {/* Nav Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {["home", "about", "skills", "projects", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-sm text-textGray hover:text-accent transition-colors capitalize">
                  {item}
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/limon-l"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn !w-9 !h-9 !rounded-lg"
                aria-label="GitHub">
                <i className="fab fa-github text-sm"></i>
              </a>
              <a
                href="https://linkedin.com/in/limonroyapu"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-btn !w-9 !h-9 !rounded-lg"
                aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="mailto:limonroyapu101@gmail.com"
                className="social-link-btn !w-9 !h-9 !rounded-lg"
                aria-label="Email">
                <i className="fas fa-envelope text-sm"></i>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-textGray">
              <i className="fas fa-heart text-accent/50 mr-1.5"></i>
              Built with passion. &copy; {year} Limon Roy Apu. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-textGray">Available for opportunities</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Back to top */}
      <a
        href="#home"
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-accent hover:bg-accent/10 hover:border-accent/30 transition-all shadow-lg"
        aria-label="Back to top">
        <i className="fas fa-arrow-up text-sm"></i>
      </a>
    </footer>
  );
}
