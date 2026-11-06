import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Reuse an installed browser; this script never downloads dependencies.
// QA_PLAYWRIGHT_CORE may be an absolute package directory or module entry.
// QA_BROWSER_EXECUTABLE, QA_AXE_CORE, QA_BASE_URL and QA_OUTPUT_DIR are optional.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const siblingModules =
  "C:/All Files/Lab/Web Development/Projects/codealpha/Ponnaloy-e-com/node_modules/.pnpm";
const candidates = [
  process.env.QA_PLAYWRIGHT_CORE,
  join(root, "node_modules/playwright-core"),
  join(root, "node_modules/playwright/node_modules/playwright-core"),
  `${siblingModules}/playwright-core@1.64.1/node_modules/playwright-core`,
].filter(Boolean);
const core = candidates.find((candidate) => existsSync(candidate));
if (!core)
  throw new Error(
    "Set QA_PLAYWRIGHT_CORE to an installed playwright-core package directory.",
  );
const { chromium } = require(core);
const executablePath =
  process.env.QA_BROWSER_EXECUTABLE ||
  [
    join(
      process.env.LOCALAPPDATA || "",
      "ms-playwright/chromium-1248/chrome-win64/chrome.exe",
    ),
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ].find((candidate) => existsSync(candidate));
const axePath =
  process.env.QA_AXE_CORE ||
  [
    join(root, "node_modules/axe-core/axe.min.js"),
    `${siblingModules}/axe-core@4.14.0/node_modules/axe-core/axe.min.js`,
  ].find((candidate) => existsSync(candidate));
const baseURL = process.env.QA_BASE_URL || "http://127.0.0.1:5173";
const checkPattern = process.env.QA_CHECK_PATTERN
  ? new RegExp(process.env.QA_CHECK_PATTERN, "i")
  : null;
const output = resolve(
  process.env.QA_OUTPUT_DIR || join(root, "docs/screenshots"),
);
mkdirSync(output, { recursive: true });
const { projects } = await import(
  pathToFileURL(join(root, "src/content/projects.js"))
);
const routes = [
  "/",
  "/lab",
  "/journal",
  ...projects.map((project) => `/work/${project.slug}`),
];
const widths = [320, 375, 768, 1024, 1440, 1920];
const results = [];
const errors = [];
const responsive = [];
const accessibility = [];
const observations = [];
const browser = await chromium.launch({
  ...(executablePath ? { executablePath } : {}),
  headless: true,
});
const browserVersion = browser.version();
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "dark",
});
context.on("page", (page) =>
  page.on("pageerror", (error) =>
    errors.push({ url: page.url(), message: error.message }),
  ),
);

// A fail-safe blocks *every* contact POST, including an alternate configured URL.
// Individual service tests replace this handler with local synthetic responses.
await context.route("**/*", (route) =>
  route.request().method() === "POST"
    ? route.fulfill({
        status: 503,
        contentType: "application/json",
        body: '{"error":"QA blocked a real submission"}',
      })
    : route.continue(),
);
const page = await context.newPage();
page.setDefaultTimeout(6000);
await page.addInitScript(() => {
  window.__portfolioMetrics = { lcpMs: null, cumulativeLayoutShift: 0 };
  let sessionValue = 0;
  let sessionStart = 0;
  let sessionLast = 0;
  if (typeof PerformanceObserver === "undefined") return;
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      window.__portfolioMetrics.lcpMs = entries.at(-1)?.startTime ?? null;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.hadRecentInput) continue;
        if (
          entry.startTime - sessionLast < 1000 &&
          entry.startTime - sessionStart < 5000
        )
          sessionValue += entry.value;
        else {
          sessionValue = entry.value;
          sessionStart = entry.startTime;
        }
        sessionLast = entry.startTime;
        window.__portfolioMetrics.cumulativeLayoutShift = Math.max(
          window.__portfolioMetrics.cumulativeLayoutShift,
          sessionValue,
        );
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch {
    /* Browser support is recorded by nullable measurements. */
  }
});

