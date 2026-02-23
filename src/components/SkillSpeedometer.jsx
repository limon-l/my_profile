import React from "react";

export default function SkillSpeedometer({ skill, getProficiencyLabel }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="skill-speedometer-circle"
            style={{
              transition:
                "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
          <defs>
            <linearGradient
              id="skillGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center icon - shown by default */}
        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
          <i className={`${skill.icon} text-4xl text-accent`} aria-hidden></i>
        </div>
        {/* Center info - hidden by default, shown on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-bold text-accent text-center px-2 leading-tight">
            {skill.name}
          </span>
          <p className="text-sm font-semibold text-accent mt-1">
            {skill.level}%
          </p>
          <p className="text-xs text-accent/70">
            {getProficiencyLabel(skill.level)}
          </p>
        </div>
      </div>
    </div>
  );
}
