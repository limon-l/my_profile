import React, { useRef, useEffect } from "react";

export default function ScrollReveal({
  children,
  className = "",
  animation = "reveal",
  delay = 0,
  threshold = 0.15,
  stagger = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealTimer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => {
      clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`${animation} ${stagger ? "stagger" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