async function check(name, run) {
  if (checkPattern && !checkPattern.test(name)) return;
  const started = performance.now();
  try {
    await run();
    results.push({
      name,
      status: "passed",
      durationMs: Math.round(performance.now() - started),
    });
    console.log(`PASS ${name}`);
  } catch (error) {
    results.push({
      name,
      status: "failed",
      message: error.message,
      durationMs: Math.round(performance.now() - started),
    });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}
async function visit(path = "/") {
  let response = await page.goto(`${baseURL}${path}`, {
    waitUntil: "networkidle",
  });
  // A same-document hash navigation has no response and retains component state.
  // Explicit visits start a fresh test; UI navigation tests exercise soft routing.
  if (!response) response = await page.reload({ waitUntil: "networkidle" });
  assert.equal(response.status(), 200, `${path} HTTP status`);
  await page.locator("main h1").waitFor();
}
async function setTheme(theme) {
  await page.evaluate((theme) => {
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, theme);
  await page.reload({ waitUntil: "networkidle" });
}
async function fillContact() {
  const form = page.locator(".contact-form");
  await form.getByLabel("Your name").fill("Portfolio QA");
  await form.getByLabel("Email address").fill("portfolio-qa@example.invalid");
  await form
    .locator('textarea[name="message"]')
    .fill("Local automated validation only; this message is never delivered.");
  return form;
}

await check(
  "Homepage identity, local portrait, screenshots and runtime",
  async () => {
    await visit();
    assert.match(await page.locator("h1").innerText(), /Limon Roy\s+Apu/);
    assert.match(await page.title(), /CSE Undergraduate/);
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page
        .locator('img[alt="Limon Roy Apu"]')
        .evaluate((image) => image.complete && image.naturalWidth === 688),
      true,
    );
    assert.equal(
      await page
        .locator(".project-visual")
        .first()
        .evaluate(
          (element) =>
            element.getBoundingClientRect().width > 200 &&
            element.getBoundingClientRect().height > 100,
        ),
      true,
      "Illustrative link wrapper must preserve card dimensions",
    );
    await page.screenshot({
      path: join(output, "after-desktop.png"),
      fullPage: true,
    });
    await page.screenshot({ path: join(output, "after-desktop-hero.png") });
    await page.setViewportSize({ width: 375, height: 844 });
    await page.screenshot({
      path: join(output, "after-mobile.png"),
      fullPage: true,
    });
    await page.screenshot({ path: join(output, "after-mobile-hero.png") });
    await page.setViewportSize({ width: 1440, height: 1000 });
    // Capture a fresh settled navigation after screenshots/resizing; development
    // HMR during an active implementation must not be mistaken for a paint metric.
    await visit();
    observations.push(
      await page.evaluate(() => ({
        source:
          "Local preview; no throttling or field population; build mode depends on QA_BASE_URL server",
        domNodes: document.querySelectorAll("*").length,
        htmlCharacters: document.documentElement.outerHTML.length,
        localTransferBytes: performance
          .getEntriesByType("resource")
          .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
        navigation: performance
          .getEntriesByType("navigation")
          .map((entry) => ({
            domContentLoaded: entry.domContentLoadedEventEnd,
            load: entry.loadEventEnd,
          })),
        localPaintObservations: window.__portfolioMetrics,
        thirdPartyResources: performance
          .getEntriesByType("resource")
          .filter((entry) => !entry.name.startsWith(location.origin))
          .map((entry) => entry.name),
      })),
    );
  },
);

await check(
  "Responsive routes: six requested widths in both themes",
  async () => {
    for (const theme of ["dark", "light"]) {
      await setTheme(theme);
      for (const width of widths) {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        for (const route of routes) {
          await visit(route);
          const measurement = await page.evaluate(() => ({
            viewport: innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            overflowing: [...document.querySelectorAll("main *")]
              .filter((element) => {
                const box = element.getBoundingClientRect();
                const style = getComputedStyle(element);
                return (
                  box.width &&
                  style.position !== "absolute" &&
                  style.position !== "fixed" &&
                  (box.left < -1 || box.right > innerWidth + 1)
                );
              })
              .slice(0, 8)
              .map((element) => ({
                tag: element.tagName,
                class: element.className,
                text: element.textContent.trim().slice(0, 55),
              })),
          }));
          responsive.push({ route, theme, width, ...measurement });
        }
      }
    }
    const failed = responsive.filter(
      (row) => row.documentWidth > row.width + 1,
    );
    assert.equal(
      failed.length,
      0,
      `Horizontal document overflow: ${JSON.stringify(failed)}`,
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await setTheme("light");
    await visit();
    await page.screenshot({
      path: join(output, "after-desktop-light.png"),
      fullPage: true,
    });
    await page.screenshot({
      path: join(output, "after-desktop-hero-light.png"),
    });
    await page.setViewportSize({ width: 375, height: 844 });
    await page.screenshot({
      path: join(output, "after-mobile-light.png"),
      fullPage: true,
    });
    await page.screenshot({
      path: join(output, "after-mobile-hero-light.png"),
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await setTheme("dark");
  },
);

await check(
  "Project filters update visible projects and pressed states",
  async () => {
    await visit("/#projects");
    const controls = page.getByRole("group", { name: "Filter projects" });
    assert.equal(await page.locator(".project-gallery > article").count(), 5);
    await controls
      .getByRole("button", { name: "Community", exact: true })
      .click();
    assert.equal(await page.locator(".project-gallery > article").count(), 1);
    assert.match(
      await page.locator(".project-gallery").innerText(),
      /BD Blood Finder/,
    );
    assert.equal(
      await controls
        .getByRole("button", { name: "Community", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    await controls
      .getByRole("button", { name: "Frontend", exact: true })
      .click();
    assert.match(
      await page.locator(".project-gallery").innerText(),
      /MetroBridge/,
    );
    assert.doesNotMatch(
      await page.locator(".project-gallery").innerText(),
      /BD Blood Finder/,
    );
    await controls
      .getByRole("button", { name: "Full-stack", exact: true })
      .click();
    assert.equal(await page.locator(".project-gallery > article").count(), 1);
    assert.match(
      await page.locator(".project-gallery").innerText(),
      /Ponnaloy/,
    );
    await controls
      .getByRole("button", { name: "All work", exact: true })
      .click();
    assert.equal(await page.locator(".project-gallery > article").count(), 5);
  },
);

await check(
  "Research lens reorders truthful content with keyboard activation",
  async () => {
    await visit();
    const group = page.getByRole("group", {
      name: "Choose a portfolio perspective",
    });
    await group.getByRole("button", { name: "Research", exact: true }).focus();
    await page.keyboard.press("Space");
    assert.equal(
      await group
        .getByRole("button", { name: "Research", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    const researchOrder = await page.evaluate(() =>
      [...document.querySelector("main").children].map(
        (element) => element.id || element.className,
      ),
    );
    assert.ok(
      researchOrder.indexOf("research") < researchOrder.indexOf("projects"),
      JSON.stringify(researchOrder),
    );
    await group
      .getByRole("button", { name: "Engineering", exact: true })
      .click();
    const engineeringOrder = await page.evaluate(() =>
      [...document.querySelector("main").children].map(
        (element) => element.id || element.className,
      ),
    );
    assert.ok(
      engineeringOrder.indexOf("projects") <
        engineeringOrder.indexOf("research"),
      JSON.stringify(engineeringOrder),
    );
  },
);

await check(
  "Toolkit categories, search, disclosures, project links and empty state",
  async () => {
    await visit("/#skills");
    const group = page.getByRole("group", {
      name: "Filter technology evidence",
    });
    const search = page.getByRole("searchbox", { name: "Search technologies" });
    assert.ok((await page.locator(".technology-item").count()) >= 35);
    await group
      .getByRole("button", { name: "Project-backed", exact: true })
      .click();
    await search.fill("Fastify");
    assert.equal(await page.locator(".technology-item").count(), 1);
    await page.locator(".technology-item > summary").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.locator(".technology-item").getAttribute("open"),
      "",
    );
    assert.equal(
      await page.locator(".technology-detail a").getAttribute("href"),
      "/work/ponnaloy",
    );
    await search.fill("not-a-real-technology-qa");
    await page.getByText("No technologies match.", { exact: false }).waitFor();
    await search.fill("Python");
    assert.equal(await page.locator(".technology-item").count(), 0);
    await group
      .getByRole("button", { name: "Self-reported", exact: true })
      .click();
    assert.equal(await page.locator(".technology-item").count(), 1);
    await search.fill("");
    await group
      .getByRole("button", { name: "Complete toolkit", exact: true })
      .click();
  },
);

await check(
  "Lab atlas selection, keyboard operation and full static notebook",
  async () => {
    await visit("/lab");
    assert.match(await page.title(), /Research Lab/);
    const buttons = page
      .getByRole("group", { name: "Research topics" })
      .getByRole("button");
    assert.equal(await buttons.count(), 7);
    const firstQuestion = await page.locator(".atlas-question").innerText();
    await buttons.nth(1).focus();
    await page.keyboard.press("Enter");
    assert.notEqual(
      await page.locator(".atlas-question").innerText(),
      firstQuestion,
    );
    assert.equal(await buttons.nth(1).getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator(".interest-card").count(), 7);
    await page
      .getByRole("link", { name: "Read the full note", exact: false })
      .click();
    assert.match(page.url(), /#interest-machine-learning$/);
    await page.screenshot({
      path: join(output, "after-lab.png"),
      fullPage: true,
    });
  },
);

await check(
  "Homepage research-question links reach their corresponding notebook note",
  async () => {
    await visit();
    const questionLinks = page.locator(".research-preview-card a");
    const destinations = await questionLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    );
    assert.equal(destinations.length, 3);
    for (const destination of destinations) {
      await visit(destination);
      const target = new URL(page.url()).hash.slice(1);
      assert.ok(target, "A question link should include a notebook fragment");
      assert.equal(
        await page.locator(`[id="${target}"]`).count(),
        1,
        `Missing notebook target ${destination}`,
      );
      assert.equal(
        await page.evaluate(() => document.activeElement.id),
        target,
      );
    }
  },
);

await check(
  "Journal real notes, hash deep link and keyboard-readable code",
  async () => {
    await visit("/journal");
    assert.ok((await page.locator(".journal-entry").count()) >= 2);
    assert.ok((await page.locator('pre[tabindex="0"]').count()) >= 1);
    const entryLink = page
      .getByRole("navigation", { name: "Journal entries", exact: true })
      .getByRole("link")
      .nth(1);
    await entryLink.click();
    assert.ok(page.url().includes("#"));
    const hash = new URL(page.url()).hash.slice(1);
    assert.equal(
      await page.evaluate((hash) => document.activeElement.id === hash, hash),
      true,
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator(`#${hash}`).count(), 1);
  },
);

await check(
  "Five case studies: navigation, title, source links and architecture",
  async () => {
    for (const project of projects) {
      await visit("/#projects");
      await page
        .locator(".project-card h3")
        .getByRole("link", { name: project.title, exact: true })
        .click();
      await page.locator("h1").filter({ hasText: project.title }).waitFor();
      assert.equal(new URL(page.url()).pathname, `/work/${project.slug}`);
      assert.match(await page.title(), new RegExp(project.title));
      assert.ok((await page.locator(".case-section").count()) >= 13);
      assert.equal(
        await page
          .getByRole("link", { name: "View source", exact: true })
          .getAttribute("href"),
        project.sourceUrl,
      );
      assert.equal(
        await page
          .getByRole("link", { name: "View source", exact: true })
          .getAttribute("rel"),
        "noopener noreferrer",
      );
      const nodes = page
        .getByRole("group", { name: "Architecture components" })
        .getByRole("button");
      if ((await nodes.count()) > 1) {
        const before = await page
          .locator(".architecture-description")
          .innerText();
        await nodes.nth(1).click();
        assert.notEqual(
          await page.locator(".architecture-description").innerText(),
          before,
        );
        assert.equal(await nodes.nth(1).getAttribute("aria-pressed"), "true");
        await page
          .getByText("Read all component descriptions", { exact: true })
          .click();
        assert.ok(
          (await page
            .locator(".architecture-explorer details[open] dd")
            .count()) >= 2,
        );
      }
      await page.reload({ waitUntil: "networkidle" });
      assert.match(
        await page.locator("h1").innerText(),
        new RegExp(project.title),
      );
    }
    await page.screenshot({
      path: join(output, "after-case-study.png"),
      fullPage: true,
    });
  },
);

await check(
  "Browser back/forward, incoming anchors and missing-route fallback",
  async () => {
    await visit();
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: "Lab", exact: true })
      .click();
    await page.locator(".lab-page").waitFor();
    await page
      .getByRole("navigation", { name: "Main navigation", exact: true })
      .getByRole("link", { name: "Journal", exact: true })
      .click();
    await page.locator(".journal-page").waitFor();
    await page.goBack();
    await page.locator(".lab-page").waitFor();
    await page.goForward();
    await page.locator(".journal-page").waitFor();
    await visit("/#contact");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "contact",
    );
    assert.ok(
      await page
        .locator("#contact")
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top >= 0 &&
            element.getBoundingClientRect().top < 300,
        ),
    );
    await visit("/unknown-route-qa");
    assert.match(await page.locator("h1").innerText(), /isn.t/);
    assert.equal(
      await page.locator('meta[name="robots"]').getAttribute("content"),
      "noindex, follow",
    );
  },
);

await check(
  "Theme toggle persists across reload and updates semantic colors",
  async () => {
    await visit();
    await setTheme("dark");
    const dark = await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    await page
      .getByRole("button", { name: "Switch to light theme", exact: true })
      .click();
    assert.equal(
      await page.locator("html").getAttribute("data-theme"),
      "light",
    );
    const light = await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    assert.notEqual(dark, light);
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(
      await page.locator("html").getAttribute("data-theme"),
      "light",
    );
    await page
      .getByRole("button", { name: "Switch to dark theme", exact: true })
      .click();
  },
);

await check(
  "Keyboard mobile menu: Tab loop, Escape, hidden links and route focus",
  async () => {
    await page.setViewportSize({ width: 375, height: 844 });
    await visit();
    const toggle = page.getByRole("button", {
      name: "Open navigation",
      exact: true,
    });
    assert.equal(
      await page.getByRole("navigation", { name: "Mobile navigation" }).count(),
      0,
    );
    await toggle.focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page
        .getByRole("button", { name: "Close navigation", exact: true })
        .getAttribute("aria-expanded"),
      "true",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent.trim()),
      "Work",
    );
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent.trim()),
      "Contact",
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Close navigation",
    );
    await page.keyboard.press("Escape");
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.getAttribute("aria-label"),
      ),
      "Open navigation",
    );
    await page.keyboard.press("Enter");
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Lab", exact: true })
      .click();
    await page.locator(".lab-page").waitFor();
    assert.equal(
      await page.getByRole("navigation", { name: "Mobile navigation" }).count(),
      0,
    );
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "main-content",
    );
    await page.locator(".skip-link").focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "main-content",
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
  },
);

