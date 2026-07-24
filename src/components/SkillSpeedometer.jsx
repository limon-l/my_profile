import React, { useId } from "react";

export default function SkillSpeedometer({ skill, getProficiencyLabel }) {
  const id = useId();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (skill.level / 100) * circumference;
  const gradientId = `skillGrad-${id}`;

  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(0,225,255,0.06)" strokeWidth="4" />
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-[1.2s]"
            style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e1ff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
          <i className={`${skill.icon} text-2xl md:text-3xl text-[var(--accent)]`} aria-hidden="true"></i>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-bold text-[var(--accent)] text-center px-1 leading-tight">{skill.name}</span>
          <p className="text-xs font-bold text-[var(--accent)] mt-0.5">{skill.level}%</p>
          <p className="text-[9px] text-[var(--accent)] opacity-60">{getProficiencyLabel(skill.level)}</p>
        </div>
      </div>
    </div>
  );
}
