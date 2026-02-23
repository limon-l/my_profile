export const projects = {
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
    links: { github: "https://github.com", live: "https://example.com" },
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
    links: { github: "https://github.com", live: "https://example.com" },
  },
  p3: {
    title: "GameHub – Online Game Library",
    img: "https://store-images.s-microsoft.com/image/apps.51736.14336182876214510.1257f207-809b-4764-86fe-baa35696ced6.7ffe14ee-cd75-4273-b571-408cd44bd9d2",
    stack: ["React", "Tailwind CSS", "DaisyUI", "Firebase"],
    desc: "An engaging online game library for users to discover and manage their favorite games.",
    details: [
      "Built responsive and interactive UI using React, Tailwind CSS, and DaisyUI.",
      "Implemented game browsing, detailed view, and personal Installed List management.",
      "Integrated Firebase for secure data handling and smooth user experience.",
    ],
    links: { github: "https://github.com", live: "https://example.com" },
  },
};

export const skills = {
  programming: [
    { name: "C", level: 80, icon: "fas fa-code" },
    { name: "C++", level: 82, icon: "fas fa-code" },
    { name: "Java", level: 78, icon: "fab fa-java" },
    { name: "Python", level: 85, icon: "fab fa-python" },
  ],
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

export const certifications = [
  {
    certificate: "Certificate of Completion",
    courseName: "Safe Internet For Every Child",
    author: "UNICEF Digital Learning Team",
    issuer: "UNICEF Bangladesh",
    date: "2024",
  },
  {
    certificate: "Certificate of Completion",
    courseName: "Learn HTML – For Beginners",
    author: "Edwin Diaz",
    issuer: "Udemy",
    date: "2023",
  },
  {
    certificate: "Certificate of Achievement",
    courseName: "HTML5 and CSS3 Fundamentals",
    author: "Pirple Instructors",
    issuer: "Pirple.com",
    date: "2023",
  },
];

export const languages = [
  { name: "Bengali", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Hindi", level: "Elementary" },
];

export const techIcons = [
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