await check(
  "Reduced motion: static content and no long-running animations",
  async () => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visit();
    const motion = await page.evaluate(() => ({
      scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      animations: document
        .getAnimations()
        .filter((animation) => animation.playState === "running")
        .map((animation) => animation.effect.getTiming()),
      headingOpacity: getComputedStyle(document.querySelector("h1")).opacity,
    }));
    assert.equal(motion.scrollBehavior, "auto");
    assert.equal(motion.headingOpacity, "1");
    assert.deepEqual(
      motion.animations.filter(
        (animation) =>
          animation.duration > 1 || animation.iterations === Infinity,
      ),
      [],
    );
    await page
      .getByRole("group", { name: "Choose a portfolio perspective" })
      .getByRole("button", { name: "Research", exact: true })
      .click();
    await page.emulateMedia({ reducedMotion: "no-preference" });
  },
);

await check(
  "Contact validation, mocked success, rate limit, HTTP error and network error",
  async () => {
    let posts = 0;
    let behavior = "success";
    await page.route("**/*", async (route) => {
      if (route.request().method() !== "POST") return route.fallback();
      posts++;
      if (behavior === "network") return route.abort("failed");
      return route.fulfill({
        status: behavior === "success" ? 200 : 422,
        contentType: "application/json",
        body: JSON.stringify(
          behavior === "success"
            ? { ok: true }
            : { errors: [{ message: "Mocked rejection" }] },
        ),
      });
    });
    await visit("/#contact");
    let form = page.locator(".contact-form");
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    assert.equal(posts, 0);
    assert.equal(
      await form.evaluate((element) => element.checkValidity()),
      false,
    );
    form = await fillContact();
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    await form
      .getByRole("status")
      .filter({ hasText: "accepted by the form service" })
      .waitFor();
    assert.equal(posts, 1);
    assert.equal(await form.getByLabel("Your name").inputValue(), "");
    form = await fillContact();
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    await form
      .getByRole("status")
      .filter({ hasText: "wait 30 seconds" })
      .waitFor();
    assert.equal(posts, 1);
    await visit("/#contact");
    behavior = "error";
    form = await fillContact();
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    await form
      .getByRole("status")
      .filter({ hasText: "could not be sent" })
      .waitFor();
    assert.equal(
      await form.getByLabel("Your name").inputValue(),
      "Portfolio QA",
    );
    behavior = "network";
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    await page.waitForTimeout(100);
    await form
      .getByRole("status")
      .filter({ hasText: "could not be sent" })
      .waitFor();
    assert.equal(posts, 3);
    assert.equal(
      await form
        .getByRole("link", { name: "Email me directly.", exact: true })
        .getAttribute("href"),
      "mailto:limonroyapu101@gmail.com",
    );
    await visit("/#contact");
    form = await fillContact();
    await form.locator('input[name="website"]').evaluate((input) => {
      input.value = "bot";
    });
    await form
      .getByRole("button", { name: "Send a note", exact: false })
      .click();
    await page.waitForTimeout(100);
    assert.equal(posts, 3, "Honeypot request must not be sent");
    await page.unroute("**/*");
  },
);

