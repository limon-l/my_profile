# Limon Roy Apu — The Digital Atelier

A portfolio for a CSE undergraduate and research-minded developer, built with the existing React 18 and Vite 5 stack. It brings selected software projects, research questions, and current engineering decisions into one evidence-aware site.

The educational identity is self-reported. Research topics are labeled as interests. Project case studies describe reviewed source and its limitations; source review does not establish sole authorship, production reliability, or successful external-service operation.

## Run locally

Use Node.js 22 or later and npm. The committed `package-lock.json` records the dependency tree. No environment variables are required to start the site.

```sh
npm ci
npm run dev
```

On Windows PowerShell, use `npm.cmd` if the execution policy blocks `npm.ps1`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open the local URL printed by Vite. Its configured development port is 5173; Vite may select another port if that port is occupied.

## Commands

| Command                | Purpose                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite development server.                                                            |
| `npm run build`        | Build the application, then prepare public assets and route-specific HTML metadata in `dist`. |
| `npm run preview`      | Serve the generated production build locally. Run the build first.                            |
| `npm run check`        | Check the local content manifests and their evidence/link relationships.                      |
| `npm test`             | Run the repository's automated checks.                                                        |
| `npm run test:browser` | Run browser checks; browser tooling must be available in the execution environment.           |

Use the equivalent `npm.cmd` commands on Windows. These are execution instructions, not a claim that every check has passed. Actual results and environment limitations belong in the verification report.

Browser checks use an already installed `playwright-core`, Chromium-compatible browser, and `axe-core/axe.min.js`. The script never downloads dependencies or browsers. Start the application in another terminal before `test:browser`; its default target is `http://127.0.0.1:5173`. The `QA_PLAYWRIGHT_CORE`, `QA_BROWSER_EXECUTABLE`, `QA_AXE_CORE`, and `QA_BASE_URL` overrides are documented in [deployment readiness](docs/deployment-readiness.md).

## Application structure

| Path                          | Responsibility                                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/main.jsx`                | Mounts the active application and loads its styles.                                                          |
| `src/AtelierApp.jsx`          | Shared shell, lightweight History API routing, route loading, theme state, and client-side metadata updates. |
| `src/atelier.css`             | Semantic dark/light tokens, responsive layouts, focus states, and reduced-motion behavior.                   |
| `src/components/ui.jsx`       | Shared links, buttons, evidence labels, headings, icons, and code presentation.                              |
| `src/components/Atelier*.jsx` | Main identity, navigation, contact, and shared page components.                                              |
| `src/pages/`                  | Research Lab, Engineering Journal, and project case-study pages.                                             |
| `src/content/profile.js`      | Owner-provided identity, public contact links, and technology inventory.                                     |
| `src/content/projects.js`     | Selected projects, reviewed revisions, linked sources, architecture, and limitations.                        |
| `src/content/research.js`     | Open research questions and learning directions, each labeled as an interest.                                |
| `src/content/journal.js`      | Decisions recorded during this redesign, with evidence paths and trade-offs.                                 |
| `scripts/generate-pages.mjs`  | Post-build public-asset preparation, route entry documents, and sitemap generation.                          |
| `docs/`                       | Audit, project evidence, verification material, preserved originals, and deployment guidance.                |

The home page has an optional Engineering/Research perspective control, filtered project and technology collections, source links, and contact methods. The research notebook is available at `/lab`; implementation notes are at `/journal`; individual case studies use `/work/<slug>`.

## Updating content

Edit the local content modules rather than fetching unreviewed GitHub descriptions into the browser. Review new project claims against source code and link the relevant revision or artifact. A project's repository URL alone does not establish each feature claimed for it.

The public interface distinguishes `verified`, `self-reported`, `interest`, `planned`, and `unverified` evidence. Project manifests also expose the corresponding explicit evidence vocabulary. A project-backed technology means it appears in reviewed source; it is not a proficiency score. AI and machine learning remain learning interests unless an inspectable implementation supports a stronger claim.

Keep education dates, institutions, credentials, research artifacts, testimonials, and employment out of the public profile until appropriate evidence exists. Hide empty artifact sections rather than filling them with invented entries. Project visuals in the new gallery are labeled illustrations, not product screenshots.

## Environment and contact

The contact form preserves the existing public Formspree endpoint, `https://formspree.io/f/myzlybdj`. An optional `VITE_CONTACT_ENDPOINT` in `.env.local` can select another approved, browser-accessible endpoint. Restart the development server after changing it; rebuild for a production change.

`VITE_` variables are included in browser code. Use a public submission URL only. Do not put API secrets, private tokens, or mail credentials in them or in the content modules. This portfolio requires no GitHub authentication token.

The form includes native field constraints, a honeypot, a client-side cooldown, timeout handling, and a success state gated on the provider's HTTP acceptance. Provider ownership, actual inbox delivery, and production spam protection require separate verification. Automated form tests must intercept requests; a simulated acceptance is not a live delivery test. The email link remains available directly.

## Metadata and public assets

The build emits entry documents for known routes with page-specific titles, descriptions, canonical URLs, and social metadata. React renders the interactive page body; these entry documents are not a full server-rendered copy of each page. Generated documents also include complete readable no-JavaScript text for the case studies, Lab, journal, and a homepage identity and project summary.

The post-build script copies an explicit public-asset list and generates the sitemap. The original `public/hero.jpeg` portrait remains the identity image. The retained `public/hero.svg` caused a baseline copy error on this host, so it is neither referenced by the new interface nor included in the curated build assets. New local favicon and social-preview assets avoid critical third-party widget dependencies.

The configured public origin is `https://my-profile-green-beta.vercel.app`. If the deployment domain changes, update the origin in `index.html`, `src/AtelierApp.jsx`, and `scripts/generate-pages.mjs`, then rebuild and review canonicals, social images, robots, and the sitemap.

## Preserved source and audit

Original application, style, document, and README snapshots are retained under `docs/legacy/`. The older `src/App.jsx`, `src/index.css`, `src/data/data.js`, and legacy components also remain in the repository. The active entry point imports `AtelierApp` and `atelier.css`; those retained modules are not the current public interface. Their historical content is not a source of verified claims for the redesign.

Start with [the repository audit](docs/repository-audit.md) and [the dated project evidence ledger](docs/project-evidence.md). Deployment checks and environment guidance are in [deployment readiness](docs/deployment-readiness.md).

## Deployment

The existing Vercel configuration builds with `npm run build` and serves `dist`. Generated route entry documents support direct requests to the known Lab, Journal, and case-study URLs; verify nested-route refreshes on a preview deployment before release.

The repository is prepared for review. No public deployment or external-account change is performed as part of the local transformation.
