import test from "node:test";
import assert from "node:assert/strict";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import projects, {
  projects as namedProjects,
} from "../src/content/projects.js";
import validateContent, {
  assertValidContent,
  siteContent,
} from "../scripts/content-check.mjs";
import generatePages, {
  escapeHtml,
  getRoutes,
  getRouteMetadata,
  renderNoScript,
  renderRouteHtml,
  renderSitemap,
  SITE_ORIGIN,
  REQUIRED_PUBLIC_ASSETS,
} from "../scripts/generate-pages.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const template = await readFile(join(root, "index.html"), "utf8");
const copy = () => structuredClone(siteContent);
const routePaths = [
  "/",
  "/lab",
  "/journal",
  "/work/ponnaloy",
  "/work/wanderlust",
  "/work/book-courier",
  "/work/metrobridge",
  "/work/bd-blood-finder",
];

test("the published manifests have consistent evidence and resolvable project relationships", () => {
  assert.equal(projects, namedProjects);
  assert.equal(siteContent.projects, projects);
  assert.deepEqual(validateContent(), []);
  assert.equal(assertValidContent(), siteContent);
  assert.deepEqual(getRoutes(), routePaths);
  assert.equal(new Set(getRoutes()).size, 8);
  assert.equal(projects.filter((project) => project.featured).length, 3);
  for (const technology of siteContent.technologies.filter(
    (item) => item.status === "verified",
  )) {
    assert.ok(
      technology.projectIds.length > 0,
      `${technology.name} must have project evidence`,
    );
    for (const id of technology.projectIds)
      assert.ok(
        id === "atelier" || projects.some((project) => project.id === id),
      );
  }
});

test("verified claims cannot survive removal of evidence, dates, contribution scope, or source pins", () => {
  for (const mutation of [
    (content) => {
      content.projects[0].sources = [];
    },
    (content) => {
      delete content.projects[0].verifiedAt;
    },
    (content) => {
      content.projects[0].verifiedAt = "2026-02-30";
    },
    (content) => {
      content.projects[0].contribution = "";
    },
    (content) => {
      content.projects[0].evidenceStatus = "PRODUCTION-READY";
    },
    (content) => {
      content.projects[0].sources[0].url =
        content.projects[0].sources[0].url.replace(
          content.projects[0].revision,
          "main",
        );
    },
    (content) => {
      content.projects[0].sections.pop();
    },
    (content) => {
      content.projects[0].architecture[0].description = "";
    },
  ]) {
    const content = copy();
    mutation(content);
    assert.ok(validateContent(content).length > 0);
    assert.throws(
      () => assertValidContent(content),
      /Content validation failed/,
    );
  }
});

test("unknown project references and inflated interest classifications are rejected", () => {
  const unknown = copy();
  unknown.technologies[0].projectIds.push("nonexistent-project");
  assert.ok(
    validateContent(unknown).some((error) =>
      error.includes("unknown project reference nonexistent-project"),
    ),
  );
  const unsupported = copy();
  unsupported.technologies[0].projectIds = [];
  assert.ok(
    validateContent(unsupported).some((error) =>
      error.includes("verified usage needs a project reference"),
    ),
  );
  const interest = copy();
  interest.researchInterests[0].status = "verified";
  assert.ok(
    validateContent(interest).some((error) =>
      error.includes("must remain classified as interest"),
    ),
  );
  const duplicate = copy();
  duplicate.projects[1].id = duplicate.projects[0].id;
  assert.ok(
    validateContent(duplicate).some((error) =>
      error.includes("Project IDs: duplicate"),
    ),
  );
});

test("public links cannot use scripts, credentials, HTTP, or missing destinations", () => {
  for (const unsafe of [
    "javascript:alert(1)",
    "https://user:password@example.com",
    "http://example.com",
    "",
    null,
  ]) {
    const content = copy();
    content.projects[0].sources[0].url = unsafe;
    assert.ok(
      validateContent(content).some((error) =>
        error.includes("missing or unsafe evidence URL"),
      ),
    );
  }
  const missingDemoDecision = copy();
  delete missingDemoDecision.projects[0].demoUrl;
  assert.ok(
    validateContent(missingDemoDecision).some((error) =>
      error.includes("demoUrl must explicitly"),
    ),
  );
  const unsafeEmail = copy();
  unsafeEmail.profile.email = "missing-address";
  assert.ok(
    validateContent(unsafeEmail).some((error) =>
      error.includes("invalid email"),
    ),
  );
});

