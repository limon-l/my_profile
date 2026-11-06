# Repository audit and implementation plan

Audit date: 5 November 2026 (Asia/Dhaka). This document records the repository **before the transformation**. Source references below refer to that original revision; line numbers will change during implementation. The initial working tree was clean on `main`. A separate implementation branch is appropriate for the authorized work.

## Existing architecture and dependency inventory

| Area | Evidence and finding |
| --- | --- |
| Framework | Vite + React SPA. `package.json:1–20`; `src/main.jsx:1–11` mounts one StrictMode application. Preserve this stack: no migration benefit has been demonstrated. |
| Versions | Declared React/React DOM `^18.2.0`, resolved **18.3.1**; Vite `^5.0.0`, resolved **5.4.21**; React plugin `^4.0.0`, resolved **4.7.0**. Verified by `npm.cmd ls --depth=0`, not inferred from ranges. |
| Language | JavaScript and JSX, ESM (`package.json:5`). No TypeScript configuration or compiler. |
| Package manager | npm; committed `package-lock.json` (57,720 bytes). Host Node **22.22.3**, npm **11.6.3**. No additional dependencies installed during the audit. |
| Routing | No router package. One document and section anchors assembled in `src/App.jsx:145–180`. Case studies are dialogs, not addressable routes. `/lab` and `/journal` do not exist. |
| Styling | Runtime Tailwind CDN and inline configuration in `index.html:44–192`, plus **4,312 lines / 88,898 bytes** of authored `src/index.css`. Semantic CSS variables already exist (`src/index.css:7–91`), with late theme overrides and repeated card rules. |
| Icons and fonts | Font Awesome **6.4.0** CDN; Google-hosted Inter (seven weights) and JetBrains Mono (three weights), `index.html:194–197`. These are network integrations, not npm dependencies. |
| Motion | CSS transitions/keyframes, timers and IntersectionObserver. GSAP **3.12.5** and ScrollTrigger CDN scripts (`index.html:199–201`) have no references in application source and are dead runtime dependencies. No animation npm package. |
| Content | A single untyped content module, `src/data/data.js:1–598`: nine project entries, toolkit, ten certificate entries, languages, ten testimonials, journey, statistics and icon metadata. Further copy is duplicated inside components. |
| Host/build | Vite emits `dist`, minifies with esbuild, disables source maps (`vite.config.js:4–10`). Vercel commands/output directory in `vercel.json:1–6`; no explicit SPA deep-route rewrite. |
| Contact | Existing Formspree endpoint `https://formspree.io/f/myzlybdj` (`src/App.jsx:87–141`), native required fields, honeypot, client-side 30-second delay (`src/components/ContactSection.jsx:5–19`). Provider ownership and delivery are unverified; no real submission was made. |
| SEO | Root title, description, canonical, OG/Twitter and Person JSON-LD exist in `index.html:7–40,203–228`; robots and sitemap exist. Their domain differs from the user-supplied live portfolio. |
| Tests/CI | Only `dev`, `build`, `preview` npm scripts (`package.json:6–10`). No lint, typecheck, test runner, test files, or CI workflow exists in the tracked tree. No unsupported scripts were represented as passing. |

The original tracked repository contains 34 files totalling approximately 1,162,079 bytes. `index.original.html:1–70` is an existing template backup and must be preserved. `README.md` and `UPDATES.md` contain historical design/integration documentation; they should be retained or archived when replaced by current instructions.

## Assets and preservation

| Asset | Finding and treatment |
| --- | --- |
| `public/hero.jpeg` | **118,914 bytes**, authentic existing portrait, **688 × 776**. Visually inspected and loaded successfully in Chromium. Retain the original identity and image; resizing/cropping must not generate another face. |
| `public/hero.svg` | **742,436 bytes**, 688 × 776 SVG wrapping one base64 PNG. Read via `git show HEAD:public/hero.svg`; no script tag found. Direct Node file access is denied by this host (`EPERM`), causing both full baseline builds to fail while copying public files. Preserve it; do not silently delete it to obtain a passing build. |
| Project images | URLs in `src/data/data.js:4–313` are Unsplash stock images and one Microsoft Store asset, not verified screenshots of these applications. `ProjectModal.jsx:52–55` incorrectly calls them screenshots. Use clearly labelled illustrations until authentic screenshots are available. |
| `public/robots.txt`, `public/sitemap.xml` | Preserve purpose; update stale domain and add actual routes. |
| Resume/certificates | No resume PDF, certificate image/PDF, or credential verification URL exists in public assets. Do not add download or verified certificate UI without evidence. |
| `public/debug.log` | Existing empty tracked file. No useful content established; no deletion authorized during audit. |

