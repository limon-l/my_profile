import React, { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection({ testimonials }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const renderStars = (count) =>
    Array.from({ length: count }, (_, i) => (
      <i key={i} className="fas fa-star text-amber-400 text-xs"></i>
    ));

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-soft)] rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-quote-right text-[10px]"></i>
            Testimonials
          </div>
          <h2 className="section-title">
            What People <span className="animated-gradient-text">Say</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Feedback from collaborators, mentors, and clients I&apos;ve had the pleasure of working with.
          </p>
        </ScrollReveal>

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>

          <div className="relative overflow-hidden">
            <div className="testimonials-track" style={{ transform: `translateX(-${active * 100}%)`, transition: 'transform 0.6s var(--ease-out)' }}>
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-slide flex-shrink-0 w-full px-2">
                  <div className="glass-card p-8 md:p-10 text-center relative overflow-hidden">
                    {/* Background quote */}
                    <div className="absolute top-6 left-8 text-[var(--accent)] opacity-5">
                      <i className="fas fa-quote-left text-6xl"></i>
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.02)] to-transparent animate-shimmer" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center gap-1 mb-5">{renderStars(t.rating)}</div>
                      <p className="text-[var(--text-secondary)] text-[0.95rem] leading-relaxed mb-8 italic">
                        &ldquo;{t.text}&rdquo;
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-soft)] to-[rgba(124,58,237,0.12)] border border-[var(--border-accent)] flex items-center justify-center text-[var(--accent)] font-bold text-sm">
                          {t.avatar}
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-bold text-sm">{t.name}</h4>
                          <p className="text-[var(--accent)] text-xs font-medium">{t.role}</p>
                          <p className="text-[var(--text-muted)] text-[11px]">{t.relation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="testimonials-controls">
            <button onClick={prev} className="btn btn-icon btn-secondary" aria-label="Previous testimonial">
              <i className="fas fa-chevron-left text-xs"></i>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`testimonials-dot ${idx === active ? "active" : ""}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button onClick={next} className="btn btn-icon btn-secondary" aria-label="Next testimonial">
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