test("all public routes have distinct truthful metadata and matching social canonicals", () => {
  const titles = new Set();
  for (const path of routePaths) {
    const metadata = getRouteMetadata(path);
    titles.add(metadata.title);
    assert.equal(metadata.known, true);
    assert.equal(metadata.canonical, `${SITE_ORIGIN}${path}`);
    assert.equal(metadata.robots, "index, follow");
    const html = renderRouteHtml(template, path);
    assert.ok(html.includes(`<title>${escapeHtml(metadata.title)}</title>`));
    assert.ok(
      html.includes(`<link rel="canonical" href="${metadata.canonical}"`),
    );
    assert.ok(
      html.includes(`<meta property="og:url" content="${metadata.canonical}"`),
    );
    for (const field of ["og:title", "twitter:title"])
      assert.ok(
        html.includes(`${field}" content="${escapeHtml(metadata.title)}"`),
      );
    for (const field of [
      "description",
      "og:description",
      "twitter:description",
    ])
      assert.ok(
        html.includes(
          `${field}" content="${escapeHtml(metadata.description)}"`,
        ),
      );
    assert.ok(html.includes("/social-preview.png"));
    assert.ok(
      html.includes('<script type="module" src="/src/main.jsx"></script>'),
      "route generation must preserve the application script",
    );
  }
  assert.equal(titles.size, routePaths.length);
});

test("unknown routes use noindex and cannot reflect attacker-controlled canonical URLs", () => {
  for (const path of [
    "/unwritten",
    "/work/ponnaloy/extra",
    "//malicious.example/path",
    "/<script>alert(1)</script>",
  ]) {
    const metadata = getRouteMetadata(path);
    assert.equal(metadata.known, false);
    assert.equal(metadata.canonical, `${SITE_ORIGIN}/404.html`);
    const html = renderRouteHtml(template, path);
    assert.ok(html.includes('content="noindex, follow"'));
    assert.ok(html.includes("<h1>This page is not in the notebook.</h1>"));
    assert.ok(!html.includes("malicious.example"));
  }
  assert.equal(
    getRouteMetadata("/lab/?tracking=test#question").canonical,
    `${SITE_ORIGIN}/lab`,
  );
});

test("metadata, attributes, and no-JavaScript content escape injected HTML and literal replacement tokens", () => {
  assert.equal(escapeHtml("&<>\"'"), "&amp;&lt;&gt;&quot;&#39;");
  const content = copy();
  const payload = '</title><script>alert("test")</script> & \' $&';
  content.projects[0].title = payload;
  content.projects[0].summary = '" onload="alert(1)" <b>injected</b>';
  content.projects[0].sections[0].body =
    "</noscript><img src=x onerror=alert(1)>";
  content.projects[0].sources[0].note = '<iframe src="bad"></iframe>';
  const html = renderRouteHtml(template, "/work/ponnaloy", content);
  assert.ok(html.includes(escapeHtml(payload)));
  assert.ok(
    html.includes("&lt;/noscript&gt;&lt;img src=x onerror=alert(1)&gt;"),
  );
  assert.ok(html.includes("&lt;iframe src=&quot;bad&quot;&gt;&lt;/iframe&gt;"));
  assert.ok(!html.includes("<script>alert("));
  assert.ok(!html.includes("<img src=x"));
  assert.ok(!html.includes("<iframe"));
  assert.equal((html.match(/<noscript>/g) || []).length, 1);
  assert.equal((html.match(/<\/noscript>/g) || []).length, 1);
  const unsafe = copy();
  unsafe.projects[0].sourceUrl = "javascript:alert(1)";
  assert.throws(
    () => renderNoScript("/work/ponnaloy", unsafe),
    /Unsafe public link/,
  );
});

test("no-JavaScript visitors can read identity, project evidence, research questions, and actual decisions", () => {
  for (const path of routePaths) {
    const fallback = renderNoScript(path);
    assert.ok(fallback.includes("Limon Roy Apu"));
    assert.ok(
      fallback.includes("CSE Undergraduate &amp; Research-Minded Developer"),
    );
    assert.ok(fallback.includes("mailto:limonroyapu101@gmail.com"));
  }
  for (const project of projects) {
    const fallback = renderNoScript(`/work/${project.slug}`);
    assert.ok(fallback.includes(escapeHtml(project.summary)));
    for (const section of project.sections)
      assert.ok(fallback.includes(escapeHtml(section.title)));
    for (const source of project.sources)
      assert.ok(fallback.includes(escapeHtml(source.url)));
    assert.ok(
      fallback.includes(
        "Runtime behavior and sole authorship are not established.",
      ),
    );
  }
  const lab = renderNoScript("/lab");
  for (const interest of siteContent.researchInterests)
    assert.ok(lab.includes(escapeHtml(interest.question)));
  const journal = renderNoScript("/journal");
  for (const entry of siteContent.journalEntries)
    assert.ok(journal.includes(escapeHtml(entry.reasoning)));
});

