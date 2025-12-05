import React, { useEffect, useState } from "react";

const projects = {
  p1: {
    title: "Wanderlust – Premium Travel Booking Platform",
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?fit=crop&w=800&q=80",
    stack: ["Next.js 14", "NextAuth.js", "Express.js", "MongoDB"],
    desc: "A full-stack travel booking platform integrating a modern Next.js frontend with a secure Express backend.",
    details: [
      "Developed with Next.js 14 (App Router) and Express.js for seamless API communication.",
      "Implemented OAuth authentication with NextAuth.js for secure login flows.",
      "Added Role-Based Access Control (RBAC) for Admins and Users.",
      "Designed glass-morphism responsive UI using Tailwind CSS.",
    ],
    links: { github: "https://github.com" },
  },
  p2: {
    title: "FinEase – Personal Finance Management App",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
    stack: ["React.js", "Node.js", "MongoDB", "Firebase"],
    desc: "A real-time personal finance tracker with analytics and secure authentication.",
    details: [
      "Built JWT & Firebase Auth based secure login and account management.",
      "Designed RESTful API with complex MongoDB queries for analytics.",
      "Integrated Recharts for income, expenses, and savings visualization.",
      "Created responsive dashboard with dark/light mode and protected routes.",
    ],
    links: { github: "https://github.com" },
  },
  p3: {
    title: "GameHub – Online Game Library",
    img: "https://images.unsplash.com/photo-1511882150382-421c52be3b0f?fit=crop&w=800&q=80",
    stack: ["React", "Tailwind CSS", "DaisyUI", "Firebase"],
    desc: "An engaging online game library for users to discover and manage their favorite games.",
    details: [
      "Built responsive and interactive UI using React, Tailwind CSS, and DaisyUI.",
      "Implemented game browsing, detailed view, and personal Installed List management.",
      "Integrated Firebase for secure data handling and smooth user experience.",
    ],
    links: { github: "https://github.com" },
  },
};

const skills = {
  frontend: [
    { name: "React.js", level: 95, icon: "fab fa-react" },
    { name: "Next.js", level: 94, icon: "fas fa-code" },
    { name: "Tailwind CSS", level: 96, icon: "fab fa-css3-alt" },
    { name: "Bootstrap", level: 92, icon: "fab fa-bootstrap" },
    { name: "JavaScript ES6+", level: 93, icon: "fab fa-js" },
  ],
  backend: [
    { name: "Node.js", level: 85, icon: "fab fa-node-js" },
    { name: "Express.js", level: 85, icon: "fas fa-server" },
    { name: "MongoDB", level: 80, icon: "fas fa-database" },
    { name: "Firebase", level: 82, icon: "fas fa-fire" },
    { name: "REST APIs", level: 88, icon: "fas fa-network-wired" },
  ],
  tools: [
    { name: "GitHub", icon: "fab fa-github" },
    { name: "VS Code", icon: "fas fa-code" },
    { name: "Figma", icon: "fab fa-figma" },
    { name: "Vercel", icon: "fas fa-rocket" },
    { name: "Netlify", icon: "fas fa-cloud" },
    { name: "MongoDB", icon: "fas fa-database" },
    { name: "Firebase", icon: "fas fa-fire" },
    { name: "DaisyUI", icon: "fas fa-palette" },
  ],
};

const certifications = [
  { title: "Safe Internet For Every Child", issuer: "UNICEF Bangladesh" },
  { title: "Learn HTML – For Beginners", issuer: "Udemy" },
  { title: "HTML5 and CSS3", issuer: "Pirple.com" },
];

