# Public project evidence ledger

Review date: **2026-11-05**, using the owner’s Asia/Dhaka date. Public repository code and metadata were read through documented unauthenticated GitHub REST endpoints and raw source URLs. Read-only HTTP GET requests checked advertised public pages. No credentials were supplied, no forms were submitted, and no external project was installed or executed.

`VERIFIED` in the portfolio manifest means a specific implementation or dependency is directly supported by reviewed source. It does **not** certify a whole project, a live service, security, production readiness, accessibility, or the owner’s sole authorship. Owner/README execution claims remain **SELF-REPORTED**; future improvements are **PLANNED** suggestions from this review. Missing evidence is recorded without treating it as evidence of failure.

## Review inventory and placement

| Project | Reviewed default-branch revision | Last source push reported by GitHub | Placement | Source scope |
| --- | --- | --- | --- | --- |
| [Ponnaloy](https://github.com/limon-l/Ponnaloy-e-com) | `56c97952737a3a8803303880a4b7368ee0e301d1` | 2026-11-05 | Flagship | Full-stack monorepo, API authorization/pricing/schema, test definitions |
| [Wanderlust](https://github.com/limon-l/my_travel_client) | `734f6c2111e49a7fed202de19a9394168a9c5fc1` | 2026-04-04 | Major | Next.js client, auth/session configuration, booking and admin requests |
| [BookCourier](https://github.com/limon-l/book-courier-client) | `35b13252c97cf39c375a414e922a9bdd8168df69` | 2026-03-10 | Major | React client, Firebase provider, role routing, token hooks, Stripe UI |
| [MetroBridge](https://github.com/limon-l/metroBridge-client) | `843abbdaec3e1a2bc711f22e33ff40d277aa1e4a` | 2026-06-18 | Additional | React client, HTTP/socket services, auth guard, meeting UI limits |
| [BD Blood Finder](https://github.com/limon-l/bd-blood-bot) | `8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7` | 2026-07-13 | Additional | Worker, Telegram handlers, Supabase queries, test scaffold |

All five repository metadata responses reported public, non-archived repositories that were not GitHub forks. A push date is repository metadata, not evidence of continuous maintenance. No stars, language percentages, contributions graph, or adoption statistics are republished.

The source manifest is [src/content/projects.js](../src/content/projects.js). It contains thirteen case-study sections per project, explicitly scoped evidence labels, pinned file links, checked demo links, limitations, and static architecture descriptions. Architecture items describe reviewed boundaries; they do not imply a measured deployment topology.

## Attribution boundaries

The documented `GET /repos/limon-l/{repository}/contributors?per_page=10` endpoint listed the account `limon-l` for each candidate. This verifies account-level contribution metadata only. It does not prove sole authorship, ownership of every feature, absence of templates, identity of unlinked contributors, or the extent of AI assistance. Each public case study preserves this distinction and avoids invented first-person accomplishment claims.

Source links use the reviewed Git commit, so future branch changes do not silently change the supporting evidence. The revision was obtained from `GET /repos/limon-l/{repository}/git/trees/main?recursive=1`; dependency declarations were read from the corresponding package manifests. No personal access token or runtime GitHub request is required by the portfolio.

## HTTP link observations

These are single GET observations with a 15-second request timeout, not browser functionality tests or uptime measurements.

| Advertised page | Observation | Public treatment |
| --- | --- | --- |
| `https://ponnaloy-e-com-api.vercel.app` | URL open timed out | Demo URL omitted; timeout explained in case study |
| `https://my-travel-client.vercel.app/` | HTTP 200; title `Wanderlust Agency` | Demo link available with limited verification statement |
| `https://lighthouselibrary.vercel.app` | HTTP 200; title `Light House` | Demo link available with limited verification statement |
| `https://metro-bridge.vercel.app` | HTTP 200; title `MetroBridge` | Demo link available with limited verification statement |
| `https://telegram.dog/blood_boss_bot` | HTTP 200; Telegram launch listing | Labelled Telegram listing; no bot functionality claim |

The documented Wanderlust API base `https://my-travel-server-0d5q.onrender.com/api`, BookCourier’s source-configured base `https://lighthouse-server-three.vercel.app`, and MetroBridge’s production HTTP base `https://metrobridge-server.onrender.com/api` timed out. No authenticated or mutation endpoints were called. A timeout does not establish that an application or backend is unavailable; it leaves reachability unresolved in this environment. The frontend case studies do not claim those backend implementations were reviewed.

## Ponnaloy

The repository’s About description still mentions plain HTML/JavaScript, Express, and SQLite. Its **current source differs materially**: the [workspace manifest](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/package.json#L6) and [web manifest](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/web/package.json#L40) establish a pnpm/Turborepo workspace with Next.js 15 and React 19. The [API manifest](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/package.json#L21) establishes Fastify, Prisma, Zod, TypeScript tooling, and Vitest. The [schema](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/prisma/schema.prisma#L5) selects MongoDB.

Observed implementation:

- [apps/api/src/middleware/auth.ts, lines 116–152](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/src/middleware/auth.ts#L116): authenticated, administrator, and super-administrator guards.
- [apps/api/src/middleware/seller.ts, lines 84–174](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/src/middleware/seller.ts#L84): active membership resolution, seller selection, approval checks, and action permissions.
- [apps/api/src/services/pricing.ts, lines 45–113 and 137 onward](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/src/services/pricing.ts#L45): coupon validity windows, usage/minimum checks, bounded discounts, and integer-price validation.
- [apps/api/src/server.ts, lines 173–201](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/src/server.ts#L173): API route registration, including commerce, seller, and administration domains.
- [marketplace.integration.test.ts](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/test/marketplace.integration.test.ts), [pricing.test.ts](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/api/test/pricing.test.ts), and [storefront.spec.ts](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/apps/web/e2e/storefront.spec.ts): real assertions for authorization, tenant isolation, orders, pricing, browser smoke checks, and axe checks. Presence was verified; execution was not reproduced.

The [author’s verification report](https://github.com/limon-l/Ponnaloy-e-com/blob/56c97952737a3a8803303880a4b7368ee0e301d1/VERIFICATION_REPORT.md#L14), dated 2026-11-01, reports passing suites. This is a documented author claim rather than new test evidence from this review. It also lists incomplete admin interfaces, local-only wishlist behavior, cart reconciliation concerns, and unexercised provider integrations (lines 25–33). The README reports a different API test count; neither count is displayed as an independently reproduced portfolio metric. Screenshot directory inventory contained only `.gitkeep`; no current screenshot was adopted as observed UI evidence.

## Wanderlust

[package.json, lines 10–30](https://github.com/limon-l/my_travel_client/blob/734f6c2111e49a7fed202de19a9394168a9c5fc1/package.json#L10) supports Next.js 16, React 19, NextAuth, Axios, and Tailwind CSS. [src/lib/auth.jsx, lines 12–67](https://github.com/limon-l/my_travel_client/blob/734f6c2111e49a7fed202de19a9394168a9c5fc1/src/lib/auth.jsx#L12) delegates credentials to the external API, conditionally configures Google OAuth, and propagates user ID/role to JWT sessions. [src/proxy.js, lines 3–17](https://github.com/limon-l/my_travel_client/blob/734f6c2111e49a7fed202de19a9394168a9c5fc1/src/proxy.js#L3) wraps protected paths with NextAuth.

[src/components/BookButton.jsx, lines 19–97](https://github.com/limon-l/my_travel_client/blob/734f6c2111e49a7fed202de19a9394168a9c5fc1/src/components/BookButton.jsx#L19) checks UI role state, loads available dates, and submits a booking request with error/loading handling. [dashboard/requests/page.jsx, lines 31–150](https://github.com/limon-l/my_travel_client/blob/734f6c2111e49a7fed202de19a9394168a9c5fc1/src/app/(protected)/dashboard/requests/page.jsx#L31) includes role-aware rendering, independent load results, approval requests, and date-management calls.

The source includes an administrator-email fallback and client-supplied booking fields. This warrants backend authorization and integrity review; frontend source alone does not establish a vulnerability or prove secure enforcement. Express is named in repository documentation, but backend implementation was not reviewed, so Express is excluded from this client’s verified stack. No test files, test script, or CI workflow were found in the retrieved default-branch tree.

## BookCourier / LightHouse

[package.json](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/package.json) supports React 19, Vite 7, React Router 7, Firebase, TanStack Query, Stripe, Tailwind, and Leaflet. A dependency declaration establishes available tooling, not complete operation of every integration.

- [src/routes/Router.jsx, lines 31–120](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/routes/Router.jsx#L31): public catalogue, reader dashboard, librarian, and administrator route composition.
- [src/routes/AdminRoute.jsx, lines 6–19](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/routes/AdminRoute.jsx#L6) and [src/hooks/useRole.jsx, lines 9–15](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/hooks/useRole.jsx#L9): UI guards and asynchronous API role retrieval.
- [src/providers/AuthProvider.jsx, lines 23–72](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/providers/AuthProvider.jsx#L23): Firebase methods, auth observation, and external `/jwt` token acquisition.
- [src/hooks/useAxiosSecure.jsx, lines 16–43](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/hooks/useAxiosSecure.jsx#L16): API token attachment, auth-error response behavior, and interceptor cleanup.
- [src/pages/Dashboard/User/CheckoutForm.jsx, lines 20–88](https://github.com/limon-l/book-courier-client/blob/35b13252c97cf39c375a414e922a9bdd8168df69/src/pages/Dashboard/User/CheckoutForm.jsx#L20): client-supplied payment-intent price, Stripe confirmation, then separate payment-record creation.

The review does not establish backend identity verification, authoritative pricing, webhook processing, delivery execution, or recovery after a successful provider payment and failed persistence request. No actual charge or authenticated action was performed. No automated test command or CI workflow was found in the retrieved tree. MongoDB appears as a client dependency, but that alone is insufficient to describe an implemented backend or database architecture.

## MetroBridge

[package.json](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/package.json) supports React 19, Vite 8, React Router 7, Axios, Socket.IO client, and Tailwind. The project describes an academic community context; that description does not verify the owner’s institution or an institutional affiliation.

- [src/components/auth/ProtectedRoute.jsx, lines 4–25](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/components/auth/ProtectedRoute.jsx#L4): loading, auth, and allowed-role handling in the client.
- [src/context/AuthContext.jsx, lines 20–86](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/context/AuthContext.jsx#L20): cached identity, server-backed restoration, and socket lifecycle.
- [src/services/apiClient.js, lines 3–79](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/services/apiClient.js#L3): production HTTP fallback, token attachment, request timeouts, and bounded retries. Some authentication POST requests are retryable, so mutation idempotency deserves review.
- [src/services/socketClient.js, lines 6–38](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/services/socketClient.js#L6): token-aware connection reuse and origin handling. Its no-env fallback is localhost, unlike the HTTP production fallback.
- [src/services/conversationService.js](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/services/conversationService.js): API calls and normalized conversation/message data.
- [src/pages/VideoCallPage.jsx, lines 29–80](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/pages/VideoCallPage.jsx#L29): placeholder media surface and controls, with an external meeting link. It does not demonstrate native video transport.

[src/utils/mockData.js](https://github.com/limon-l/metroBridge-client/blob/843abbdaec3e1a2bc711f22e33ff40d277aa1e4a/src/utils/mockData.js) contains illustrative entities. Those names, ratings, and counts were not imported as real achievements or testimonials. No automated test command or CI workflow was found in the reviewed inventory.

## BD Blood Finder

[package.json](https://github.com/limon-l/bd-blood-bot/blob/8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7/package.json) supports TypeScript, Wrangler/Cloudflare Workers, grammY, Supabase, and a Vitest development setup. [src/index.ts](https://github.com/limon-l/bd-blood-bot/blob/8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7/src/index.ts) implements persisted conversation steps (lines 40–55), donor/request commands (85–135), registration and callback processing (147–289), contact/text handlers (295–407), and the worker webhook callback (411).

The donor query at [lines 359–367](https://github.com/limon-l/bd-blood-bot/blob/8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7/src/index.ts#L359) filters by blood-group equality plus district/upazila text and orders by donation date. This is **not evidence of geometric distance matching**. Chunked sends appear at lines 382–393; multi-bag updates appear at 244–282. Hardware alarms, zero operating cost, medical screening, successful donations, and emergency reliability are not established by this source.

[test/index.spec.ts, lines 14–28](https://github.com/limon-l/bd-blood-bot/blob/8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7/test/index.spec.ts#L14) still asserts a Hello World response. It does not validate donor workflows. [vitest.config.mts, line 7](https://github.com/limon-l/bd-blood-bot/blob/8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7/vitest.config.mts#L7) references `wrangler.jsonc`, absent from the retrieved default-branch tree. No deployment, schema, row-level security, concurrent state update, or alert delivery was verified. The project is presented as a community software study, with no operational emergency-service claim.

## Evidence boundaries and follow-up

- Build/runtime/test results for the transformed **portfolio** belong to the repository’s acceptance report. They must not be confused with execution of these five independent projects.
- Only Ponnaloy’s full-stack source was present in the reviewed candidate itself. The three client repositories retain the category **Frontend** even when their descriptions describe full-stack products.
- No screenshots were generated for these external applications. The portfolio uses explicitly illustrative CSS compositions rather than fabricated product screenshots.
- No backend repository attribution, personal institution, employment, client testimonial, publication, impact metric, or ML implementation claim was inferred from repository names or descriptions.
- Follow-up validation can reproduce project suites, inspect linked backend repositories, and verify authenticated workflows with owner-provided configuration. Those checks are outside the completed source review and remain unverified.
