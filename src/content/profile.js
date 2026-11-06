/**
 * Owner-provided identity and an evidence-aware technology inventory.
 * `verified` means source usage is inspectable; it does not measure proficiency.
 */
export const profile = {
  name: 'Limon Roy Apu',
  headline: 'CSE Undergraduate & Research-Minded Developer',
  supportingCopy:
    'Exploring artificial intelligence, machine learning, and emerging technologies while building practical full-stack software.',
  email: 'limonroyapu101@gmail.com',
  location: 'Bangladesh',
  portrait: '/hero.jpeg',
  education: {
    label: 'Computer Science and Engineering undergraduate',
    status: 'self-reported',
    note: 'Educational identity provided by the owner. Institution and dates are not independently verified.',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/limon-l', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/limonroyapu/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:limonroyapu101@gmail.com', icon: 'mail' },
  ],
};

const technology = (name, group, description, projectIds = []) => ({
  name,
  group,
  status: projectIds.length ? 'verified' : 'self-reported',
  description,
  projectIds,
});

export const technologies = [
  technology('JavaScript', 'Languages', 'Application logic and browser interactions across inspected applications.', ['atelier', 'wanderlust', 'book-courier', 'metrobridge']),
  technology('TypeScript', 'Languages', 'Typed application and server code in inspected repositories.', ['ponnaloy', 'bd-blood-finder']),
  technology('HTML', 'Languages', 'Semantic document structure and the application entry point.', ['atelier']),
  technology('CSS', 'Frontend', 'Responsive layouts, theme tokens, and accessible interaction states.', ['atelier']),
  technology('Python', 'Languages', 'General-purpose programming; previously listed by the owner.'),
  technology('C', 'Languages', 'Systems and foundational programming; previously listed by the owner.'),
  technology('C++', 'Languages', 'Foundational programming and problem solving; previously listed by the owner.'),
  technology('React', 'Frontend', 'Component-based interfaces in this portfolio and inspected projects.', ['atelier', 'ponnaloy', 'wanderlust', 'book-courier', 'metrobridge']),
  technology('Next.js', 'Frontend', 'React application framework in the Ponnaloy and Wanderlust sources.', ['ponnaloy', 'wanderlust']),
  technology('Vite', 'Tools & delivery', 'Development server and production bundler for React applications.', ['atelier', 'book-courier', 'metrobridge']),
  technology('React Router', 'Frontend', 'Client-side routes in the BookCourier and MetroBridge applications.', ['book-courier', 'metrobridge']),
  technology('Redux', 'Frontend', 'Application state management; previously listed by the owner.'),
  technology('Tailwind CSS', 'Frontend', 'Utility-based styling in inspected project sources.', ['ponnaloy', 'wanderlust', 'book-courier', 'metrobridge']),
  technology('Bootstrap', 'Frontend', 'Responsive interface toolkit; previously listed by the owner.'),
  technology('Node.js', 'Backend', 'Server runtime for the Ponnaloy API.', ['ponnaloy']),
  technology('Fastify', 'Backend', 'HTTP server framework in the Ponnaloy API.', ['ponnaloy']),
  technology('Express.js', 'Backend', 'HTTP routing and middleware; previously listed by the owner.'),
  technology('REST APIs', 'Backend', 'Resource-oriented HTTP routes in the Ponnaloy server.', ['ponnaloy']),
  technology('Axios', 'Backend', 'HTTP client integration in inspected frontend applications.', ['wanderlust', 'book-courier', 'metrobridge']),
  technology('Socket.IO', 'Backend', 'Client-side event communication in MetroBridge; server behavior was not reviewed.', ['metrobridge']),
  technology('Zod', 'Backend', 'Runtime schema validation in the Ponnaloy source.', ['ponnaloy']),
  technology('MongoDB', 'Data & services', 'Document database configuration in Ponnaloy.', ['ponnaloy']),
  technology('Prisma', 'Data & services', 'Database schema and access layer in Ponnaloy.', ['ponnaloy']),
  technology('Firebase', 'Data & services', 'Authentication integration in the BookCourier client.', ['book-courier']),
  technology('Supabase', 'Data & services', 'Backend service integration in BD Blood Finder.', ['bd-blood-finder']),
  technology('MySQL', 'Data & services', 'Relational data storage; previously listed by the owner.'),
  technology('Cloudflare Workers', 'Tools & delivery', 'Worker runtime and configuration in BD Blood Finder.', ['bd-blood-finder']),
  technology('Git', 'Tools & delivery', 'Version control for this repository and its reviewable changes.', ['atelier']),
  technology('GitHub', 'Tools & delivery', 'Public source repository and project documentation.', ['atelier']),
  technology('npm', 'Tools & delivery', 'Dependency management and reproducible build commands.', ['atelier']),
  technology('Vercel', 'Tools & delivery', 'Web hosting; previously listed by the owner.'),
  technology('Netlify', 'Tools & delivery', 'Web hosting; previously listed by the owner.'),
  technology('VS Code', 'Tools & delivery', 'Code editor; previously listed by the owner.'),
  technology('Postman', 'Tools & delivery', 'API inspection and request tooling; previously listed by the owner.'),
  technology('Figma', 'Tools & delivery', 'Interface design tooling; previously listed by the owner.'),
  technology('NextAuth', 'Data & services', 'Authentication integration in the Wanderlust source.', ['wanderlust']),
  technology('TanStack Query', 'Frontend', 'Server-state request and caching layer in BookCourier.', ['book-courier']),
  technology('Stripe', 'Data & services', 'Payment integration code in BookCourier; live payment processing was not tested.', ['book-courier']),
  technology('Leaflet', 'Frontend', 'Map interface dependency in BookCourier.', ['book-courier']),
  technology('pnpm', 'Tools & delivery', 'Workspace package management in Ponnaloy.', ['ponnaloy']),
  technology('Turborepo', 'Tools & delivery', 'Monorepo task configuration in Ponnaloy.', ['ponnaloy']),
  technology('Playwright', 'Tools & delivery', 'Browser test configuration in Ponnaloy; presence does not imply passing tests.', ['ponnaloy']),
  technology('Vitest', 'Tools & delivery', 'Test tooling declared in Ponnaloy; results are documented separately.', ['ponnaloy']),
  technology('grammY', 'Backend', 'Telegram bot framework in BD Blood Finder.', ['bd-blood-finder']),
];