const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Elementary" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate skill bars on scroll
    const handleSkillBars = () => {
      const bars = document.querySelectorAll(".skill-bar");
      bars.forEach((bar) => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          const width = bar.getAttribute("data-width") || "0%";
          bar.style.width = width;
        }
      });
    };

    window.addEventListener("scroll", handleSkillBars);
    handleSkillBars();
    return () => window.removeEventListener("scroll", handleSkillBars);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  function openModal(id) {
    setModalData(projects[id]);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
    setModalData(null);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Using FormData for proper Formspree submission
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/myzlybdj", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus(""), 5000);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 5000);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const techIcons = [
    { name: "React", icon: "fab fa-react", color: "#61dafb" },
    { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e" },
    { name: "Tailwind", icon: "fab fa-css3-alt", color: "#38bdf8" },
    { name: "Next.js", icon: "fas fa-code", color: "#ffffff" },
    { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
    { name: "Node.js", icon: "fab fa-node-js", color: "#68a063" },
    { name: "MongoDB", icon: "fas fa-database", color: "#13aa52" },
    { name: "Express", icon: "fas fa-server", color: "#90c53f" },
    { name: "Firebase", icon: "fas fa-fire", color: "#ff9100" },
    { name: "HTML5", icon: "fab fa-html5", color: "#e34c26" },
    { name: "CSS3", icon: "fab fa-css3", color: "#563d7c" },
    { name: "TypeScript", icon: "fab fa-js-square", color: "#3178c6" },
    { name: "Git", icon: "fab fa-git-alt", color: "#f1502f" },
    { name: "REST API", icon: "fas fa-exchange-alt", color: "#4a90e2" },
    { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952b3" },
  ];

  // Compact 3D Carousel for icons at hero border
  function CarouselCompact({
    items = [],
    radius = 120,
    autoRotate = true,
    interval = 1500,
  }) {
    const len = items.length || 1;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (!autoRotate) return;
      const tick = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % len);
      }, interval);
      return () => clearInterval(tick);
    }, [len, autoRotate, interval]);

    const rotationAngle = currentIndex * (360 / len);

    return (
      <div className="carousel-compact-container">
        <div
          className="carousel-compact-ring"
          style={{ transform: `rotateY(${-rotationAngle}deg)` }}>
          {items.map((item, i) => {
            const angle = (360 / len) * i;
            const isCenter = i === currentIndex;

            return (
              <div
                key={i}
                className={`carousel-compact-item ${isCenter ? "active" : ""}`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px) rotateY(${-angle}deg)`,
                }}>
                <div className={`icon-badge ${isCenter ? "center" : ""}`}>
                  <i
                    className={`${item.icon} icon-content-compact`}
                    style={{ color: item.color }}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav
        className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-accent/20 shadow-lg transition-all duration-300"
        style={{ transform: `translateY(${scrollY > 50 ? 0 : 0}px)` }}>
        <div className="container px-6 py-4 flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-bold text-accent tracking-wider hover:scale-105 transition-transform">
            LIMON.<span className="text-white">DEV</span>
          </a>

          <ul className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wide">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="relative group text-gray-300 hover:text-accent transition-colors">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent rounded transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-2xl focus:outline-none hover:text-accent transition-colors">
            <i className={`fas fa-${mobileOpen ? "times" : "bars"}`}></i>
          </button>
        </div>

        {mobileOpen && (
          <div className="bg-secondary/95 backdrop-blur-md border-t border-gray-700 absolute w-full md:hidden animate-slideDown">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMobileOpen(false)}
                className="block py-3 px-6 hover:bg-accent/10 hover:text-accent transition-all">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center pt-6 px-6 relative overflow-hidden">
          <div className="container grid md:grid-cols-2 gap-10 items-center">
            <div className="hero-text animate-fadeInUp">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/30">
                  <i className="fas fa-code mr-2"></i>Full Stack Developer
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                Hi, I'm <span className="text-accent">Limon</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
                Building Modern Web Experiences
              </h2>
              <p className="text-textGray max-w-lg mb-8 text-lg leading-relaxed">
                Passionate Junior Frontend Developer specializing in React,
                Next.js, and Tailwind CSS. I craft responsive, user-centric
                applications with clean code and optimal performance.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="group cta-button px-8 py-3 bg-gradient-to-r from-accent via-blue-500 to-accent text-white font-bold rounded-full transition-all shadow-[0_6px_30px_rgba(56,189,248,0.25)] flex items-center gap-2">
                  Get In Touch
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </a>

                {/* little sparkles */}
                <span
                  className="sparkle"
                  style={{ left: "20%", top: "18%" }}></span>
                <span
                  className="sparkle"
                  style={{
                    left: "35%",
                    top: "6%",
                    width: 8,
                    height: 8,
                  }}></span>
                <span
                  className="sparkle"
                  style={{ left: "62%", top: "28%" }}></span>

                <div className="flex gap-4 items-center">
                  <a
                    href="https://github.com/limon-l"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a
                    href="https://linkedin.com/in/limonroyapu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                  <a
                    href="mailto:limonroyapu101@gmail.com"
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-600 hover:border-accent hover:text-accent hover:scale-110 hover:bg-accent/10 transition-all">
                    <i className="fas fa-envelope text-xl"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-img flex justify-center animate-float">
              <div className="relative">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-3xl blur-3xl animate-pulse"></div>

                {/* Rectangle SVG */}
                <svg
                  className="rectriangle -left-10 -top-10"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="g1" x1="0%" x2="100%">
                      <stop
                        offset="0%"
                        stopColor="#38bdf8"
                        stopOpacity="0.15"
                      />
                      <stop
                        offset="100%"
                        stopColor="#60a5fa"
                        stopOpacity="0.06"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M10 10 L90 25 L30 90 Z"
                    fill="url(#g1)"
                    stroke="#38bdf8"
                    strokeOpacity="0.12"
                    strokeWidth="1"
                  />
                </svg>

                {/* Image Container */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-visible border-2 border-accent/30 shadow-2xl relative z-10 bg-gradient-to-br from-accent/10 to-transparent p-0">
                  <img
                    src="/hero.jpeg"
                    alt="hero profile"
                    className="w-full h-full object-cover rounded-3xl relative z-20"
                  />
                  <div className="absolute bottom-0 left-0 w-full translate-y-1/2 flex justify-center z-30 pointer-events-auto">
                    <CarouselCompact
                      items={techIcons}
                      radius={120}
                      autoRotate={true}
                      interval={1500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-secondary/30 backdrop-blur-sm">
          <div className="container">
            <h2 className="section-title text-4xl font-bold text-center mb-16 animate-slideUp">
              <span className="border-b-4 border-accent pb-2">About Me</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slideInLeft">
                <div className="p-6 bg-primary/40 border border-accent/20 rounded-xl backdrop-blur-sm hover:border-accent/40 transition-all hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]">
                  <h3 className="text-xl font-bold text-accent mb-3">
                    <i className="fas fa-star mr-2"></i>Professional Summary
                  </h3>
                  <p className="text-textGray leading-relaxed">
                    Results-driven Junior Frontend Developer with strong
                    expertise in modern JavaScript technologies. Adept at
                    building scalable, user-focused applications with clean
                    architecture and optimized performance.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                    <div className="text-2xl font-bold text-accent mb-1">
                      3+
                    </div>
                    <div className="text-sm text-textGray">Projects Built</div>
                  </div>
                  <div className="p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                    <div className="text-2xl font-bold text-accent mb-1">
                      5+
                    </div>
                    <div className="text-sm text-textGray">Skills Mastered</div>
                  </div>
                  <div className="p-4 bg-primary/40 border border-accent/20 rounded-xl text-center hover:border-accent/40 transition-all">
                    <div className="text-2xl font-bold text-accent mb-1">3</div>
                    <div className="text-sm text-textGray">Certifications</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 animate-slideInRight">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-accent">
                    <i className="fas fa-graduation-cap mr-2"></i>Education
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/40 border-l-4 border-accent rounded hover:shadow-lg transition-all">
                      <h4 className="font-bold text-white">
                        B.Sc (Engg.) Computer Science & Engineering
                      </h4>
                      <p className="text-accent text-sm">
                        Metropolitan University, Sylhet
                      </p>
                      <p className="text-textGray text-sm">
                        Jan 2023 – Dec 2026
                      </p>
                    </div>
                    <div className="p-4 bg-primary/40 border-l-4 border-gray-500 rounded hover:shadow-lg transition-all">
                      <h4 className="font-bold text-white">
                        Higher Secondary Certificate
                      </h4>
                      <p className="text-accent text-sm">
                        Dhaka City College, Dhaka
                      </p>
                      <p className="text-textGray text-sm">GPA: 5.00/5.00</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-accent">
                    <i className="fas fa-globe mr-2"></i>Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <span
                        key={lang.name}
                        className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm border border-accent/30">
                        {lang.name} • {lang.level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="container">
            <h2 className="section-title text-4xl font-bold text-center mb-16 animate-slideUp">
              <span className="border-b-4 border-accent pb-2">
                Technical Skills
              </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Frontend Skills */}
              <div className="space-y-6 animate-slideInLeft">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-accent">
                  <i className="fas fa-code text-3xl"></i>Frontend
                </h3>
                <div className="space-y-4">
                  {skills.frontend.map((skill) => (
                    <div key={skill.name} className="group skill-item">
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center">
                          <i
                            className={`skill-icon ${skill.icon}`}
                            aria-hidden></i>
                          <span className="font-semibold ml-2">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-accent font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden border border-accent/20">
                        <div
                          className="skill-bar bg-gradient-to-r from-accent to-blue-400 h-3 rounded-full transition-all duration-1000"
                          data-width={`${skill.level}%`}
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div className="space-y-6 animate-slideInRight">
                <h3 className="text-2xl font-bold flex items-center gap-3 text-accent">
                  <i className="fas fa-server text-3xl"></i>Backend
                </h3>
                <div className="space-y-4">
                  {skills.backend.map((skill) => (
                    <div key={skill.name} className="group skill-item">
                      <div className="flex justify-between mb-2 items-center">
                        <div className="flex items-center">
                          <i
                            className={`skill-icon ${skill.icon}`}
                            aria-hidden></i>
                          <span className="font-semibold ml-2">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-accent font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden border border-accent/20">
                        <div
                          className="skill-bar bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full transition-all duration-1000"
                          data-width={`${skill.level}%`}
                          style={{ width: 0 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools Section */}
            <div className="mt-12 animate-slideUp">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent">
                <i className="fas fa-tools text-3xl"></i>Tools & Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skills.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="px-4 py-3 bg-primary/40 text-center rounded-lg border border-accent/20 hover:border-accent/60 hover:bg-accent/5 transition-all cursor-pointer group">
                    <i
                      className={`${tool.icon} text-2xl mb-2 block`}
                      aria-hidden></i>
                    <span className="text-sm font-semibold group-hover:text-accent transition-colors">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-12 animate-slideUp">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent">
                <i className="fas fa-certificate text-3xl"></i>Certifications
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-primary/40 border border-accent/20 rounded-lg hover:border-accent/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.1)] transition-all hover:-translate-y-1">
                    <i className="fas fa-award text-accent text-2xl mb-3 block"></i>
                    <h4 className="font-bold text-white">{cert.title}</h4>
                    <p className="text-textGray text-sm">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 bg-secondary/30 backdrop-blur-sm">
          <div className="container">
            <h2 className="section-title text-4xl font-bold text-center mb-16 animate-slideUp">
              <span className="border-b-4 border-accent pb-2">
                Featured Projects
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.keys(projects).map((k, idx) => {
                const p = projects[k];
                return (
                  <div
                    key={k}
                    className="group project-card bg-primary/40 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/20 hover:border-accent/60 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all hover:-translate-y-2 duration-300 animate-slideUp"
                    style={{ animationDelay: `${idx * 100}ms` }}>
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.stack.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30">
                            {tech}
                          </span>
                        ))}
                        {p.stack.length > 2 && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30">
                            +{p.stack.length - 2}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => openModal(k)}
                        className="text-accent font-semibold hover:text-white transition-colors flex items-center gap-1 group/btn">
                        View Details
                        <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section - Premium Layout */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          </div>
          <div className="container">
            <h2 className="section-title text-5xl font-bold text-center mb-4 animate-slideUp">
              <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p
              className="text-center text-textGray mb-16 text-lg max-w-2xl mx-auto animate-slideUp"
              style={{ animationDelay: "100ms" }}>
              Ready to collaborate? Let's create something extraordinary
              together. Reach out through your preferred channel.
            </p>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {/* Left Side - Contact Info */}
              <div className="space-y-5 animate-slideInLeft">
                <div className="h-full p-8 bg-gradient-to-br from-primary/60 to-secondary/40 border border-accent/20 rounded-2xl backdrop-blur-md hover:border-accent/40 transition-all">
                  <h3 className="text-2xl font-bold mb-8 text-accent flex items-center gap-3">
                    <i className="fas fa-handshake text-3xl"></i>Contact Info
                  </h3>

                  <div className="space-y-6">
                    <p className="text-textGray text-base leading-relaxed">
                      I'm actively seeking new opportunities for full-time
                      roles, freelance projects, and collaborations. Whether you
                      have a question or just want to say hello, feel free to
                      get in touch!
                    </p>

                    {[
                      {
                        icon: "envelope",
                        label: "Email",
                        value: "limonroyapu101@gmail.com",
                        link: "mailto:limonroyapu101@gmail.com",
                      },
                      {
                        icon: "phone",
                        label: "Phone",
                        value: "+8801991775927",
                        link: "tel:+8801991775927",
                      },
                      {
                        icon: "map-marker-alt",
                        label: "Location",
                        value: "Sylhet, Bangladesh",
                      },
                    ].map((contact, idx) => (
                      <a
                        key={idx}
                        href={contact.link || "#"}
                        className="group flex items-start gap-4 p-4 rounded-xl bg-primary/30 border border-accent/10 hover:border-accent/40 hover:bg-accent/5 transition-all hover:translate-x-2">
                        <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-blue-500/10 rounded-xl flex items-center justify-center text-accent text-xl border border-accent/30 group-hover:border-accent/60 transition-all flex-shrink-0 mt-1">
                          <i className={`fas fa-${contact.icon}`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider">
                            {contact.label}
                          </h4>
                          <p className="text-accent text-base font-medium group-hover:text-blue-300 transition-colors">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="mt-8 pt-8 border-t border-accent/10">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
                      Connect With Me
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="https://github.com/limon-l"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                        <i className="fab fa-github text-lg"></i>
                      </a>
                      <a
                        href="https://linkedin.com/in/limonroyapu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                        <i className="fab fa-linkedin-in text-lg"></i>
                      </a>
                      <a
                        href="mailto:limonroyapu101@gmail.com"
                        className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-primary transition-all hover:scale-110">
                        <i className="fas fa-envelope text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="animate-slideInRight">
                <div className="p-8 bg-gradient-to-br from-primary/60 to-secondary/40 border border-accent/20 rounded-2xl backdrop-blur-md hover:border-accent/30 transition-all">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                    <i className="fas fa-paper-plane text-accent"></i>Send a
                    Message
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        required
                        className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows="5"
                        placeholder="Tell me about your project..."
                        required
                        className="w-full px-5 py-3 bg-primary/40 border border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all focus:shadow-[0_0_20px_rgba(56,189,248,0.15)] text-white placeholder-gray-500 resize-none"></textarea>
                    </div>

                    {/* Status Messages */}
                    {formStatus === "success" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                        <i className="fas fa-check-circle text-green-500"></i>
                        <span className="text-green-300 font-medium">
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3">
                        <i className="fas fa-exclamation-circle text-red-500"></i>
                        <span className="text-red-300 font-medium">
                          Oops! Something went wrong. Please try again.
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full py-3 px-6 bg-gradient-to-r from-accent via-blue-500 to-accent text-primary font-bold rounded-xl hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {formStatus === "sending" ? (
                        <>
                          <i className="fas fa-spinner animate-spin"></i>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-send"></i>
                          Send Message
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    I typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-primary/50 border-t border-accent/20 text-center">
          <p className="text-gray-500 mb-4">
            <i className="fas fa-heart text-accent mr-2"></i>
            Built with passion. &copy; 2025 Limon Roy Apu. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/limon-l"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com/in/limonroyapu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="mailto:limonroyapu101@gmail.com"
              className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </div>
        </footer>
      </main>

      {/* Project Modal */}
      {modalOpen && modalData && (
        <div
          className={`modal fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm active`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}>
          <div className="bg-gradient-to-b from-secondary to-primary w-full max-w-3xl rounded-xl shadow-2xl border border-accent/30 overflow-hidden relative max-h-[90vh] overflow-y-auto animate-scaleIn">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10 hover:rotate-90 transition-transform">
              <i className="fas fa-times"></i>
            </button>
            <div className="p-8">
              <img
                src={modalData.img}
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
                alt=""
              />
              <h2 className="text-3xl font-bold mb-2 text-accent">
                {modalData.title}
              </h2>
              <p className="text-gray-300 mb-4">{modalData.desc}</p>

              <div className="mb-6">
                <h4 className="font-bold text-white mb-3">Tech Stack:</h4>
                <div className="flex gap-2 flex-wrap">
                  {modalData.stack.map((t) => (
                    <span
                      key={t}
                      className="bg-accent/10 px-3 py-1 rounded-full text-xs text-accent border border-accent/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-white mb-3">Key Features:</h4>
                <ul className="text-gray-300 space-y-2">
                  {modalData.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-2">
                      <i className="fas fa-check text-accent mt-1"></i>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <a
                  href={modalData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-gradient-to-r from-accent to-blue-500 text-primary font-bold rounded-lg text-center hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all">
                  <i className="fab fa-github mr-2"></i>View Code
                </a>
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