Keep historical modules/data or an explicit source archive so that unsupported claims can be removed from the public presentation without destroying user work. Existing `#home`, `#about`, `#experience`, `#skills`, `#projects` and `#contact` anchors should remain usable where practical. No external account changes, paid service, credential edits or public deployment are part of the audit.

## Baseline execution and measurements

| Check | Actual result |
| --- | --- |
| `npm run build` in PowerShell | Host blocks `npm.ps1` under execution policy. Use `npm.cmd`; do not weaken global policy. |
| `npm.cmd run build` | **FAILED**: 47 modules transformed, then `EPERM` copying `public/hero.svg` to `dist/hero.svg`. |
| `npm.cmd run build -- --outDir docs/.baseline-build` | **FAILED** with the same source-asset `EPERM`; confirms it is not merely a stale output directory. |
| Code-only diagnostic `node --input-type=module -e "import {build} from 'vite';await build({publicDir:false,build:{outDir:'docs/.baseline-build-code-only'}});"` | **PASSED**: 47 modules; 1.31 s reported build. This deliberately omits public assets and is **not** a successful complete site build. Generated diagnostic files were removed after recording measurements. |
| Diagnostic output | HTML **12.56 kB / 2.93 kB gzip**; CSS **72.54 kB / 14.17 kB gzip**; JS **237.45 kB / 71.23 kB gzip**. CDN JS/fonts/images are excluded. |
| Lint / typecheck / tests | **Not configured** in the baseline. |
| Dev server | `npm.cmd run dev -- --host 127.0.0.1`; HTTP page loads at `http://127.0.0.1:5173/`, Vite ready in 526 ms. |
| Desktop screenshot | `docs/screenshots/before-desktop.png`, Chromium headless, 1440 × 1000, full document. |
| Mobile screenshot | `docs/screenshots/before-mobile.png`, Chromium headless, 390 × 844, full document. |

Raw browser observations are saved in `docs/screenshots/baseline-measurements.json`. Both viewports rendered **1,492 DOM nodes** and approximately **211.6 kB** serialized HTML after React. Local development resource transfer reported **2,225,634 bytes** for each capture. Desktop DOMContentLoaded/load were approximately **3,326 / 3,330 ms**; mobile **3,257 / 3,260 ms**. There was no browser throttling or controlled cold-cache protocol, and development transforms/HMR contribute substantial overhead. These are diagnostic observations, **not** production Lighthouse scores or field Core Web Vitals.

Both baseline pages reported **`tailwind is not defined`** when the Tailwind CDN could not load in this environment. The portrait loaded; four below-the-fold/external project images were not loaded at capture time. Lazy loading and network restrictions mean this alone does not prove those URLs are permanently broken. Root document width equalled viewport width at 1440 and 390 pixels; this is not yet validation at all requested widths. The full-page screenshots preserve the actual baseline, including the effect of unavailable third-party assets and scroll-reveal content not yet intersected.

Browser tooling was already installed outside the repository: `C:/All Files/Lab/Web Development/Projects/codealpha/Ponnaloy-e-com/node_modules/.pnpm/playwright-core@1.64.1/node_modules/playwright-core`, with executable `C:/Users/User/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe`. No browser packages were installed into this project during baseline inspection. The Sites portable local-preview reference was read before launching the server.

## Component audit and prioritized issues

