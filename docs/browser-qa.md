# Browser QA

Run date: 6 November 2026 (Asia/Dhaka). The reproducible harness is [`scripts/browser-qa.mjs`](../scripts/browser-qa.mjs). Browser output, measurements and screenshots are stored in [`docs/screenshots/`](screenshots/).

## Method

The harness reuses an existing Playwright Core installation and local Chromium executable. It installs no dependencies and makes no external account changes. A global route handler intercepts **all POST requests**, including a configured alternative contact endpoint. Contact scenarios use synthetic local responses and an `example.invalid` sender. No real email or form submission is sent. The GitHub popup test also intercepts its destination locally and checks URL/opener behavior without claiming that the remote repository loaded during that test.

Run a local server, then:

```powershell
npm.cmd run dev -- --host 127.0.0.1
# In another terminal:
node scripts/browser-qa.mjs
```

Optional environment variables:

Set `QA_STATIC_EXPORT=1` to include the production-only checks for raw metadata, complete no-JavaScript content, local favicon/social assets, and external core-resource requests.

| Variable                | Purpose                                                                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `QA_BASE_URL`           | Preview origin; defaults to `http://127.0.0.1:5173`. Set to a production-preview origin to exercise generated HTML and assets.                                                                        |
| `QA_PLAYWRIGHT_CORE`    | Absolute directory or entry path of an already-installed `playwright-core` package. The harness first checks local node_modules, then the known existing sibling-project package on this workstation. |
| `QA_BROWSER_EXECUTABLE` | Local Chromium/Chrome/Edge executable. Known local browser/cache paths are detected when omitted.                                                                                                     |
| `QA_AXE_CORE`           | Absolute path to an already-installed `axe.min.js`. Local and known sibling-package locations are detected. Required for the full accessibility scan.                                                 |
| `QA_OUTPUT_DIR`         | Artifact directory; defaults to `docs/screenshots`.                                                                                                                                                   |
| `QA_CHECK_PATTERN`      | Optional regular expression to rerun selected named checks after a fix. Omit for the complete suite.                                                                                                  |

The JSON report stores individual check results, all **96 route/theme/width combinations** (eight routes × six widths × two themes), per-route axe results and local browser observations. Requested widths are **320, 375, 768, 1024, 1440 and 1920 pixels**. The full accessibility pass covers every route in both themes using WCAG 2 A/AA, WCAG 2.1 A/AA and WCAG 2.2 AA rule tags.

## Checks and observed behavior

The test journeys cover real user outcomes:

- Homepage full identity, authentic portrait loading, single main/H1 and screenshots.
- Project filters, visible project counts, pressed states and restored complete gallery.
- Keyboard activation of the Engineering/Research lens and corresponding content order.
- Technology evidence filtering, search, native details disclosure, relevant project link and empty state.
- Lab topic selection, keyboard operation, seven readable static interest notes and notebook anchors.
- Homepage research links reaching their intended notebook targets.
- Journal entries, keyboard-readable code, hash navigation and refresh.
- All five case studies: gallery navigation, correct URL/title, 13 content sections, source links, architecture selection/static descriptions and direct refresh.
- Browser Back/Forward, incoming contact anchor and an honest noindex missing-page fallback.
- Theme change, contrasting semantic background colors and persistence across reload.
- Mobile menu Tab loop, Escape, opener focus restoration, hidden-link exclusion and route focus.
- Skip link and main-content focus.
- Reduced-motion preference: static visible heading, automatic scroll behavior and no running long animations.
- Native contact validation, local success, throttling, provider rejection, network failure, retained input, honeypot and email fallback.
- Source action opening the intended isolated tab with no opener access.
- axe scans, including text contrast and accessible names; unhandled application runtime errors.

Initial checks found and reported narrow-screen overflow (home at 320 pixels, Journal at 320/375), inaccessible illustration/wordmark naming, illustration-text contrast issues and research links using nonexistent fragment IDs. These findings were sent for correction. Harness-only assumptions were corrected separately: hash-only visits can return no HTTP response; the footer also has a source link; reviewed frontend-only clients must not be counted as full-stack projects.

## Development-preview results

Chromium **156.0.8078.4**, headless, local Vite server. The complete post-fix run passed **16 of 17** groups; the sole remaining group reported five illustration-link accessible-name mismatches in each theme. After the illustration became static and its existing title/action links were retained, the affected verification passed **4 of 4** groups:

