import React from "react";

export function Icon({ name = "arrow-up-right", size = 20, ...props }) {
  const paths = {
    "arrow-up-right": (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    "arrow-right": (
      <>
        <path d="M4 12h16m-6-6 6 6-6 6" />
      </>
    ),
    "arrow-left": (
      <>
        <path d="M20 12H4m6-6-6 6 6 6" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    moon: <path d="M20 14a8 8 0 0 1-10-10A8.5 8.5 0 1 0 20 14Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    code: (
      <>
        <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-1.5-.5-2 3-.3 6-1.5 6-6a4.6 4.6 0 0 0-1.2-3.2c.1-1 .1-2.1-.3-3.1 0 0-1.1-.3-3.4 1.2a12 12 0 0 0-6.2 0C7.1 3.4 6 3.7 6 3.7c-.4 1-.4 2.1-.3 3.1A4.6 4.6 0 0 0 4.5 10c0 4.5 3 5.7 6 6-.6.5-.6 1.1-.5 2v4" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7m0-10v.01M11 17v-7m0 3c0-4 6-4 6 0v4" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    spark: (
      <path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7Z" />
    ),
    check: <path d="m5 12 4 4L19 6" />,
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths["arrow-up-right"]}
    </svg>
  );
}

export function Link({ href, children, onClick, ...props }) {
  const external = /^(https?:|mailto:|tel:)/.test(href || "");
  return (
    <a
      href={href}
      {...(external && href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          external ||
          !href?.startsWith("/") ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        if (window.location.pathname + window.location.hash !== href) {
          window.history.pushState({}, "", href);
          window.dispatchEvent(new PopStateEvent("popstate"));
        } else if (href.includes("#"))
          document.getElementById(href.split("#")[1])?.scrollIntoView();
      }}
    >
      {children}
    </a>
  );
}

const evidenceNames = {
  verified: "Source verified",
  "self-reported": "Self-reported",
  interest: "Interest",
  planned: "Planned",
  unverified: "Unverified",
};
export function EvidenceLabel({ status = "verified", children }) {
  return (
    <span className={`evidence-label evidence-${status}`}>
      <span aria-hidden="true" />
      {children || evidenceNames[status] || status}
    </span>
  );
}
export function SectionHeading({ eyebrow, title, description, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {children}
    </div>
  );
}
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  return href ? (
    <Link
      href={href}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <button className={`button button-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
export function Surface({ as: Tag = "div", className = "", ...props }) {
  return <Tag className={`surface ${className}`} {...props} />;
}
export function CodeBlock({ children, language = "text" }) {
  const parts =
    language === "JavaScript"
      ? String(children).split(
          /(\/\/[^\n]*|"[^"\n]*"|\b(?:const|let|export|return)\b)/g,
        )
      : [children];
  return (
    <div className="code-block">
      <span className="mono">{language}</span>
      <pre tabIndex="0" aria-label={`${language} code example`}>
        <code>
          {parts.map((part, index) => (
            <span
              key={index}
              className={
                part.startsWith("//")
                  ? "syntax-comment"
                  : part.startsWith('"')
                    ? "syntax-string"
                    : /^(const|let|export|return)$/.test(part)
                      ? "syntax-keyword"
                      : undefined
              }
            >
              {part}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
