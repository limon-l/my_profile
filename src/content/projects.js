/**
 * Public-source review, dated in the owner's timezone. VERIFIED applies to the
 * linked implementation evidence, never to deployment quality or sole authorship.
 * External applications were not installed, authenticated into, or runtime tested.
 */
export const PROJECT_REVIEW_DATE = "2026-11-05";

export const EVIDENCE_STATUS = Object.freeze({
  VERIFIED: "VERIFIED",
  SELF_REPORTED: "SELF-REPORTED",
  INTEREST: "INTEREST",
  PLANNED: "PLANNED",
  UNVERIFIED: "UNVERIFIED",
});

const contribution =
  "GitHub lists limon-l as a contributor to this public repository. This review confirms repository evidence; exact personal contributions, original authorship, and assistance history have not been independently established.";
const verification =
  "Manifests and selected implementation files were reviewed on 5 November 2026. No external project was installed or executed during this portfolio review. A reachable demo page is a link check, not a functional, security, or production-readiness test.";

function source(repo, revision, path, label, note) {
  return {
    label,
    path,
    url: `https://github.com/limon-l/${repo}/blob/${revision}/${path}`,
    note,
  };
}

function caseStudy(meta, content) {
  return {
    ...meta,
    evidenceStatus: EVIDENCE_STATUS.VERIFIED,
    evidenceLabel: "Source reviewed",
    verifiedAt: PROJECT_REVIEW_DATE,
    contribution,
    sections: [
      { title: "01 / Project overview", body: content.overview },
      { title: "02 / Problem & intended users", body: content.problem },
      { title: "03 / Contribution evidence", body: contribution },
      { title: "04 / Requirements & constraints", body: content.constraints },
      { title: "05 / Architecture", body: content.architecture },
      {
        title: "06 / Technical stack",
        body: "The linked package manifests and implementation files support this stack.",
        items: meta.stack,
      },
      {
        title: "07 / Implemented features",
        body: "These behaviors are represented in reviewed source; end-to-end operation was not tested here.",
        items: content.features,
      },
      { title: "08 / Engineering decisions", body: content.decisions },
      { title: "09 / Challenges & trade-offs", body: content.tradeoffs },
      {
        title: "10 / Testing & verification",
        body: `${verification} ${content.tests}`,
      },
      {
        title: "11 / Known limitations",
        body: "These are review boundaries and observed gaps, not a complete application audit.",
        items: meta.limitations,
      },
      { title: "12 / Source & demo", body: meta.demoCheck },
      {
        title: "13 / Future improvements",
        body: "Proposed next steps from this review; these are not completed features or historical owner decisions.",
        items: content.improvements,
      },
    ],
  };
}

const ponnaloyRevision = "56c97952737a3a8803303880a4b7368ee0e301d1";
const wanderlustRevision = "734f6c2111e49a7fed202de19a9394168a9c5fc1";
const bookRevision = "35b13252c97cf39c375a414e922a9bdd8168df69";
const metroRevision = "843abbdaec3e1a2bc711f22e33ff40d277aa1e4a";
const bloodRevision = "8f966acbc6b91cb3fb92f4e485e18ecfe12cb0d7";