| Priority | Exact original source | Finding / required action |
| --- | --- | --- |
| P0 | `src/data/data.js:12,46,77,117,365–446,454–579` | Hard-coded stars/forks/contributors, certificates without supporting artifacts, named testimonials without sources, skill mastery counts and dated journey claims lack verification. Preserve historical data outside public UI and replace with explicit evidence categories. |
| P0 | `src/components/AboutSection.jsx:33–37,68–77,92–100`; `src/data/data.js:537–574` | Final-year status, Metropolitan University, Jan 2023–Dec 2026, Dhaka City College and GPA 5/5 are unsupported by the supplied source of truth. Omit from public copy; present CSE undergraduate identity as self-reported. |
| P0 | `src/components/HeroSection.jsx:107–111`; `src/components/ContactSection.jsx:52–55,60–62,97–100`; `src/components/Footer.jsx:57–60` | Availability, phone, specific city and response-within-24-hours promises are unconfirmed. Publish supplied email/socials and Bangladesh context; omit unsupported contact details/status. |
| P0 | `index.html:44–57,60–192` | Production layout depends on a runtime CDN compiler and unguarded `tailwind.config`. Observed runtime exception. Replace with local authored styling/build output and guarded theme initialization. |
| P0 | `public/hero.svg`; `vite.config.js:6` | Host access denial blocks complete build. Resolve access/preservation safely and rerun full build. Code-only success is insufficient. |
| P1 | `src/App.jsx:55–67`; `index.html:47–52` | Both initializers erase hash fragments and force scroll to top, breaking incoming section links and expected browser restoration. Respect navigation and anchors. |
| P1 | `src/components/ProjectModal.jsx:7–27,37–46`; `src/components/CommandPalette.jsx:58–66,98–116`; `src/components/SkillsSection.jsx:170–220` | Dialogs lack focus trapping, opener-focus restoration and background inertness. Certificate viewer lacks its own Escape handler. Prefer accessible native dialog or real navigable case-study pages; retain command search only with complete keyboard behavior. |
| P1 | `src/components/Navigation.jsx:138–159` | Mobile toggle has expanded state but no controlled panel reference; closed panel remains in DOM without an explicit hidden/inert mechanism. Verify hidden-panel focusability, Escape/focus restoration and targets on mobile. |
| P1 | `src/components/ProjectsSection.jsx:21–25,64–87`; `src/components/RoundedCarousel.jsx:7–14,37–53`; `src/components/TestimonialsSection.jsx:16–20,45–48` | Automatically rotating content and nested actions inside `role=button` articles impair predictability. Timer behavior does not check reduced motion. Use stable cards with normal links and user-operated controls. |
| P1 | `src/components/HeroSection.jsx:60–91,114–116`; `src/components/DeveloperTerminal.jsx:4–69,79–90` | Repeated typewriter announcements, per-pointer React state and fake terminal outputs add distraction and duplicate unsupported claims. Replace with readable static identity and one restrained optional visual interaction. |
| P1 | `src/components/ContactSection.jsx:115–119,186–215`; `src/App.jsx:99–115` | Attachment selector promises max 5 MB but file is never appended or validated. Form feedback lacks a status/live region, times out after 5 seconds, and has no mailto fallback in error copy. Do not submit real messages during testing. A concise mailto contact experience is reliable without asserting provider delivery. |
| P1 | `index.html:16–40,209–225`; `public/robots.txt:4`; `public/sitemap.xml:4` | Canonical/social/structured data/sitemap use `limondevs.vercel.app`, differing from supplied `my-profile-green-beta.vercel.app`. Relative OG image is a portrait, not the advertised 1200 × 630 preview; manifest file is missing; Twitter identity and completed credential are unverified. Add truthful route-specific metadata and valid local assets. |
| P1 | `src/index.css:34–35,174–178,453–538,2954–2989`; `src/App.jsx:151–152` | Existing focus outline and reduced-motion CSS are useful foundations. Very muted text needs contrast checks; default reveals hide content until observer runs. Skip-link CSS exists but no actual skip link is rendered. Provide visible content without animation and a real main-content link. |
| P2 | `src/index.css:7–91,3011–3070,3582–3595,3618–3682,3870–4025` | Accumulated theme/card overrides, explicit light colors and duplicated effects complicate maintenance. Consolidate semantic tokens, typography, primitives and states into a coherent local design system. |
| P2 | `src/App.jsx:48–52`; `src/components/Navigation.jsx:28–49`; `src/components/Footer.jsx:7–11` | Multiple global scroll listeners and per-scroll React state. Prefer CSS/sticky navigation and observers; avoid unnecessary rerenders. |
| P2 | `index.html:194–201`; `src/data/data.js:4–313`; `src/components/HeroSection.jsx:191–197` | Unused GSAP loads, remote font weights/images, portrait lacks dimensions. Remove dead scripts, size image explicitly, defer noncritical imagery and measure actual production output. |
| P2 | `README.md:10–13,27–38,66–69`; `UPDATES.md:19–27,152` | Documentation describes outdated structure and makes unverified integration claims. Write accurate setup/content/evidence/deployment guidance while preserving history. |

