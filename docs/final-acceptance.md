# Final acceptance — The Digital Atelier

Completed locally on 6 November 2026, Asia/Dhaka. Public project evidence was reviewed on 5 November. The existing React 18 / Vite 5 application was retained. No production deployment was initiated.

## Delivered experience

- Editorial homepage with Limon Roy Apu’s authentic existing photograph, full name, requested undergraduate/developer identity, supplied supporting copy and public contacts.
- Semantic light/dark themes, optional Engineering/Research perspective, a restrained pointer-responsive grid, keyboard navigation, focus restoration and reduced-motion behavior.
- Five source-reviewed project studies: Ponnaloy, Wanderlust, BookCourier, MetroBridge and BD Blood Finder. Each has 13 sections, inspectable source links, contribution boundaries, architecture exploration and explicit limitations.
- Research Lab with seven labeled interests, an interactive Question Atlas and a complete static notebook; no invented publications or experiments.
- Forty-six technology entries with project-backed, self-reported and interest categories, search and disclosures. No skill percentages or proficiency claims.
- Three implementation decisions written during this redesign, rather than invented historical writing.
- Source/profile links and the existing Formspree integration, with validation, timeout/error/acceptance feedback, honeypot, cooldown and direct email fallback.
- Eight static route entry documents, matching clean-URL aliases, full readable no-JavaScript text, route-specific metadata, sitemap, robots, favicon, social image and a noindex missing-page document.

## Actual verification

| Check | Result |
| --- | --- |
| `npm.cmd run build` | Passed: 49 modules; eight route documents, clean-URL aliases, 404 and required assets packaged. |
| `npm.cmd run check` | Passed: 5 projects, 46 technologies, 7 interests, 3 decisions; evidence, source pins and content relationships validated. |
| `npm.cmd test` | 11 tests passed, zero failures. Includes malicious-content escaping, missing evidence, metadata consistency, asset failures and real temporary packaging. |
| Production responsive geometry | 96 combinations passed: 8 routes × 6 widths × 2 themes. Widths: 320, 375, 768, 1024, 1440, 1920 pixels. |
| Production automated accessibility | 16 route/theme axe scans; zero violations under the selected WCAG A/AA rules. Some contrast evaluations require human review; this is not a conformance claim. |
| Interactive journeys | Passed: project/toolkit filters, lens, Atlas, five studies, architecture, themes/persistence, keyboard menu/focus, skip link, reduced motion, history/refresh and internal fragments. |
| Contact | Native validation, acceptance, cooldown, provider rejection, network error, input retention and honeypot passed with local mocks. No real message was sent. |
| Raw production HTML / JavaScript disabled | All eight extensionless routes passed for correct metadata and readable route content. All five case studies expose their 13 sections without JavaScript. |
| Assets / external dependencies | Local portrait, favicon and 1200 × 630 social image load. No third-party visual/script/font request is required. |
| Runtime / source consistency | Zero unhandled browser exceptions. `git diff --check` passed. |
| Lint / TypeScript | Neither was configured in the original JavaScript repository; no lint or TypeScript result is claimed. Vite compilation and the content/test/browser checks were executed. |

The complete production browser run passed 18 of 19 groups and exposed the clean-URL static-document defect. After the generator emitted matching flat HTML aliases, the four affected groups were rerun and passed. Earlier failures were corrected and preserved in the audit trail; tests were not disabled. See [browser QA](browser-qa.md) and its linked raw reports for exact coverage and incomplete automated checks.

## Measurements and their limits

| Build artifact | Baseline code-only diagnostic | Final production build |
| --- | --- | --- |
| CSS | 72.54 kB / 14.17 kB gzip | 46.37 kB / 9.93 kB gzip |
| Initial JavaScript | 237.45 kB / 71.23 kB gzip | 213.19 kB / 68.54 kB gzip |
| Deferred route chunks | None separately emitted | Lab 3.87 kB, case study 4.94 kB, Journal 5.54 kB |

The baseline full-site build failed reading the unused `public/hero.svg`. A diagnostic build excluding public assets established its code-only bundle sizes; that was not a successful full baseline build. The final build copies only its explicit required assets and leaves the original file intact.

An unthrottled, settled, warm local production-preview navigation recorded LCP 208 ms, cumulative layout shift 0, DOMContentLoaded 107.5 ms and 1,220 DOM elements. These are local diagnostics, not Lighthouse scores or field Core Web Vitals. INP and deployed field performance were not measured. No guaranteed performance claim is made.

## Preservation, branch and change summary

Work is on `feat/research-engineer-atelier`, with its GitHub upstream configured. `main` was retained. Existing user commits `6119d46` and `4d98e68` (`polish site`) were preserved without amendment. The push issue was resolved by pushing the feature branch and setting its upstream; the remote and credentials were unchanged.

The active entry now mounts `src/AtelierApp.jsx` and `src/atelier.css`. New components, pages and local content modules implement the experience; the original `src/App.jsx`, stylesheet, data and components remain available. Original document/style/application/README snapshots are also retained in `docs/legacy/`. Unsupported public claims were omitted from the new interface, rather than erased from the owner’s historical source.

The final follow-up changes cover static-route aliases and their packaging regression, the design-system guide, final browser evidence and this acceptance record. No destructive source operation, framework migration, paid service, credential change or production deployment was performed.

## Documentation and review artifacts

- [Repository audit and original architecture](repository-audit.md)
- [Project evidence and review boundaries](project-evidence.md)
- [Implemented design system](design-system.md)
- [Browser checks, commands and actual results](browser-qa.md)
- [Environment, hosting and release checklist](deployment-readiness.md)
- [Setup and content guide](../README.md)
- [Original desktop](screenshots/before-desktop.png) / [original mobile](screenshots/before-mobile.png)
- [Final desktop](screenshots/production/after-desktop-hero.png) / [final light theme](screenshots/production/after-desktop-hero-light.png) / [final mobile](screenshots/production/after-mobile-hero.png)
- [Full final homepage](screenshots/production/after-desktop.png) / [Lab](screenshots/production/after-lab.png) / [case study](screenshots/production/after-case-study.png) / [no-JavaScript case study](screenshots/production/after-no-javascript-case-study.png)

## Remaining release boundaries

- Production hosting, its redirects/security headers and social crawler rendering need validation after an explicitly authorized deployment. Local preview passing does not prove host behavior.
- Existing Formspree account ownership, inbox delivery and provider spam controls were not verified. The form reports acceptance only after an HTTP success; direct email remains available.
- Real Safari/Firefox, physical mobile devices and a real screen-reader session were not tested. Automated accessibility results do not establish WCAG conformance.
- Project evidence is a dated source snapshot. External project tests were inspected, not executed; demo HTTP checks do not establish backend behavior, security, production readiness or personal authorship.
- Institution, academic dates/GPA, credentials, work history, testimonials and research achievements remain omitted until supported. The original unused SVG remains unreadable through the local filesystem; it is not required by the new build.