test("missing or duplicated template metadata causes an actionable generation error", () => {
  assert.throws(
    () =>
      renderRouteHtml(template.replace(/<title>[\s\S]*?<\/title>/, ""), "/lab"),
    /expected one title, found 0/,
  );
  const duplicate = template.replace(
    "</head>",
    '<meta name="description" content="duplicate" /></head>',
  );
  assert.throws(
    () => renderRouteHtml(duplicate, "/lab"),
    /expected one description, found 2/,
  );
});

test("sitemap includes exactly known routes and robots points at the verified portfolio origin", async () => {
  const generated = renderSitemap();
  const locations = [...generated.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(
    locations,
    routePaths.map((path) => `${SITE_ORIGIN}${path}`),
  );
  assert.ok(!generated.includes("404"));
  const publicSitemap = await readFile(
    join(root, "public/sitemap.xml"),
    "utf8",
  );
  assert.equal(publicSitemap.replace(/\r\n/g, "\n").trim(), generated.trim());
  const robots = await readFile(join(root, "public/robots.txt"), "utf8");
  assert.ok(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`));
  assert.ok(!robots.includes("limondevs.vercel.app"));
});

test("packaging requires explicit assets and produces all deep links without copying unused public files", async () => {
  const temporaryRoot = resolve(tmpdir());
  const fixture = await mkdtemp(join(temporaryRoot, "atelier-package-test-"));
  try {
    const publicDirectory = join(fixture, "public");
    const distDirectory = join(fixture, "dist");
    await mkdir(publicDirectory);
    await mkdir(distDirectory);
    await writeFile(join(distDirectory, "index.html"), template);
    for (const asset of REQUIRED_PUBLIC_ASSETS.filter(
      (name) => name !== "social-preview.png",
    ))
      await writeFile(join(publicDirectory, asset), `fixture for ${asset}`);
    await writeFile(
      join(publicDirectory, "hero.svg"),
      "Unused legacy asset must stay outside dist.",
    );
    await assert.rejects(
      generatePages({ rootDirectory: fixture }),
      /required public asset is missing or empty: public\/social-preview.png/,
    );
    await assert.rejects(access(join(distDirectory, "lab")), /ENOENT/);
    await writeFile(
      join(publicDirectory, "social-preview.png"),
      "fixture social image",
    );
    const result = await generatePages({ rootDirectory: fixture });
    assert.equal(result.routes, 8);
    assert.equal(result.assets, 4);
    for (const path of routePaths) {
      const destination =
        path === "/"
          ? join(distDirectory, "index.html")
          : join(distDirectory, path.slice(1), "index.html");
      const html = await readFile(destination, "utf8");
      if (path !== "/") {
        assert.equal(
          await readFile(join(distDirectory, `${path.slice(1)}.html`), "utf8"),
          html,
          "Extensionless and directory routes must serve identical metadata and fallback text",
        );
      }
      assert.ok(
        html.includes(
          `<title>${escapeHtml(getRouteMetadata(path).title)}</title>`,
        ),
      );
    }
    assert.ok(
      (await readFile(join(distDirectory, "404.html"), "utf8")).includes(
        "noindex, follow",
      ),
    );
    assert.equal(
      await readFile(join(distDirectory, "sitemap.xml"), "utf8"),
      renderSitemap(),
    );
    const packaged = await readdir(distDirectory);
    assert.ok(!packaged.includes("hero.svg"));
    for (const asset of REQUIRED_PUBLIC_ASSETS)
      assert.ok(packaged.includes(asset));
  } finally {
    // Only remove the unique fixture created above, directly inside the temp root.
    assert.equal(dirname(resolve(fixture)), temporaryRoot);
    assert.ok(basename(fixture).startsWith("atelier-package-test-"));
    await rm(fixture, { recursive: true, force: true });
  }
});
