# Deployment readiness

This is a release checklist for the prepared local portfolio. It does not record a public deployment or certify that every item has passed. The baseline audit and final verification report provide execution evidence and remaining limitations.

## Build environment

- Use Node.js 22 or later and npm with the committed lockfile.
- Install dependencies from the repository root with `npm ci`.
- Use `npm.cmd` in Windows PowerShell when execution policy blocks `npm.ps1`; no global policy change is needed.
- No environment variables are required for the site or its static content.
- Browser checks need the browser automation runtime available to the test runner. Record any unavailable prerequisite as a limitation.

Run the configured checks before release:

```sh
npm ci
npm run check
npm test
npm run build
npm run test:browser
```

Windows equivalents:

```powershell
npm.cmd ci
npm.cmd run check
npm.cmd test
npm.cmd run build
npm.cmd run test:browser
```

Preview the built site with `npm run preview -- --host 127.0.0.1`, or `npm.cmd run preview -- --host 127.0.0.1` on Windows. Use the URL printed by the server. A local preview is not a public release.

## Environment and submission provider

| Variable                | Required | Behavior                                                                                                                                                     |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `VITE_CONTACT_ENDPOINT` | No       | Overrides the existing public Formspree submission URL. It must be suitable for direct browser submissions and the current form's request/response contract. |

The existing default is `https://formspree.io/f/myzlybdj`. Place an approved override in a local `.env.local` file or in the hosting project's build environment. Restart development or rebuild the production bundle after changes. Values prefixed with `VITE_` are public in the compiled browser code; they must not contain private credentials.

Before relying on the form for real correspondence, establish that the owner controls the destination and that the provider delivers to the intended inbox. If conducting an authorized live test, distinguish provider acceptance from inbox receipt. The local transformation makes neither claim. Browser tests should mock submission responses to avoid sending messages to the external service.

The honeypot and cooldown are client-side controls. Review the provider's actual spam/rate controls separately. Check the error state and email fallback when the service is unavailable, returns an error, or times out.

## Hosting output and route checks

The existing `vercel.json` selects `npm run build` and the `dist` output directory. No framework migration or server secret is required. `scripts/generate-pages.mjs` runs after Vite to prepare the curated public assets, known route documents, and sitemap.

The release artifact should contain the root entry and entry documents for:

- `/lab`
- `/journal`
- `/work/ponnaloy`
- `/work/wanderlust`
- `/work/book-courier`
- `/work/metrobridge`
- `/work/bd-blood-finder`

Check direct navigation, browser refresh, internal navigation, Back/Forward, and fragment links for each route. Generated HTML supplies route-specific metadata; the page body is rendered by React. On a different static host, confirm that its clean-URL handling serves the generated directory entry documents. A blanket rewrite must not hide the intended route metadata or missing-page behavior.

The new interface uses `hero.jpeg`, local favicon and social-preview assets, and explicit generated output. Preserve the original `public/hero.svg`; the curated build omits it because it caused an access error in the baseline environment. Its omission must not conceal a broken reference: verify the built site requests no missing legacy asset.

## Content and metadata review

- Check that every selected project has the correct source, reviewed revision, contribution boundary, and known limitations.
- Keep self-reported education distinct from independently verified qualifications.
- Keep AI/ML and research questions labeled as interests until real artifacts justify additional claims.
- Check project images are described as illustrations where authentic screenshots are absent.
- Confirm source/demo links and contact addresses. A reachable page alone does not establish the external application's operation.
- Confirm canonical and social URLs use the intended release origin. The prepared origin is `https://my-profile-green-beta.vercel.app`.
- Inspect root and nested-route titles/descriptions in the emitted HTML, not only the running DOM.
- Check favicon, social-preview image, robots directives, and sitemap URLs from the built output.
- Review preview metadata and social-card image access after hosting; local checks cannot prove crawler behavior on the host.

If changing the domain, update `index.html`, `src/AtelierApp.jsx`, and `scripts/generate-pages.mjs` together, rebuild, and repeat the checks. Avoid publishing duplicate canonical origins unintentionally.

## Interaction and accessibility review

- Check narrow mobile layouts, desktop layouts, and browser zoom without horizontal content loss.
- Follow the skip link and all critical controls using the keyboard. Verify visible focus and useful focus placement after route and fragment navigation.
- Exercise both themes, perspective selection, project filters, toolkit filters/search, architecture controls, and the Research Question Atlas.
- Confirm each research topic remains readable in the complete notebook below the interactive atlas.
- Check reduced-motion behavior and the page when external fonts or services are unavailable.
- Exercise contact validation, mocked acceptance, rejected response, timeout, cooldown, and the direct email fallback.
- Review a missing route and verify it does not receive indexable metadata.

Record the actual viewport sizes, browser/runtime, automated results, screenshots, and any manual checks in the final verification report. Report measured performance with the measurement method; do not infer field Core Web Vitals from a local build or unthrottled development load.

## Release boundary

The implementation and static output are prepared for review. Public hosting, production-domain behavior, actual inbox delivery, and social crawler rendering remain separate release checks. No public deployment, hosting-account change, credential change, or live message is implied by this checklist.
