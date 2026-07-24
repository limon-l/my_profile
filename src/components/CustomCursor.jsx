import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const visible = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let raf;

    function animate() {
      visible.current.x += (target.current.x - visible.current.x) * 0.15;
      visible.current.y += (target.current.y - visible.current.y) * 0.15;

      const x = visible.current.x;
      const y = visible.current.y;

      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;

      raf = requestAnimationFrame(animate);
    }

    function onMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }

    function onOver(e) {
      const el = e.target.closest("a, button, [role='button'], .cursor-hover-target");
      if (el) {
        document.body.classList.add("cursor-hover");
      }
    }

    function onOut(e) {
      const el = e.target.closest("a, button, [role='button'], .cursor-hover-target");
      if (el) {
        document.body.classList.remove("cursor-hover");
      }
    }

    function onDown() {
      document.body.classList.add("cursor-click");
    }

    function onUp() {
      document.body.classList.remove("cursor-click");
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
