import React, { useEffect, useRef, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const visible = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const mouseDown = useRef(false);

  const createRipple = useCallback((x, y) => {
    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  const createTextParticle = useCallback((x, y) => {
    const symbols = ["$", "#", "{", "}", "<", "/>", "0", "1", "~", "=>"];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const el = document.createElement("span");
    el.textContent = symbol;
    Object.assign(el.style, {
      position: "fixed",
      left: `${x + (Math.random() - 0.5) * 50}px`,
      top: `${y - 15}px`,
      color: "var(--accent)",
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: "600",
      pointerEvents: "none",
      zIndex: "9997",
      opacity: "0.8",
      transform: `translate(-50%, 0)`,
      animation: "particle-drift 0.8s ease-out forwards",
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.innerWidth < 768) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let raf;

    function animate() {
      visible.current.x += (target.current.x - visible.current.x) * 0.2;
      visible.current.y += (target.current.y - visible.current.y) * 0.2;
      ringPos.current.x += (target.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (target.current.y - ringPos.current.y) * 0.08;

      const x = visible.current.x;
      const y = visible.current.y;
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;

      dot.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      ring.style.transform = `translate(${rx - (isHovering.current ? 28 : 16)}px, ${ry - (isHovering.current ? 28 : 16)}px)`;
      glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`;

      raf = requestAnimationFrame(animate);
    }

    function onMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    }

    function onOver(e) {
      const el = e.target.closest("a, button, [role='button'], .cursor-hover-target, input, textarea, select");
      if (el) {
        isHovering.current = true;
        document.body.classList.add("cursor-hover");
        dot.classList.add("hover");
        ring.classList.add("hover");
      }
      const codeEl = e.target.closest("pre, code, .terminal-body");
      if (codeEl && Math.random() > 0.8) {
        createTextParticle(e.clientX, e.clientY);
      }
    }

    function onOut(e) {
      const el = e.target.closest("a, button, [role='button'], .cursor-hover-target, input, textarea, select");
      if (el) {
        isHovering.current = false;
        document.body.classList.remove("cursor-hover");
        dot.classList.remove("hover");
        ring.classList.remove("hover");
      }
    }

    function onDown(e) {
      mouseDown.current = true;
      createRipple(e.clientX, e.clientY);
    }

    function onUp() {
      mouseDown.current = false;
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
  }, [createRipple, createTextParticle]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={glowRef} className="cursor-glow" />
    </>
  );
}
