import React, { useEffect, useState } from "react";

export default function RoundedCarousel({ items = [], interval = 2200 }) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const timer = setInterval(() => {
      setTrackIndex((current) => current + 1);
      setIsAnimating(true);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  if (!items.length) return null;

  const activeIndex = trackIndex % items.length;
  const carouselItems = [...items, ...items];

  return (
    <div className="tech-carousel" aria-label="Technologies used in my work">
      <span className="tech-carousel-kicker">Built with</span>
      <div className="tech-carousel-viewport">
        <div
          className="tech-carousel-track"
          style={{
            transform: `translateX(-${trackIndex * 100}%)`,
            transition: isAnimating ? "transform 520ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
          }}
          onTransitionEnd={() => {
            if (trackIndex >= items.length) {
              setIsAnimating(false);
              setTrackIndex(0);
            }
          }}>
          {carouselItems.map((item, index) => {
            const itemIndex = index % items.length;
            return (
              <button
                key={`${item.name}-${index}`}
                type="button"
                className="tech-carousel-badge"
                style={{ "--tech-color": item.color }}
                onClick={() => {
                  setIsAnimating(true);
                  setTrackIndex(itemIndex);
                }}
                aria-label={`Highlight ${item.name}`}
                aria-pressed={itemIndex === activeIndex}>
                <i className={item.icon} aria-hidden="true" />
                <strong>{item.name}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