| Area                | Actual result                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Responsive geometry | **96/96 combinations** with no horizontal document overflow.                                                                                                           |
| Functional journeys | All filters, lens, toolkit, research links/Atlas, Journal, five case studies, history/refresh, themes, mobile keyboard/focus, reduced motion and contact mocks passed. |
| Full local-link map | Every internal link resolved to a known rendered route and existing fragment target.                                                                                   |
| Final axe rerun     | **16/16 route/theme scans, zero violations** under the selected WCAG A/AA tags.                                                                                        |
| Runtime exceptions  | **Zero** unhandled application exceptions.                                                                                                                             |
| Contact safety      | Success, rate limiting, HTTP rejection, network failure, input retention, native validation and honeypot tested with local mocks. No message delivered.                |

The complete pre-final-name-fix run is preserved in `screenshots/browser-results-development-full.json`; the affected post-fix report is saved before production validation as `screenshots/browser-results-development-affected.json`. Initial failed geometry and accessibility checks prompted actual fixes. They were rerun, rather than omitted or disabled.

One development-performance observation coincided with a Vite hot reload and recorded an incomplete document. That observation is **invalid and excluded from performance claims**. The harness now measures a fresh settled navigation. Stable production-preview observations and full results are added when that preview is available.

## Production-preview results

The stable production build was served at `http://127.0.0.1:4173` and tested separately:

```powershell
$env:QA_BASE_URL = 'http://127.0.0.1:4173'
$env:QA_OUTPUT_DIR = 'docs/screenshots/production'
$env:QA_STATIC_EXPORT = '1'
node scripts/browser-qa.mjs
```

The full production run passed **18 of 19** groups, including all interactive journeys, all local links, all 96 responsive combinations, and all 16 accessibility scans with zero violations. The additional raw-document/no-JavaScript check exposed a serving-path issue: extensionless routes received Vite's root fallback, while trailing-slash and explicit directory-index paths received the correct generated document. JavaScript had masked the incorrect raw response. The build was corrected to emit equivalent flat `.html` aliases alongside directory documents.

The final focused rerun then passed **4 of 4** groups: Journal deep links/refresh, history/anchors/missing page, the complete static-export check, and runtime exceptions. The static-export check directly verified **all eight extensionless routes** with JavaScript disabled: correct raw title/canonical/OG/Twitter metadata, all five case studies with 13 sections each plus architecture/evidence, seven Lab interests, three Journal notes, and the homepage identity/project summaries. It also verified the generated 404 noindex page, local favicon/social-image HTTP 200 responses, **1200 × 630** social-image dimensions, and no external visual/script/font dependency. No tested failure remains after the affected checks were rerun.

| Final production coverage | Actual result |
| --- | --- |
| Routes × themes × requested widths | **96/96** without horizontal document overflow |
| WCAG A/AA automated route/theme scans | **16/16**, zero axe violations |
| Interactive journeys and local link targets | All passed |
| Raw metadata and full no-JavaScript content | All eight known routes passed |
| Contact outcomes | Local mocks only; no real message sent |
| Unhandled runtime exceptions | Zero |

The full production report is `screenshots/production/browser-results-full.json`; the final affected report is `screenshots/production/browser-results.json`. Full-page and viewport-only desktop/mobile screenshots in both themes, Lab, case-study, and no-JavaScript case-study screenshots are in the same production directory.

The settled production homepage navigation reported:

| Local observation | Value |
| --- | --- |
| DOM elements | 1,220 |
| Serialized document characters | 68,612 |
| Reported local resource-transfer bytes | 198,739 |
| DOMContentLoaded / load | 107.5 / 107.6 ms |
| Local LCP candidate | 208 ms |
| Observed maximum layout-shift session | 0 |
| Third-party visual/script/font resources | None |

This navigation followed screenshot visits in the same browser context, so caches were warm; no network/CPU throttling was applied. These are diagnostics of this local preview, not a cold-load benchmark or a performance guarantee. No field population or INP measurement was collected. The baseline used a development server and unavailable external resources, so its timings and transfer count are not directly comparable with these production-preview observations.

## Scope and limits

Browser checks combine actual keyboard interaction, rendered geometry, screenshots and axe analysis. Automated checks cannot establish WCAG conformance. Screen-reader announcements have not been tested with a real assistive-technology session. Chromium is the only engine exercised here; real Safari/Firefox and physical mobile devices remain separate checks.

The local LCP/layout-shift observers and development-resource measurements are observations from an unthrottled headless browser. They are **not** Lighthouse scores, field Core Web Vitals or an INP measurement. Baseline and final development observations include Vite transforms/HMR, so they should not be substituted for deployed production measurements.

The generated extensionless entry documents and no-JavaScript content passed the local production preview checks. The remote host's behavior and crawler access still require a deployment-preview check. Formspree account ownership and real inbox delivery remain unverified because no message was sent.
