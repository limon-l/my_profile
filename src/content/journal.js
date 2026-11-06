// Contemporary implementation records, not reconstructed owner history.
export const journalEntries = [
  {
    id: "keep-vite",
    title: "Keep the stack. Improve the system.",
    topic: "Architecture",
    date: "2026-11-05",
    context:
      "The existing portfolio uses React 18 and Vite 5. It is a small, static portfolio with client-side interaction.",
    problem:
      "The redesign needs individual project URLs, content separation, and consistent visual primitives without a framework migration.",
    alternatives: [
      "Migrate to a server-rendered framework.",
      "Retain Vite and generate static entry documents for known routes.",
    ],
    approach:
      "Retain React and Vite, use route-level lazy loading, and generate route-specific HTML metadata after the build.",
    reasoning:
      "The existing stack can support these requirements. Keeping it avoids migration cost and preserves the existing setup.",
    tradeoffs:
      "Interactive React controls require JavaScript. Generated entry documents provide readable fallback content and route metadata; they are not server-rendered React pages.",
    evidence: [
      "vite.config.js",
      "src/AtelierApp.jsx",
      "scripts/generate-pages.mjs",
    ],
    questions:
      "Reconsider server rendering if the site grows into a frequently updated publication archive.",
  },
  {
    id: "evidence-first",
    title: "Treat evidence as content data.",
    topic: "Content systems",
    date: "2026-11-05",
    context:
      "The previous site combined source-backed work with unsupported metrics, testimonials, and credentials.",
    problem:
      "A visitor needs to distinguish code evidence, self-reported background, and future learning.",
    alternatives: [
      "Keep claims in component copy.",
      "Maintain an explicit local evidence manifest.",
    ],
    approach:
      "Store project evidence, review dates, source links, and limitations alongside each project. Give research interests a separate content model.",
    reasoning:
      "A small static manifest is reviewable in Git and does not need a CMS or browser-side GitHub API token.",
    tradeoffs:
      "Source review is a dated snapshot. It requires manual re-review and cannot establish production reliability or personal authorship.",
    evidence: [
      "src/content/projects.js",
      "src/content/profile.js",
      "docs/project-evidence.md",
    ],
    questions:
      "Which future project artifacts would justify stronger claims: reproducible tests, a demo recording, or contributor-specific history?",
  },
  {
    id: "purposeful-motion",
    title: "Let the interface stay still when it should.",
    topic: "Interaction design",
    date: "2026-11-05",
    context:
      "The original portfolio loaded several external animation libraries and used continuous decorative effects.",
    problem:
      "Motion should clarify interaction while preserving reading, keyboard navigation, and reduced-motion preferences.",
    alternatives: [
      "Keep multiple animation dependencies.",
      "Use native CSS and one pointer-responsive grid.",
    ],
    approach:
      "Use short CSS transitions for controls and cards. Restrict the hero grid response to fine pointers with no reduced-motion preference.",
    reasoning:
      "The content remains visible without reveal scripts. There is no forced intro, autoplay carousel, or scroll interception.",
    tradeoffs:
      "A quieter interface has fewer theatrical transitions. It keeps the implementation and runtime cost smaller.",
    evidence: ["src/components/AtelierHero.jsx", "src/atelier.css"],
    questions:
      "Would an additional transition measurably improve orientation, or only add movement?",
  },
];
