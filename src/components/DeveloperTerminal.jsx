import React, { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const BOOT_SEQUENCE = [
  { delay: 0, text: "~ limon@portfolio ~ %", color: "text-[var(--accent)]", prefix: "" },
  { delay: 200, text: "System initialized.", color: "text-emerald-400", prefix: "  ✓ " },
  { delay: 400, text: "Loading modules...", color: "text-[var(--text-muted)]", prefix: "" },
  { delay: 700, text: "React.js ........................... LOADED", color: "text-blue-400", prefix: "  " },
  { delay: 900, text: "Next.js ......................... LOADED", color: "text-blue-400", prefix: "  " },
  { delay: 1100, text: "Node.js ........................... LOADED", color: "text-emerald-400", prefix: "  " },
  { delay: 1300, text: "Tailwind CSS ................... LOADED", color: "text-sky-400", prefix: "  " },
  { delay: 1500, text: "MongoDB ......................... LOADED", color: "text-green-400", prefix: "  " },
  { delay: 1800, text: "All systems operational.", color: "text-emerald-400", prefix: "  ✓ " },
  { delay: 2100, text: "", color: "", prefix: "" },
  { delay: 2200, text: "Welcome to limon.dev terminal v2.0", color: "text-amber-400", prefix: "  → " },
  { delay: 2500, text: 'Type "help" for available commands.', color: "text-[var(--text-muted)]", prefix: "  " },
];

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  help      — Show this message",
    "  skills    — List technical skills",
    "  projects  — Show built projects",
    "  stats     — Show developer stats",
    "  contact   — Show contact info",
    "  whoami    — Show developer info",
    "  clear     — Clear terminal",
    "  github    — Open GitHub profile",
  ],
  skills: () => [
    "Frontend: React.js, Next.js, Tailwind CSS, Bootstrap, JavaScript ES6+",
    "Backend:  Node.js, Express.js, MongoDB, Firebase, REST APIs",
    "Tools:    GitHub, VS Code, Figma, Vercel, Netlify",
    "Languages: C, C++, Java, Python",
  ],
  projects: () => [
    "┌─────────────────────────────────────────────┐",
    "│ Wanderlust  — Travel Booking Platform        │",
    "│ FinEase     — Personal Finance App           │",
    "│ GameHub     — Online Game Library            │",
    "│ BookCourier — Library Management System      │",
    "└─────────────────────────────────────────────┘",
  ],
  stats: () => [
    "Projects Built:   4+",
    "Skills Mastered:  15+",
    "Certifications:   4",
    "Focus:            Building useful web products",
  ],
  contact: () => [
    "Email:    limonroyapu101@gmail.com",
    "Phone:    +8801991775927",
    "GitHub:   github.com/limon-l",
    "LinkedIn: linkedin.com/in/limonroyapu",
    "Location: Sylhet, Bangladesh",
  ],
  whoami: () => [
    "Limon Roy Apu",
    "Full Stack Developer",
    "B.Sc (Engg.) CSE — Metropolitan University",
    "Specializing in React, Next.js, and modern web tech",
  ],
  github: () => {
    window.open("https://github.com/limon-l", "_blank");
    return ["Opening GitHub profile..."];
  },
  clear: () => "CLEAR",
};

export default function DeveloperTerminal() {
  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [outputLines, setOutputLines] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timers = [];
    BOOT_SEQUENCE.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (i === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setBooted(true), 300);
        }
      }, line.delay);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, outputLines, booted]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    setInputVal("");
    setOutputLines(prev => [...prev, { prompt: "~ limon@portfolio ~ %", text: inputVal }]);
    if (cmd === "clear") { setOutputLines([]); return; }
    const handler = COMMANDS[cmd];
    if (handler) {
      const result = handler();
      if (Array.isArray(result)) {
        setOutputLines(prev => [...prev, ...result.map(text => ({ text, isOutput: true }))]);
      }
    } else if (cmd) {
      setOutputLines(prev => [...prev, { text: `command not found: ${cmd}`, isError: true }]);
    }
  }

  return (
    <section id="terminal" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="container max-w-3xl">
        <ScrollReveal className="section-header">
          <div className="section-label mx-auto">
            <i className="fas fa-terminal text-[10px]"></i>
            Terminal
          </div>
          <h2 className="section-title">
            Developer <span className="animated-gradient-text">Console</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore my portfolio through the terminal. Try typing a command.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="terminal">
            <div className="terminal-header">
              <div className="flex items-center gap-2">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <span className="terminal-title">limon@portfolio ~ zsh</span>
            </div>

            <div ref={terminalRef} className="terminal-body custom-scroll" onClick={() => booted && inputRef.current?.focus()}>
              {visibleLines.map((line, i) => (
                <div key={i} className="terminal-line">
                  {line.prefix && <span className="text-[var(--accent)]">{line.prefix}</span>}
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}

              {outputLines.map((line, i) => (
                <div key={`out-${i}`} className="terminal-line">
                  {line.prompt && <span className="text-[var(--accent)]">{line.prompt} </span>}
                  <span className={line.isError ? "text-red-400" : line.isOutput ? "text-[var(--text-secondary)]" : "text-white"}>
                    {line.text}
                  </span>
                </div>
              ))}

              {booted && (
                <form onSubmit={handleSubmit} className="terminal-input-line">
                  <span className="text-[var(--accent)]">~ limon@portfolio ~ % </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    className="terminal-input"
                    autoFocus
                    spellCheck={false}
                    aria-label="Terminal input"
                  />
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