await check(
  "Source action opens the intended repository in an isolated tab",
  async () => {
    await context.route("https://github.com/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<title>Local QA source destination</title><p>External navigation intercepted for QA.</p>",
      }),
    );
    await visit("/work/ponnaloy");
    const [popup] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("link", { name: "View source", exact: true }).click(),
    ]);
    await popup.waitForLoadState("domcontentloaded");
    assert.equal(
      popup.url(),
      projects.find((project) => project.slug === "ponnaloy").sourceUrl,
    );
    assert.equal(await popup.evaluate(() => window.opener === null), true);
    await popup.close();
  },
);

await check(
  "All local links resolve to a rendered route and fragment target",
  async () => {
    const documents = new Map();
    const links = [];
    for (const route of routes) {
      await visit(route);
      documents.set(
        route,
        new Set(
          await page
            .locator("[id]")
            .evaluateAll((elements) => elements.map((element) => element.id)),
        ),
      );
      links.push(
        ...(await page
          .locator("a[href]")
          .evaluateAll((elements) =>
            elements.map((element) => ({
              href: element.href,
              text: element.textContent.trim().slice(0, 70),
            })),
          )),
      );
    }
    const missing = [];
    for (const link of links) {
      const destination = new URL(link.href);
      if (destination.origin !== new URL(baseURL).origin) continue;
      const route = destination.pathname.replace(/\/$/, "") || "/";
      if (!documents.has(route))
        missing.push({ ...link, reason: "Unknown route" });
      else if (
        destination.hash &&
        !documents.get(route).has(decodeURIComponent(destination.hash.slice(1)))
      )
        missing.push({ ...link, reason: "Missing fragment" });
    }
    assert.equal(
      missing.length,
      0,
      `Broken local links: ${JSON.stringify(missing)}`,
    );
  },
);

