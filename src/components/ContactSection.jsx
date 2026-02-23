import React from "react";

export default function ContactSection({
  formData,
  formStatus,
  handleFormChange,
  handleFormSubmit,
}) {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      <div className="container">
        <h2 className="section-title text-5xl font-bold text-center mb-4 animate-slideUp">
          <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent">
            Get In Touch
          </span>
        </h2>
        <p
          className="text-center text-textGray mb-16 text-lg max-w-2xl mx-auto animate-slideUp"
          style={{ animationDelay: "100ms" }}>
          Ready to collaborate? Let's create something extraordinary together.
          Reach out through your preferred channel.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="space-y-5 animate-slideInLeft">
            <div className="h-full p-8 bg-gradient-to-br from-primary/60 to-secondary/40 border border-accent/20 rounded-2xl backdrop-blur-md hover:border-accent/40 transition-all">
              <h3 className="text-2xl font-bold mb-8 text-accent flex items-center gap-3">
                <i className="fas fa-handshake text-3xl"></i>Contact Info
              </h3>

              <div className="space-y-6">
                <p className="text-textGray text-base leading-relaxed">
                  I'm actively seeking new opportunities for full-time roles,
                  freelance projects, and collaborations. Whether you have a
                  question or just want to say hello, feel free to get in touch!
                </p>

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
                ].map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.link || "#"}
                    className="contact-item group flex items-start gap-4 p-4 rounded-xl bg-primary/30 border border-accent/10 hover:border-accent/40 hover:bg-accent/5 transition-all hover:translate-x-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-blue-500/10 rounded-xl flex items-center justify-center text-accent text-xl border border-accent/30 group-hover:border-accent/60 transition-all flex-shrink-0 mt-1">
                      <i className={`fas fa-${contact.icon}`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">
                        {contact.label}
                      </h4>
                      <p className="text-accent text-base font-medium group-hover:text-blue-300 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-accent/10">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                  Connect With Me
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/limon-l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                    <i className="fab fa-github text-lg"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/limonroyapu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a
                    href="mailto:limonroyapu101@gmail.com"
                    className="social-link w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                    <i className="fas fa-envelope text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="animate-slideInRight">
            <div className="p-8 bg-gradient-to-br from-primary/60 to-secondary/40 border border-accent/20 rounded-2xl backdrop-blur-md hover:border-accent/30 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                <i className="fas fa-paper-plane text-accent"></i>Send a Message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    required
                    className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    rows="5"
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500 resize-none"></textarea>
                </div>

                {/* Status Messages */}
                {formStatus === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                    <i className="fas fa-check-circle text-green-500"></i>
                    <span className="text-green-300 font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                    <span className="text-red-300 font-medium">
                      Oops! Something went wrong. Please try again.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-3 px-6 bg-gradient-to-r from-accent via-blue-500 to-accent text-primary font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {formStatus === "sending" ? (
                    <>
                      <i className="fas fa-spinner animate-spin"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-send"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                I typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
