import React from "react";
import ScrollReveal from "./ScrollReveal";

export default function ContactSection({
  formData,
  formStatus,
  handleFormChange,
  handleFormSubmit,
}) {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container">
        <ScrollReveal className="text-center mb-16">
          <div className="section-label inline-flex mx-auto mb-4">
            <i className="fas fa-envelope text-[0.6rem]"></i>
            Contact
          </div>
          <h2 className="section-title mb-4">
            Let&apos;s Build <span className="text-gradient">Together</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Ready to collaborate? Let&apos;s create something extraordinary together.
            Reach out through your preferred channel.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-8 h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <i className="fas fa-handshake text-base"></i>
                </span>
                Contact Info
              </h3>

              <p className="text-textGray text-sm leading-relaxed mb-7">
                I&apos;m actively seeking new opportunities for full-time roles,
                freelance projects, and collaborations. Whether you have a
                question or just want to say hello, feel free to get in touch!
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: "envelope",
                    label: "Email",
                    value: "limonroyapu101@gmail.com",
                    link: "mailto:limonroyapu101@gmail.com",
                  },
                  {
                    icon: "phone",
                    label: "Phone",
                    value: "+8801991775927",
                    link: "tel:+8801991775927",
                  },
                  {
                    icon: "map-marker-alt",
                    label: "Location",
                    value: "Sylhet, Bangladesh",
                  },
                ].map((contact, idx) => {
                  const Tag = contact.link ? "a" : "div";
                  return (
                    <Tag
                      key={idx}
                      href={contact.link || undefined}
                      className="contact-item flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-accent/20 hover:bg-accent/[0.03]">
                      <div className="w-11 h-11 rounded-xl bg-accent/[0.08] flex items-center justify-center text-accent shrink-0 border border-accent/15">
                        <i className={`fas fa-${contact.icon} text-sm`}></i>
                      </div>
                      <div>
                        <h4 className="text-[0.65rem] uppercase tracking-[0.15em] text-textGray font-semibold mb-0.5">
                          {contact.label}
                        </h4>
                        <p className="text-sm text-white font-medium">
                          {contact.value}
                        </p>
                      </div>
                    </Tag>
                  );
                })}
              </div>

              {/* Social */}
              <div className="mt-7 pt-6 border-t border-white/[0.05]">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-textGray mb-3 font-semibold">
                  Connect With Me
                </p>
                <div className="flex gap-2">
                  {[
                    { href: "https://github.com/limon-l", icon: "fab fa-github", label: "GitHub" },
                    { href: "https://linkedin.com/in/limonroyapu", icon: "fab fa-linkedin-in", label: "LinkedIn" },
                    { href: "mailto:limonroyapu101@gmail.com", icon: "fas fa-envelope", label: "Email" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link-btn !w-10 !h-10 !rounded-xl"
                      aria-label={social.label}>
                      <i className={`${social.icon} text-sm`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200} animation="reveal-right">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <i className="fas fa-paper-plane text-base"></i>
                </span>
                Send a Message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder=" "
                    required
                    aria-label="Full Name"
                  />
                  <label>Full Name</label>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder=" "
                    required
                    aria-label="Email Address"
                  />
                  <label>Email Address</label>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="5"
                    placeholder=" "
                    required
                    aria-label="Message"
                    className="resize-none"
                  />
                  <label>Your Message</label>
                </div>

                {/* Status */}
                {formStatus === "success" && (
                  <div className="p-4 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-scale-in">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    <span className="text-emerald-300 text-sm font-medium">
                      Message sent successfully! I&apos;ll get back to you soon.
                    </span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 bg-red-500/[0.08] border border-red-500/20 rounded-xl flex items-center gap-3 animate-scale-in">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                    <span className="text-red-300 text-sm font-medium">
                      Oops! Something went wrong. Please try again.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="btn-primary w-full justify-center !text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                  {formStatus === "sending" ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-textGray text-center mt-4">
                I typically respond within 24 hours
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
