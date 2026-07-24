import React, { useState, useEffect, useRef } from "react";

export default function RoundedCarousel({ items = [], interval = 2000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

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
        const scrollLeft = activePill.offsetLeft - trackRef.current.clientWidth / 2 + activePill.clientWidth / 2;
        trackRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeIndex]);

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`carousel-pill flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-300 text-xs font-medium whitespace-nowrap ${
              idx === activeIndex
                ? "bg-[var(--accent-soft)] border-[var(--border-accent)] text-[var(--accent)] shadow-[0_0_12px_rgba(0,225,255,0.15)]"
                : "bg-[var(--surface-2)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]"
            }`}
            onClick={() => setActiveIndex(idx)}
            role="button"
            tabIndex={0}
            aria-label={item.name}>
            <i className={item.icon} style={{ color: idx === activeIndex ? item.color : undefined }}></i>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1 mt-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "bg-[var(--accent)] w-4" : "bg-[var(--surface-3)]"
            }`}
            aria-label={`Go to ${items[idx]?.name}`}
          />
        ))}
      </div>
    </div>
  );
}