No publication, research affiliation, employment, scholarship or academic award evidence was found locally. No AI/ML implementation can be established solely from old project titles such as `src/data/data.js:145`. Repo references must be inspected before promoting those claims. No frontend secret was found in the inspected application/config; the Formspree form identifier is public endpoint configuration, not a credential. This is a scoped inspection, not an exhaustive security assessment.

## Implementation plan established before edits

1. **Evidence and preservation:** publish this audit and a project evidence ledger; inspect the five requested GitHub repositories and relevant source/manifests. Snapshot source revision dates/SHAs. Keep original assets and historical data. Classify verified, self-reported, interest, planned and unverified content explicitly.
2. **Design foundation:** retain Vite/React and npm lockfile. Use a warm editorial light theme and complementary ink dark theme with semantic tokens, strong typography, local icons, focus states, responsive containers and reduced motion. Replace CDN-dependent utilities without adding an unjustified framework.
3. **Home and identity:** display full actual name, self-reported undergraduate identity, exact requested supporting message, authentic portrait, work/research CTAs and supplied social contacts. Implement an optional accessible Engineering/Research lens; keep a useful default.
4. **Verified work:** select a flagship and supporting projects using code evidence. Create stable filtered cards, clearly illustrative fallback artwork and real `/work/[slug]` case-study routes. Cover contribution limits, architecture, decisions, tests, known limitations and source links; label demos conservatively.
5. **Research and toolkit:** implement `/lab` as an honest interest/question atlas with keyboard-operable topic selection and readable static content. Restore the complete requested technology inventory with project-backed, self-reported and exploring labels. Hide unsupported academic details and empty publication/experiment lists.
6. **Writing infrastructure:** prepare structured journal entries and route support but keep empty writing out of navigation; publish only real decisions with evidence, including clearly dated decisions made for this portfolio if useful.
7. **Contact and GitHub:** use static reviewed evidence with direct profile links and timestamps, no client API tokens or fake live stats. Keep concise email/social contact; expose a form only when provider delivery can be established and error/privacy behavior is complete.
8. **Validation:** add content/evidence/link tests and critical browser journeys suited to this JavaScript stack. Check all requested widths (320, 375, 768, 1024, 1440, 1920), both themes, keyboard focus, reduced motion, direct route loading/back/refresh, filtering and contact links. Use local browser observations or Lighthouse where available; make no conformance or field-metric guarantee.
9. **SEO and handoff:** correct canonical host and route metadata, valid social preview/favicon/sitemap/robots and static-host rewrites. Capture after screenshots, record actual checks/performance, setup/environment guide, readiness checklist, changed-file summary and unresolved limitations. Public deployment requires the user's explicit approval.

## Baseline limitations

- Network restrictions prevented reliable third-party visual dependencies. Screenshots intentionally show what actually rendered; they are not a controlled production benchmark.
- The SVG source filesystem denial prevented a complete baseline build. Its Git object remained readable, and its original contents were not changed during the audit.
- Public GitHub evidence discovery is documented separately. Local descriptive copy is not independent verification of another project's implementation or personal authorship.
- Existing contact provider delivery, private records, authentic certificate files and unsupported contact/profile fields were not verified. Missing evidence should be addressed through omission or explicit labels, not invention.
