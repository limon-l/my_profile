import React, { useState, useEffect, useRef, useCallback } from "react";
import RoundedCarousel from "./RoundedCarousel";
import ScrollReveal from "./ScrollReveal";

const TYPED_ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "UI Engineer",
  "Software Architect",
  "Problem Solver",
];

const GREETINGS = [
  "Hello", "Bonjour", "Hola", "Namaste", "Salaam", "Olá", "Merhaba", "Konnichiwa",
];

function useAnimatedCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!started) return;
    let start = null;
    let raf;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [count, ref];
}

function StatCounter({ value, suffix, label, delay }) {
  const [count, ref] = useAnimatedCounter(value, 2200);
  return (
    <div ref={ref} className="hero-stat" style={{ transitionDelay: `${delay}ms` }}>
      <div className="hero-stat-value">
        {count}{suffix}
      </div>
      <div className="hero-stat-label">{label}</div>
    </div>
  );
}

export default function HeroSection({ techIcons, stats }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [greeting, setGreeting] = useState("Hello");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRole = TYPED_ROLES[roleIndex];
    let timeout;
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % GREETINGS.length;
      setGreeting(GREETINGS[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  }, []);

  const defaultStats = stats || [
    { value: 4, suffix: "+", label: "Projects Built" },
    { value: 15, suffix: "+", label: "Skills Mastered" },
    { value: 4, suffix: "", label: "Certifications" },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero"
      onMouseMove={handleMouseMove}>
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6 relative z-10">
          <ScrollReveal delay={100}>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Available for work
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="text-accent font-mono text-sm tracking-wide">
              {greeting}, world<span className="text-white/30"> // {greeting.toLowerCase()}</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="hero-name">
              Hi, I&apos;m{" "}
              <span className="animated-gradient-text">Limon</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-bold text-white/80 font-mono">{displayText}</span>
              <span className="typed-cursor" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={500}>
            <p className="text-[var(--text-secondary)] max-w-lg text-[0.95rem] leading-relaxed">
              Fourth-year CSE student focused on software development, with
              hands-on experience in React, Next.js, and Tailwind CSS. I build
              responsive, user-focused products with clean architecture,
              performance in mind, and attention to detail.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={600}>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">
                Get In Touch
                <i className="fas fa-arrow-right text-sm"></i>
              </a>
              <a href="#projects" className="btn btn-secondary">
                <i className="fas fa-eye text-sm"></i>
                View Projects
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={650}>
            <div className="flex items-center gap-3">
              <kbd className="px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">⌘K</kbd>
              <span className="text-[var(--text-muted)] text-xs">Command Palette</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={700}>
            <div className="hero-social">
              {[
                { href: "https://github.com/limon-l", icon: "fab fa-github", label: "GitHub" },
                { href: "https://linkedin.com/in/limonroyapu", icon: "fab fa-linkedin-in", label: "LinkedIn" },
                { href: "mailto:limonroyapu101@gmail.com", icon: "fas fa-envelope", label: "Email" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={750}>
            <div className="hero-stats">
              {defaultStats.map((stat, i) => (
                <StatCounter key={stat.label} {...stat} delay={i * 100} />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Right Visual */}
        <ScrollReveal animation="reveal-scale" delay={300} className="flex justify-center">
          <div className="hero-visual" style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
            transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {/* Animated blobs */}
            <div className="hero-blob hero-blob-1" />
            <div className="hero-blob hero-blob-2" />
            <div className="hero-blob hero-blob-3" />

            {/* Orbit ring */}
            <div className="hero-orbit" style={{ position: 'absolute', inset: '20px' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" />
            </div>

            {/* Portrait */}
            <div className="absolute inset-[40px] rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl bg-gradient-to-br from-[rgba(0,225,255,0.05)] to-transparent"
              style={{
                transform: `translate(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px)`,
                transition: "transform 0.4s ease",
              }}>
              <img
                src="/hero.jpeg"
                alt="Limon Roy Apu — Full Stack Developer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-40" />
            </div>

            {/* Tech carousel at bottom */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
              <RoundedCarousel items={techIcons} interval={2200} />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-30">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Scroll</span>
        <i className="fas fa-chevron-down text-[var(--accent)] text-xs"></i>
      </div>
    </section>
  );
}