if (process.env.QA_STATIC_EXPORT === "1")
  await check(
    "Production static metadata, complete no-JavaScript routes and local share assets",
    async () => {
      const staticContext = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 1440, height: 1000 },
      });
      const staticPage = await staticContext.newPage();
      for (const route of routes) {
        const response = await staticPage.goto(`${baseURL}${route}`, {
          waitUntil: "networkidle",
        });
        assert.equal(response.status(), 200);
        const raw = await response.text();
        const title = await staticPage.title();
        assert.ok(
          raw.includes(`<title>${title.replaceAll("&", "&amp;")}</title>`),
          `${route} title must be present in raw HTTP HTML`,
        );
        assert.equal(
          await staticPage
            .locator('link[rel="canonical"]')
            .getAttribute("href"),
          `https://my-profile-green-beta.vercel.app${route}`,
        );
        assert.equal(
          await staticPage
            .locator('meta[property="og:title"]')
            .getAttribute("content"),
          title,
        );
        assert.equal(
          await staticPage
            .locator('meta[name="twitter:title"]')
            .getAttribute("content"),
          title,
        );
        assert.equal(
          await staticPage.locator("main#static-content").count(),
          1,
        );
        assert.equal(await staticPage.locator("main h1").count(), 1);
        assert.match(
          await staticPage.locator("main").innerText(),
          /Limon Roy Apu/,
        );
        if (route.startsWith("/work/")) {
          const project = projects.find(
            (project) => route === `/work/${project.slug}`,
          );
          assert.match(title, new RegExp(project.title));
          assert.equal(
            await staticPage.locator('section[id^="section-"]').count(),
            13,
          );
          assert.ok(
            await staticPage
              .getByRole("heading", {
                name: "Reviewed architecture components",
                exact: true,
              })
              .count(),
          );
          assert.ok(
            await staticPage
              .getByRole("heading", { name: "Source evidence", exact: true })
              .count(),
          );
        } else if (route === "/lab")
          assert.equal(
            await staticPage.locator('section[id^="interest-"]').count(),
            7,
          );
        else if (route === "/journal")
          assert.ok((await staticPage.locator("main article").count()) >= 3);
        else assert.equal(await staticPage.locator("main article").count(), 5);
      }
      await staticPage.goto(`${baseURL}/work/ponnaloy`, {
        waitUntil: "networkidle",
      });
      await staticPage.screenshot({
        path: join(output, "after-no-javascript-case-study.png"),
        fullPage: true,
      });
      await staticPage.goto(`${baseURL}/404.html`, {
        waitUntil: "networkidle",
      });
      assert.equal(
        await staticPage.locator('meta[name="robots"]').getAttribute("content"),
        "noindex, follow",
      );
      assert.match(
        await staticPage.locator("h1").innerText(),
        /not in the notebook/,
      );
      const favicon = await context.request.get(`${baseURL}/favicon.svg`);
      assert.equal(favicon.status(), 200);
      assert.match(favicon.headers()["content-type"], /svg/);
      const social = await context.request.get(`${baseURL}/social-preview.png`);
      assert.equal(social.status(), 200);
      assert.match(social.headers()["content-type"], /png/);
      const dimensions = await page.evaluate(async (url) => {
        const image = new Image();
        image.src = url;
        await image.decode();
        return [image.naturalWidth, image.naturalHeight];
      }, `${baseURL}/social-preview.png`);
      assert.deepEqual(dimensions, [1200, 630]);
      const coreRequests = await page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .filter(
            (entry) =>
              ["script", "css", "link", "img"].includes(entry.initiatorType) &&
              !entry.name.startsWith(location.origin),
          )
          .map((entry) => entry.name),
      );
      assert.deepEqual(
        coreRequests,
        [],
        "Core UI must not request external visual/font/script services",
      );
      await staticContext.close();
    },
  );

