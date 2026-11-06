import React, { useRef, useState } from "react";
import { Icon, Link } from "./ui";

export default function AtelierContact() {
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);
  const lastSubmit = useRef(0);
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (Date.now() - lastSubmit.current < 30000) {
      setStatus("rate-limited");
      return;
    }
    lastSubmit.current = Date.now();
    setStatus("sending");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(
        import.meta.env.VITE_CONTACT_ENDPOINT ||
          "https://formspree.io/f/myzlybdj",
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
          signal: controller.signal,
        },
      );
      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      lastSubmit.current = 0;
    } finally {
      clearTimeout(timer);
    }
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText("limonroyapu101@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div>
          <p className="eyebrow">06 / START A CONVERSATION</p>
          <h2>
            Interesting problem?
            <br />
            <span className="serif-word">Let’s think it through.</span>
          </h2>
          <p className="contact-intro">
            A software idea, a research question, or an opportunity to learn
            together. I’d like to hear about it.
          </p>
          <div className="email-line">
            <Link href="mailto:limonroyapu101@gmail.com">
              limonroyapu101@gmail.com <Icon size={18} />
            </Link>
            <button
              className="icon-button"
              onClick={copy}
              aria-label="Copy email address"
            >
              <Icon name={copied ? "check" : "copy"} size={16} />
            </button>
          </div>
          <span className="copy-status" role="status">
            {copied ? "Email address copied." : ""}
          </span>
          <div className="contact-socials">
            <Link href="https://github.com/limon-l">
              GitHub <Icon size={15} />
            </Link>
            <Link href="https://www.linkedin.com/in/limonroyapu/">
              LinkedIn <Icon size={15} />
            </Link>
            <span>
              <span className="status-dot" /> Bangladesh
            </span>
          </div>
        </div>
        <form className="contact-form surface" onSubmit={submit}>
          <div className="form-heading">
            <span className="mono">A NOTE TO LIMON</span>
            <Icon name="mail" size={18} />
          </div>
          <div className="form-row">
            <label>
              Your name
              <input
                required
                autoComplete="name"
                name="name"
                maxLength="100"
                placeholder="How should I call you?"
              />
            </label>
            <label>
              Email address
              <input
                required
                autoComplete="email"
                type="email"
                name="email"
                maxLength="254"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label>
            What’s on your mind?
            <textarea
              required
              name="message"
              rows="4"
              minLength="10"
              maxLength="5000"
              placeholder="A little context goes a long way…"
            />
          </label>
          <div className="honeypot" aria-hidden="true">
            <label>
              Leave this field empty
              <input name="website" tabIndex="-1" autoComplete="off" />
            </label>
          </div>
          <div className="form-submit-row">
            <p>
              Sent via Formspree.
              <br />
              Prefer your inbox?{" "}
              <Link href="mailto:limonroyapu101@gmail.com">
                Email me directly.
              </Link>
            </p>
            <button
              type="submit"
              className="button button-primary"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send a note"}
              <Icon name="arrow-right" size={17} />
            </button>
          </div>
          <p
            className={`form-status status-${status}`}
            role="status"
            aria-live="polite"
          >
            {status === "success"
              ? "Thank you. Your message was accepted by the form service."
              : status === "error"
                ? "Your message could not be sent. Please try again or email me directly."
                : status === "rate-limited"
                  ? "Please wait 30 seconds before sending another note."
                  : ""}
          </p>
        </form>
      </div>
    </section>
  );
}
