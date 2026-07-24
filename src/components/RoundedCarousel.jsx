import React, { useState, useEffect } from "react";

export default function RoundedCarousel({ items = [], interval = 2000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = React.useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    if (trackRef.current) {
      const pills = trackRef.current.querySelectorAll(".carousel-pill");
      if (pills[activeIndex]) {
        const activePill = pills[activeIndex];
        const scrollLeft =
          activePill.offsetLeft -
          trackRef.current.clientWidth / 2 +
          activePill.clientWidth / 2;
        trackRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  return (
    <div className="rounded-carousel-wrapper">
      <div className="rounded-carousel-track" ref={trackRef}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`carousel-pill ${idx === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={item.name}>
            <i className={item.icon} style={{ color: item.color }}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`indicator-dot ${idx === activeIndex ? "active" : ""}`}
            aria-label={`Go to ${items[idx]?.name}`}
          />
        ))}
      </div>
    </div>
  );
}
