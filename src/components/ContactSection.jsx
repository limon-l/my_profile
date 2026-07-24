import React, { useRef, useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection({ formData, formStatus, handleFormChange, handleFormSubmit }) {
  const formRef = useRef(null);
  const [rateLimitWarning, setRateLimitWarning] = useState(false);
  const lastSubmitRef = useRef(0);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitRef.current < 30000) {
      setRateLimitWarning(true);
      setTimeout(() => setRateLimitWarning(false), 5000);
      return;
    }
    lastSubmitRef.current = now;
    handleFormSubmit(e);
  }, [handleFormSubmit]);

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent-soft)] rounded-full blur-[100px] pointer-events-none opacity-50" />

      <div className="container">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-envelope text-[10px]"></i>
            Contact
          </div>
          <h2 className="section-title">
            Let&apos;s Build <span className="animated-gradient-text">Together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Ready to collaborate? Let&apos;s create something extraordinary together.
            Reach out through your preferred channel.
          </p>
        </ScrollReveal>

        <div className="contact-grid max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                  <i className="fas fa-handshake text-base"></i>
                </span>
                Contact Info
              </h3>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-7">
                I&apos;m actively seeking new opportunities for full-time roles,
                freelance projects, and collaborations. Whether you have a
                question or just want to say hello, feel free to get in touch!
              </p>

              <div className="space-y-3">
                {[
                  { icon: "envelope", label: "Email", value: "limonroyapu101@gmail.com", link: "mailto:limonroyapu101@gmail.com" },
                  { icon: "phone", label: "Phone", value: "+8801991775927", link: "tel:+8801991775927" },
                  { icon: "map-marker-alt", label: "Location", value: "Sylhet, Bangladesh" },
                ].map((contact, idx) => {
                  const Tag = contact.link ? "a" : "div";
                  return (
                    <Tag key={idx} href={contact.link || undefined} className="block p-4 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)] hover:border-[var(--border-accent)] hover:bg-[rgba(0,225,255,0.02)] transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] shrink-0 border border-[var(--border-accent)]">
                          <i className={`fas fa-${contact.icon} text-sm`}></i>
                        </div>
                        <div>
                          <h4 className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-semibold mb-0.5">{contact.label}</h4>
                          <p className="text-sm text-white font-medium">{contact.value}</p>
                        </div>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              {/* Social */}
              <div className="mt-7 pt-6 border-t border-[var(--border-subtle)]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 font-semibold">Connect With Me</p>
                <div className="flex gap-2">
                  {[
                    { href: "https://github.com/limon-l", icon: "fab fa-github", label: "GitHub" },
                    { href: "https://linkedin.com/in/limonroyapu", icon: "fab fa-linkedin-in", label: "LinkedIn" },
                    { href: "mailto:limonroyapu101@gmail.com", icon: "fas fa-envelope", label: "Email" },
                  ].map((social) => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-secondary" aria-label={social.label}>
                      <i className={`${social.icon} text-sm`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/15 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs text-emerald-300 font-medium">Typically responds within 24 hours</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200} animation="reveal-right">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)]">
                  <i className="fas fa-paper-plane text-base"></i>
                </span>
                Send a Message
              </h3>

              <form ref={formRef} onSubmit={onSubmit} className="space-y-4" noValidate>
                {/* Honeypot */}
                <div className="absolute opacity-0 h-0 overflow-hidden" tabIndex="-1" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input type="text" name="website" id="website" tabIndex="-1" autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder=" " required aria-label="Full Name" className="form-input" />
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-[0.05em]">Full Name</label>
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder=" " required aria-label="Email Address" className="form-input" />
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-[0.05em]">Email Address</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <input type="text" name="company" value={formData.company || ""} onChange={handleFormChange} placeholder=" " aria-label="Company" className="form-input" />
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-[0.05em]">Company</label>
                  </div>
                  <div className="form-group">
                    <input type="text" name="country" value={formData.country || ""} onChange={handleFormChange} placeholder=" " aria-label="Country" className="form-input" />
                    <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-[0.05em]">Country</label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <select name="budget" value={formData.budget || ""} onChange={handleFormChange} className="form-input" aria-label="Budget Range">
                      <option value="">Select budget...</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-3000">$1,000 – $3,000</option>
                      <option value="3000-5000">$3,000 – $5,000</option>
                      <option value="5000+">$5,000+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <select name="projectType" value={formData.projectType || ""} onChange={handleFormChange} className="form-input" aria-label="Project Type">
                      <option value="">Select type...</option>
                      <option value="fullstack">Full Stack Web App</option>
                      <option value="frontend">Frontend / UI</option>
                      <option value="backend">Backend / API</option>
                      <option value="mobile">Mobile App</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <select name="timeline" value={formData.timeline || ""} onChange={handleFormChange} className="form-input" aria-label="Project Timeline">
                    <option value="">Expected timeline...</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2-weeks">1 – 2 Weeks</option>
                    <option value="1-month">~1 Month</option>
                    <option value="2-3-months">2 – 3 Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea name="message" value={formData.message} onChange={handleFormChange} rows="5" placeholder=" " required aria-label="Message" className="form-input resize-none min-h-[140px]" />
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-[0.05em]">Your Message</label>
                </div>

                {/* File attachment */}
                <div className="form-group">
                  <label className="block text-xs text-[var(--text-muted)] mb-2 font-medium">
                    <i className="fas fa-paperclip mr-1.5 text-[var(--accent)] opacity-50"></i>
                    Attachment (optional)
                  </label>
                  <input type="file" name="attachment" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" aria-label="Attach a file" className="block w-full text-sm text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent-soft)] file:text-[var(--accent)] hover:file:bg-[var(--accent)]/20 file:cursor-pointer" />
                  <p className="text-[10px] text-[var(--text-muted)] opacity-60 mt-1">PDF, DOC, TXT, PNG, JPG (max 5MB)</p>
                </div>

                {/* Rate limit warning */}
                {rateLimitWarning && (
                  <div className="p-3 bg-amber-500/[0.08] border border-amber-500/20 rounded-xl flex items-center gap-3">
                    <i className="fas fa-clock text-amber-400"></i>
                    <span className="text-amber-300 text-xs font-medium">Please wait 30 seconds between submissions.</span>
                  </div>
                )}

                {/* Status */}
                {formStatus === "success" && (
                  <div className="p-4 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-scale-in">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    <span className="text-emerald-300 text-sm font-medium">Message sent successfully! I&apos;ll get back to you soon.</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 bg-red-500/[0.08] border border-red-500/20 rounded-xl flex items-center gap-3 animate-scale-in">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                    <span className="text-red-300 text-sm font-medium">Oops! Something went wrong. Please try again.</span>
                  </div>
                )}

                <button type="submit" disabled={formStatus === "sending"} className="btn btn-primary w-full justify-center !text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === "sending" ? (
                    <><i className="fas fa-spinner animate-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
              </form>

              <p className="text-xs text-[var(--text-muted)] text-center mt-4">
                <i className="fas fa-lock text-[var(--accent)] opacity-40 mr-1"></i>
                Your data is encrypted. No spam, ever.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
