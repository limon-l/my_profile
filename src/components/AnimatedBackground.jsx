import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
      <div
        className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,225,255,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-48 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="ambient-orb ambient-orb-one" />
      <div className="ambient-orb ambient-orb-two" />
      <div className="ambient-ring ambient-ring-one" />
      <div className="ambient-ring ambient-ring-two" />
      <div className="ambient-scanline" />
    </div>
  );
}