await check(
  "Automated WCAG A/AA scans of all routes in dark and light themes",
  async () => {
    if (!axePath || !existsSync(axePath))
      throw new Error(
        "Set QA_AXE_CORE to an installed axe.min.js to reproduce accessibility scans.",
      );
    for (const theme of ["dark", "light"]) {
      await visit();
      await setTheme(theme);
      for (const route of routes) {
        await visit(route);
        await page.addScriptTag({ path: axePath });
        const result = await page.evaluate(async () => {
          const result = await window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
            },
          });
          return {
            violations: result.violations.map((item) => ({
              id: item.id,
              impact: item.impact,
              help: item.help,
              helpUrl: item.helpUrl,
              nodes: item.nodes.map((node) => ({
                target: node.target,
                summary: node.failureSummary,
              })),
            })),
            incomplete: result.incomplete.map((item) => ({
              id: item.id,
              count: item.nodes.length,
            })),
            passedRules: result.passes.length,
          };
        });
        accessibility.push({ theme, route, ...result });
        if (result.violations.length)
          console.error(
            `AXE ${theme} ${route}: ${result.violations.map((item) => `${item.id}(${item.nodes.length})`).join(", ")}`,
          );
      }
    }
    assert.equal(
      accessibility.reduce(
        (count, result) => count + result.violations.length,
        0,
      ),
      0,
      "See browser-results.json accessibility violations",
    );
  },
);

await check("No unhandled application runtime exceptions", async () =>
  assert.deepEqual(errors, []),
);
await browser.close();
const report = {
  capturedAt: new Date().toISOString(),
  browser: `Chromium ${browserVersion} headless; local browser executable, no emulated throttling`,
  baseURL,
  contactSafety:
    "All POST requests intercepted locally; no message delivered and no external account modified.",
  results,
  errors,
  responsive,
  accessibility,
  observations,
};
writeFileSync(
  join(output, "browser-results.json"),
  `${JSON.stringify(report, null, 2)}\n`,
);
console.log(
  `${results.filter((result) => result.status === "passed").length}/${results.length} checks passed; results: ${join(output, "browser-results.json")}`,
);
if (results.some((result) => result.status === "failed")) process.exitCode = 1;