export const projects = [
  caseStudy(
    {
      id: "ponnaloy",
      slug: "ponnaloy",
      title: "Ponnaloy",
      category: "Full-Stack",
      domain: "Multi-vendor commerce",
      featured: true,
      rank: 1,
      visual: "commerce",
      summary:
        "A commerce monorepo connecting a storefront, seller workspaces, and an API with explicit marketplace permissions.",
      stack: [
        "TypeScript",
        "Next.js 15",
        "React 19",
        "Node.js",
        "Fastify 5",
        "Prisma",
        "MongoDB",
        "Zod",
        "Tailwind CSS",
        "pnpm",
        "Vitest",
        "Playwright",
      ],
      sourceUrl: "https://github.com/limon-l/Ponnaloy-e-com",
      demoUrl: null,
      demoCheck:
        "The repository advertises a Vercel URL, but its response timed out during a 15-second HTTP check on 5 November 2026. A demo link is withheld until reachability can be established. This does not establish a deployment failure.",
      insight:
        "Seller membership and permissions are resolved in the API; hiding a dashboard alone would not protect another seller’s records.",
      revision: ponnaloyRevision,
      lastSourcePush: "2026-11-05",
      limitations: [
        "The repository’s verification report lists unfinished admin category, banner, analytics, and settings interfaces.",
        "The report describes a local-storage wishlist that is not synchronized with the authenticated API.",
        "Real payment capture, refunds, external email delivery, Redis, and Meilisearch operation were not independently verified.",
        "Reported test passes in project documentation were not reproduced in this review.",
      ],
      architecture: [
        {
          id: "storefront",
          label: "Next.js storefront",
          description:
            "App Router pages and React contexts provide product, cart, account, seller, and administration interfaces in apps/web.",
        },
        {
          id: "api",
          label: "Fastify API",
          description:
            "apps/api/src/server.ts registers domain routes, request limits, security headers, compression, and health endpoints.",
        },
        {
          id: "authorization",
          label: "Authorization boundary",
          description:
            "Authentication middleware checks identities. Seller middleware resolves active organization memberships, approval status, and action permissions before seller operations.",
        },
        {
          id: "data",
          label: "Prisma + MongoDB",
          description:
            "The schema models users, products, orders, seller organizations, memberships, seller orders, payment events, and idempotency records.",
        },
      ],
      sources: [
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "package.json",
          "Workspace manifest",
          "pnpm workspace commands and Turborepo orchestration.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/web/package.json",
          "Storefront dependencies",
          "Next.js 15, React 19, TypeScript, Tailwind CSS, and Playwright.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/package.json",
          "API dependencies",
          "Fastify, Prisma, Zod, Node scripts, and Vitest.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/src/server.ts",
          "API composition",
          "Registered domain routes and middleware.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/src/middleware/seller.ts",
          "Seller authorization",
          "Membership, selected seller, approval, and permission checks; lines 84–174.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/src/services/pricing.ts",
          "Pricing service",
          "Shared coupon eligibility, bounded discounts, and integer-price checks.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/prisma/schema.prisma",
          "Domain schema",
          "MongoDB datasource and marketplace data model.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/test/marketplace.integration.test.ts",
          "Marketplace test definitions",
          "Seller approval, tenant isolation, and multi-vendor order assertions; execution not reproduced.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/api/test/pricing.test.ts",
          "Pricing test definitions",
          "Coupon eligibility, rounding, shipping, and invalid-value assertions.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "apps/web/e2e/storefront.spec.ts",
          "Browser test definitions",
          "Playwright smoke and axe checks; execution not reproduced.",
        ),
        source(
          "Ponnaloy-e-com",
          ponnaloyRevision,
          "VERIFICATION_REPORT.md",
          "Author’s verification report",
          "Dated 2026-11-01; self-reported execution results and explicit remaining gaps.",
        ),
      ],
    },
    {
      overview:
        "Ponnaloy is the strongest candidate for a detailed engineering study because its current tree contains both the web application and API, a shared package, domain models, and meaningful test definitions. The current source supersedes an older repository description that mentions Express and SQLite.",
      problem:
        "The intended workflow connects customers buying products with sellers managing their catalogues and platform administrators moderating the marketplace. No customer adoption, revenue, or commercial use is claimed.",
      constraints:
        "Multiple seller organizations share an API and database. Requests need an authenticated identity, a valid membership, the correct organization context, and permissions for the operation. External services require configuration and separate operational verification.",
      architecture:
        "The pnpm workspace separates apps/web, apps/api, and packages/shared. The Next.js client calls the Fastify API, which applies identity and seller guards before using Prisma to access MongoDB. The architecture explorer describes this reviewed structure.",
      features: [
        "Seller membership resolution, organization selection, approval gates, and permission checks.",
        "Separate storefront, account, seller, and administration page trees.",
        "Coupon eligibility and order-total calculations in a shared API pricing service.",
        "Marketplace schema and integration tests for seller isolation and partitioned orders.",
      ],
      decisions:
        "The source centralizes coupon evaluation and order calculations in a pricing service. Seller authorization is also a reusable server boundary. These are observable implementation choices; their original author’s rationale was not independently established.",
      tradeoffs:
        "A monorepo makes shared contracts and cross-application work explicit, while increasing setup requirements. Optional provider integrations and partially complete management pages mean source breadth should not be treated as production completeness.",
      tests:
        "Reviewed tests cover pricing, seller authorization, tenant isolation, marketplace orders, and browser smoke/accessibility checks. The author’s verification report contains execution results; those results remain attributed to that report.",
      improvements: [
        "Complete the documented administration interfaces.",
        "Synchronize saved items with the authenticated wishlist API.",
        "Reproduce test suites in CI and verify real provider integrations in a controlled environment.",
      ],
    },
  ),
  caseStudy(
    {
      id: "wanderlust",
      slug: "wanderlust",
      title: "Wanderlust",
      category: "Frontend",
      domain: "Travel booking workflows",
      featured: true,
      rank: 2,
      visual: "travel",
      summary:
        "A Next.js travel client with administrator-published dates and a booking request workflow.",
      stack: [
        "JavaScript",
        "Next.js 16",
        "React 19",
        "NextAuth",
        "Axios",
        "Tailwind CSS",
      ],
      sourceUrl: "https://github.com/limon-l/my_travel_client",
      demoUrl: "https://my-travel-client.vercel.app/",
      demoCheck:
        "The public homepage returned HTTP 200 with the title “Wanderlust Agency” on 5 November 2026. Login, booking, administrative actions, and the remote API were not functionally tested; the documented API base URL timed out during the link check.",
      insight:
        "Availability is represented as published dates, while a booking request remains separate from an approved booking.",
      revision: wanderlustRevision,
      lastSourcePush: "2026-04-04",
      limitations: [
        "This repository contains the client; the external Express API implementation was not reviewed.",
        "Source includes an administrator email fallback in UI role checks; server authorization is not established by this client code.",
        "Booking submissions include client-supplied user, tour, price, and date fields; server-side validation needs separate review.",
        "No automated test command or test files were found in the reviewed default-branch inventory.",
      ],
      architecture: [
        {
          id: "routes",
          label: "Next.js routes",
          description:
            "The App Router separates authentication, tour, package, and dashboard screens.",
        },
        {
          id: "session",
          label: "NextAuth session",
          description:
            "Credentials are delegated to the remote login API; optional Google OAuth is configured from environment variables. JWT callbacks carry user ID and role.",
        },
        {
          id: "booking",
          label: "Booking interface",
          description:
            "BookButton retrieves published dates and posts booking requests; the requests dashboard calls date-management and approval endpoints.",
        },
        {
          id: "remote",
          label: "External API boundary",
          description:
            "Axios calls an environment-configured API. The backend implementation and authorization were outside this source review.",
        },
      ],
      sources: [
        source(
          "my_travel_client",
          wanderlustRevision,
          "package.json",
          "Client dependencies",
          "Next.js 16, React 19, NextAuth, Axios, and Tailwind CSS.",
        ),
        source(
          "my_travel_client",
          wanderlustRevision,
          "src/lib/auth.jsx",
          "Session configuration",
          "Credentials delegation, optional Google provider, and session role propagation.",
        ),
        source(
          "my_travel_client",
          wanderlustRevision,
          "src/proxy.js",
          "Route protection",
          "NextAuth wrapper for tour, package, and dashboard paths.",
        ),
        source(
          "my_travel_client",
          wanderlustRevision,
          "src/components/BookButton.jsx",
          "Published-date booking",
          "Date fetch, role-aware controls, booking POST, loading, and errors; lines 19–97.",
        ),
        source(
          "my_travel_client",
          wanderlustRevision,
          "src/app/(protected)/dashboard/requests/page.jsx",
          "Administrator requests",
          "Independent load results, approval updates, and date management; lines 31–150.",
        ),
        source(
          "my_travel_client",
          wanderlustRevision,
          "README.md",
          "Setup and external API",
          "Documented intended workflows and backend URL, not independent runtime proof.",
        ),
      ],
    },
    {
      overview:
        "A travel-agency interface organized around tour discovery, published travel dates, and requests that an administrator can approve or reject. The reviewed repository demonstrates the frontend and session configuration.",
      problem:
        "Travelers need to see which departure dates can be requested. Administrators need to manage those dates and respond to bookings. A visible request state helps distinguish an application from a confirmed trip.",
      constraints:
        "The application depends on a separate API, NextAuth configuration, and optional Google credentials. A protected frontend route cannot establish whether the backend rejects unauthorized requests.",
      architecture:
        "Next.js App Router screens consume a NextAuth session. The booking component reads available dates and sends an API request. A separate dashboard manages dates and updates booking status through Axios calls.",
      features: [
        "Credentials authentication configuration and conditional Google OAuth provider.",
        "Published-date selection, return-date display, disabled submission, and request feedback.",
        "Administrator date controls and booking approval/rejection requests.",
        "Separate error handling for independently loaded booking and tour data.",
      ],
      decisions:
        "The interface models available dates explicitly and refreshes them when the date picker opens. The administrator page uses Promise.allSettled so one failed request can receive its own error state.",
      tradeoffs:
        "An external API keeps the client focused, but correctness depends on unreviewed server validation. UI role fallbacks and client-supplied booking attributes warrant a dedicated backend authorization and integrity review.",
      tests:
        "The package exposes build and lint commands, with no automated test command. The HTTP homepage check does not verify authentication or booking behavior.",
      improvements: [
        "Review server authentication, role checks, and authoritative booking validation.",
        "Add date-availability and approval-flow integration tests.",
        "Make booking date selection and dismissal fully keyboard tested.",
      ],
    },
  ),
  caseStudy(
    {
      id: "book-courier",
      slug: "book-courier",
      title: "BookCourier",
      category: "Frontend",
      domain: "Library-to-home delivery",
      featured: true,
      rank: 3,
      visual: "library",
      summary:
        "A React library client connecting book discovery with reader, librarian, and administrator dashboards.",
      stack: [
        "JavaScript",
        "React 19",
        "Vite 7",
        "React Router 7",
        "Firebase",
        "Axios",
        "TanStack Query",
        "Stripe",
        "Tailwind CSS",
        "Leaflet",
      ],
      sourceUrl: "https://github.com/limon-l/book-courier-client",
      demoUrl: "https://lighthouselibrary.vercel.app",
      demoCheck:
        "The public homepage returned HTTP 200 with the title “Light House” on 5 November 2026. Firebase login, role enforcement, delivery operations, and payment execution were not tested. The client’s API base URL timed out in the link check.",
      insight:
        "Reader, librarian, and administrator routes express different workflows; authoritative permissions still belong on the server.",
      revision: bookRevision,
      lastSourcePush: "2026-03-10",
      limitations: [
        "The remote backend and its authorization, pricing, and payment verification were not source reviewed.",
        "Checkout asks the API to create a payment intent using a price from client state; authoritative server pricing remains unverified.",
        "The client stores its API token in local storage; a complete security review was not performed.",
        "The reviewed inventory has build and lint scripts but no automated test suite.",
      ],
      architecture: [
        {
          id: "routing",
          label: "React Router application",
          description:
            "Public book discovery and a nested dashboard route tree use separate layouts and role guard components.",
        },
        {
          id: "auth",
          label: "Firebase identity",
          description:
            "AuthProvider wraps email/password and Google login. Auth state requests an API token from an external /jwt endpoint.",
        },
        {
          id: "api",
          label: "Role and API hooks",
          description:
            "TanStack Query loads the user role. Axios interceptors attach the local API token and react to 401/403 responses.",
        },
        {
          id: "checkout",
          label: "Stripe client integration",
          description:
            "CheckoutForm initializes an intent, confirms payment through Stripe Elements, then records payment with the API. Provider execution was not verified.",
        },
      ],
      sources: [
        source(
          "book-courier-client",
          bookRevision,
          "package.json",
          "Client manifest",
          "React, Vite, routing, Firebase, TanStack Query, Stripe, and Leaflet dependencies.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/routes/Router.jsx",
          "Application routes",
          "Reader routes and librarian/admin guard composition.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/routes/AdminRoute.jsx",
          "Administrator UI guard",
          "Client user and role checks; not server authorization.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/providers/AuthProvider.jsx",
          "Authentication provider",
          "Firebase methods and API-token acquisition.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/hooks/useRole.jsx",
          "Role query",
          "User-specific role retrieval through TanStack Query.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/hooks/useAxiosSecure.jsx",
          "API interceptor",
          "Token attachment, failure handling, cleanup, and backend base URL.",
        ),
        source(
          "book-courier-client",
          bookRevision,
          "src/pages/Dashboard/User/CheckoutForm.jsx",
          "Checkout implementation",
          "Payment intent, Stripe confirmation, and payment persistence; lines 20–88.",
        ),
      ],
    },
    {
      overview:
        "BookCourier, also branded LightHouse, is a library delivery client. Its route tree connects book browsing, personal orders and saved books, librarian catalogue management, and administrative screens.",
      problem:
        "The intended users are readers requesting books, librarians managing listings and orders, and administrators managing users and catalogue visibility. This review establishes implemented interfaces rather than a functioning delivery service.",
      constraints:
        "The SPA relies on Firebase, a separately hosted API, and Stripe configuration. Role information arrives asynchronously, so guards include loading states before deciding which screens to render.",
      architecture:
        "React Router composes public and dashboard layouts. Firebase authentication feeds an auth context, the external API provides role and application data, and Stripe Elements supplies the checkout UI.",
      features: [
        "Public catalogue and protected book details routes.",
        "Separate reader, librarian, and administrator dashboard screens.",
        "Firebase email/password and Google authentication methods.",
        "API token interceptors with cleanup and authentication-failure handling.",
        "A Stripe payment-intent and card-confirmation client flow.",
      ],
      decisions:
        "Role retrieval is separated into a query hook, while routing composes role guards around individual management screens. The Axios hook ejects its request and response interceptors on cleanup.",
      tradeoffs:
        "The client expresses role boundaries clearly, but the backend must enforce every privileged operation. Payment confirmation and application record creation are separate requests, leaving recovery and server reconciliation to verify.",
      tests:
        "No payment was initiated. Manifest and inventory review found build/lint commands but no automated tests. README claims about tracking, payments, or production quality were not adopted as verified runtime results.",
      improvements: [
        "Verify server-side identity, role, pricing, and webhook boundaries.",
        "Test payment-record recovery after network failure.",
        "Add route-guard, error-state, and catalogue integration coverage.",
      ],
    },
  ),
  caseStudy(
    {
      id: "metrobridge",
      slug: "metrobridge",
      title: "MetroBridge",
      category: "Frontend",
      domain: "Academic mentorship",
      featured: false,
      rank: 4,
      visual: "network",
      summary:
        "A mentorship SPA with role-based screens, service modules, and a Socket.IO messaging client.",
      stack: [
        "JavaScript",
        "React 19",
        "Vite 8",
        "React Router 7",
        "Axios",
        "Socket.IO client",
        "Tailwind CSS",
      ],
      sourceUrl: "https://github.com/limon-l/metroBridge-client",
      demoUrl: "https://metro-bridge.vercel.app",
      demoCheck:
        "The public homepage returned HTTP 200 with the title “MetroBridge” on 5 November 2026. Authenticated collaboration and socket delivery were not tested. The default production API base URL timed out during the check.",
      insight:
        "A dedicated HTTP service boundary and token-aware socket lifecycle keep transport concerns separate from role-based screens.",
      revision: metroRevision,
      lastSourcePush: "2026-06-18",
      limitations: [
        "Reviewed evidence covers the client, not the remote server’s permission enforcement.",
        "The video-call page contains placeholder stream controls and an external meeting link; native video transport is not demonstrated.",
        "The socket URL falls back to localhost, while the production HTTP client has a hosted API fallback; deployment configuration needs verification.",
        "Mock data exists in the source tree and does not establish real platform users, ratings, or educational affiliation.",
        "No automated test command or CI workflow was found in the reviewed inventory.",
      ],
      architecture: [
        {
          id: "screens",
          label: "Role-based screens",
          description:
            "React Router and ProtectedRoute organize student, mentor, and administrator application areas.",
        },
        {
          id: "session",
          label: "Authentication context",
          description:
            "AuthContext restores cached state, verifies it through getCurrentUser, and connects or disconnects messaging sockets.",
        },
        {
          id: "services",
          label: "HTTP service layer",
          description:
            "Domain services use an Axios client with bearer-token attachment, timeouts, and bounded retry behavior.",
        },
        {
          id: "socket",
          label: "Messaging connection",
          description:
            "socketClient maintains one token-aware Socket.IO connection and disconnects it when authentication changes.",
        },
      ],
      sources: [
        source(
          "metroBridge-client",
          metroRevision,
          "package.json",
          "Client manifest",
          "React, Vite, routing, Axios, Socket.IO client, and Tailwind CSS.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/components/auth/ProtectedRoute.jsx",
          "Role-aware UI guard",
          "Session loading, unauthenticated redirect, and allowed-role checks.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/context/AuthContext.jsx",
          "Session lifecycle",
          "Cached state restoration, server refresh, and socket lifecycle.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/services/apiClient.js",
          "HTTP boundary",
          "Base URL, tokens, timeout, retry policy, and normalized errors.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/services/socketClient.js",
          "Socket lifecycle",
          "Token-aware singleton connection and connection cleanup.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/services/conversationService.js",
          "Conversation service",
          "Message and conversation API calls and response normalization.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/pages/VideoCallPage.jsx",
          "Video interface boundary",
          "Placeholder media controls and external meeting link; lines 29–80.",
        ),
        source(
          "metroBridge-client",
          metroRevision,
          "src/utils/mockData.js",
          "Illustrative data",
          "Static sample entities; no user or impact evidence.",
        ),
      ],
    },
    {
      overview:
        "MetroBridge is a frontend for academic mentorship and collaboration. Its source contains role-oriented screens, authentication state, domain API services, and a messaging socket client.",
      problem:
        "The intended workflow helps students discover mentors, arrange appointments, exchange messages, and access shared material. The repository’s institutional context describes intended users and does not verify the portfolio owner’s institution or an institutional partnership.",
      constraints:
        "The SPA depends on an external API and correctly configured HTTP and socket origins. Local role state improves interface routing while server permissions remain a separate trust boundary.",
      architecture:
        "UI components call domain services through a shared HTTP client. AuthContext manages session restoration and messaging connection lifetime. ProtectedRoute applies allowed-role checks to screens.",
      features: [
        "Role-aware route guard with a session-loading state.",
        "Token persistence and server-backed current-user refresh.",
        "HTTP request timeouts and bounded retries for selected request types.",
        "Conversation and message service functions with normalized response shapes.",
        "Token-aware Socket.IO connection reuse and cleanup.",
      ],
      decisions:
        "Transport and response normalization are separated into service modules. The socket manager reuses a connection for the same token and replaces it when the token changes. These are observations of current code.",
      tradeoffs:
        "Retry logic improves resilience but also retries selected authentication POST requests, which deserves idempotency review. A large route inventory includes partial interfaces; page existence is not proof of a complete collaboration feature.",
      tests:
        "No authenticated workflow, message delivery, or meeting session was exercised. The default-branch inventory exposes build/lint commands without an automated test command.",
      improvements: [
        "Align production HTTP and socket origin configuration.",
        "Add transport lifecycle and role-routing integration tests.",
        "Label unfinished meeting controls and verify server permissions for each role.",
      ],
    },
  ),
  caseStudy(
    {
      id: "bd-blood-finder",
      slug: "bd-blood-finder",
      title: "BD Blood Finder",
      category: "Community",
      domain: "Donor coordination",
      featured: false,
      rank: 5,
      visual: "community",
      summary:
        "A Telegram coordination bot with persisted conversation states, location filters, and multi-bag request tracking.",
      stack: ["TypeScript", "Cloudflare Workers", "grammY", "Supabase"],
      sourceUrl: "https://github.com/limon-l/bd-blood-bot",
      demoUrl: "https://telegram.dog/blood_boss_bot",
      demoLabel: "Telegram listing",
      demoCheck:
        "The Telegram launch listing returned HTTP 200 on 5 November 2026. This confirms only the listing page. No bot interaction, alert, donor record, or operational emergency workflow was tested.",
      insight:
        "Conversation state lives in a database, allowing a webhook-driven bot to continue a multi-step request across messages.",
      revision: bloodRevision,
      lastSourcePush: "2026-07-13",
      limitations: [
        "Matching uses blood-group equality and district/upazila text filters; geometric distance matching was not found.",
        "The public source does not establish native hardware alarms, operating cost, successful donations, or emergency-service reliability.",
        "The checked-in tests still assert a Hello World worker response, rather than donor or request workflows.",
        "The test configuration references wrangler.jsonc, which is absent from the reviewed default-branch inventory.",
        "Database schema, row-level security, webhook configuration, and concurrent request behavior were not verified.",
      ],
      architecture: [
        {
          id: "telegram",
          label: "Telegram messages",
          description:
            "Commands, contacts, text, and inline callback actions enter through grammY handlers.",
        },
        {
          id: "worker",
          label: "Cloudflare Worker",
          description:
            "The exported fetch handler constructs the bot and returns a Cloudflare-compatible grammY webhook callback.",
        },
        {
          id: "state",
          label: "Supabase state",
          description:
            "bot_sessions persists the current step and metadata; telegram_donors stores donor profiles; location_data supplies area choices.",
        },
        {
          id: "broadcast",
          label: "Filtered broadcasts",
          description:
            "The source selects matching blood group and location strings, orders by donation date, and sends Telegram messages in bounded chunks.",
        },
      ],
      sources: [
        source(
          "bd-blood-bot",
          bloodRevision,
          "package.json",
          "Worker manifest",
          "Wrangler, TypeScript, grammY, Supabase, and Vitest configuration.",
        ),
        source(
          "bd-blood-bot",
          bloodRevision,
          "src/index.ts",
          "Bot implementation",
          "Persisted steps 40–55; registration 85–111; callbacks 147–289; matching/broadcast 354–401; webhook 411.",
        ),
        source(
          "bd-blood-bot",
          bloodRevision,
          "test/index.spec.ts",
          "Existing test scaffold",
          "Hello World assertions do not validate the current donor bot.",
        ),
        source(
          "bd-blood-bot",
          bloodRevision,
          "vitest.config.mts",
          "Worker test configuration",
          "References an absent wrangler.jsonc configuration file.",
        ),
        source(
          "bd-blood-bot",
          bloodRevision,
          "README.md",
          "Repository description",
          "Sparse documentation; broad marketing claims were not adopted without source support.",
        ),
      ],
    },
    {
      overview:
        "A Telegram bot intended to coordinate blood requests in Bangladesh. The reviewed TypeScript file implements donor registration, request conversations, location filtering, donor replies, and per-request bag tracking.",
      problem:
        "The intended users are donors and people coordinating a blood request. This case study describes software behavior only; it makes no claim about medical eligibility, donor availability, successful outcomes, or emergency reliability.",
      constraints:
        "Webhook processing must reconstruct a conversation from persisted state. The implementation depends on Telegram credentials, Supabase tables, location data, and database permissions that are not provided as a complete reproducible deployment here.",
      architecture:
        "Telegram updates reach a Cloudflare Worker. grammY routes commands and callbacks; Supabase stores donor and session data. Matching applies blood-group and administrative-area filters before broadcasting Telegram messages.",
      features: [
        "Donor registration with contact collection, blood group, and administrative-area selection.",
        "Persisted request states, cancellation, and donor profile retrieval.",
        "Donation-date updates and date-ordered donor query results.",
        "Donor availability replies and incremental multi-bag completion handling.",
        "HTML escaping helpers and chunked broadcast requests.",
      ],
      decisions:
        "Session state is persisted outside the worker so later updates can continue the conversation. Broadcasts use chunks and Promise.allSettled, allowing one delivery failure without rejecting every request in that chunk.",
      tradeoffs:
        "Administrative-area strings simplify matching but do not calculate geographic distance. Bag counters and session writes are ordinary read/update operations; concurrency, duplicate callbacks, consent, and data-access controls need dedicated review.",
      tests:
        "The manifest includes Vitest, but checked-in tests remain a Hello World scaffold. They were not run, and their presence is not presented as evidence of tested donor workflows.",
      improvements: [
        "Replace scaffold tests with state-transition, duplicate-callback, and delivery-failure tests.",
        "Document schema, access policies, and webhook setup without publishing secrets.",
        "Validate calendar dates and review concurrency and personal-data handling.",
      ],
    },
  ),
];

export const projectCategories = [
  "All",
  ...new Set(projects.map((project) => project.category)),
];
export default projects;
