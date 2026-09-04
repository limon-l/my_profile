import React, { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ExperienceSection({ journey }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label">
            <i className="fas fa-route text-[10px]" aria-hidden="true"></i>
            Experience
          </div>
          <h2 className="section-title">
            How I&apos;ve <span className="animated-gradient-text">Built Momentum</span>
          </h2>
          <p className="section-subtitle">
            A transparent record of my academic progress, focused learning, and shipped project work.
          </p>
        </ScrollReveal>

        <div className="experience-layout">
          <ScrollReveal className="experience-intro">
            <span className="experience-kicker">Academic &amp; project experience</span>
            <h3>Learning by building systems people can use.</h3>
            <p>
              I&apos;m completing my B.Sc. in Computer Science &amp; Engineering while turning coursework and
              focused study into full-stack products. Each project has helped me practice architecture,
              authentication, data modeling, and thoughtful interface design.
            </p>
            <a href="#projects" className="btn btn-secondary">
              See the project work
              <i className="fas fa-arrow-right text-xs" aria-hidden="true"></i>
            </a>
          </ScrollReveal>

          <div className="experience-timeline">
            {journey.map((item, index) => (
              <ScrollReveal key={`${item.year}-${item.title}`} delay={index * 70}>
                <article className="experience-item">
                  <div className="experience-marker" aria-hidden="true">
                    <i className={item.icon}></i>
                  </div>
                  <div className={`experience-item-content ${expandedIndex === index ? "expanded" : ""}`}>
                    <button
                      type="button"
                      className="experience-item-trigger"
                      onClick={() => setExpandedIndex((current) => current === index ? null : index)}
                      aria-expanded={expandedIndex === index}
                      aria-controls={`experience-detail-${index}`}>
                      <span className="experience-item-summary">
                        <span className="experience-item-meta">
                          <span>{item.year}</span>
                        </span>
                        <span className="experience-item-title">{item.title}</span>
                      </span>
                      <span className="experience-item-chevron" aria-hidden="true">
                        <i className="fas fa-chevron-down"></i>
                      </span>
                    </button>
                    {expandedIndex === index && (
                      <div id={`experience-detail-${index}`} className="experience-item-detail" role="region">
                        <p>{item.desc}</p>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
