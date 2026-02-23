import React, { useState, useEffect } from "react";

export default function RoundedCarousel({ items = [], interval = 1500 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = React.useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    // Scroll the track to show the active pill
    if (trackRef.current) {
      const track = trackRef.current;
      const pills = track.querySelectorAll(".carousel-pill");

      if (pills[activeIndex]) {
        const activePill = pills[activeIndex];
        const trackRect = track.getBoundingClientRect();
        const pillRect = activePill.getBoundingClientRect();

        // Calculate scroll position to center the active pill
        const scrollLeft =
          activePill.offsetLeft -
          track.clientWidth / 2 +
          activePill.clientWidth / 2;

        track.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
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
            onClick={() => setActiveIndex(idx)}>
            <i className={`${item.icon}`} style={{ color: item.color }}></i>
            <span className="pill-label">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="carousel-indicators">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`indicator-dot ${idx === activeIndex ? "active" : ""}`}
            aria-label={`Go to item ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
