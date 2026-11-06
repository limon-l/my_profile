import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertValidContent, siteContent } from "./content-check.mjs";

export const SITE_ORIGIN = "https://my-profile-green-beta.vercel.app";
export const REQUIRED_PUBLIC_ASSETS = Object.freeze([
  "hero.jpeg",
  "favicon.svg",
  "robots.txt",
  "social-preview.png",
]);
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Safe in both HTML text and quoted attribute values; never return raw content. */
export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

export function getRoutes(content = siteContent) {
  return [
    "/",
    "/lab",
    "/journal",
    ...content.projects.map((project) => `/work/${project.slug}`),
  ];
}

/** Unknown routes have one canonical noindex document, never a reflected URL. */
export function getRouteMetadata(path, content = siteContent) {
  const normalized = String(path).split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  const project = content.projects.find(
    (item) => normalized === `/work/${item.slug}`,
  );
  let title;
  let description;
  let known = true;
  if (project) {
    title = `${project.title} — Engineering Case Study | Limon Roy Apu`;
    description = project.summary;
  } else if (normalized === "/lab") {
    title = "Research Lab — Questions & Learning | Limon Roy Apu";
    description =
      "Explore Limon Roy Apu’s research interests in AI, machine learning, reproducible software, and human-centered computing. An honest notebook of open questions.";
  } else if (normalized === "/journal") {
    title = "Engineering Decision Journal | Limon Roy Apu";
    description =
      "Contemporary implementation notes from this portfolio redesign: architecture, evidence-based content, and purposeful interaction.";
  } else if (normalized === "/") {
    title = "Limon Roy Apu — CSE Undergraduate & Research-Minded Developer";
    description =
      "Exploring artificial intelligence, machine learning, and emerging technologies while building practical full-stack software. Selected engineering work, research interests, and decisions.";
  } else {
    known = false;
    title = "Page not found | Limon Roy Apu";
    description =
      "This page is not in the notebook. Explore Limon Roy Apu’s selected engineering work and research interests.";
  }
  return {
    path: known ? normalized : "/404.html",
    title,
    description,
    canonical: `${SITE_ORIGIN}${known ? normalized : "/404.html"}`,
    robots: known ? "index, follow" : "noindex, follow",
    known,
  };
}

const paragraphs = (body) =>
  (Array.isArray(body) ? body : [body])
    .map((value) => `<p>${escapeHtml(value)}</p>`)
    .join("");
const items = (values) =>
  `<ul>${values.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>`;
const externalLink = (url, label) => {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.username || parsed.password)
    throw new Error(`Unsafe public link in static content: ${label}`);
  return `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`;
};

export function renderNoScript(path, content = siteContent) {
  const metadata = getRouteMetadata(path, content);
  const project = content.projects.find(
    (item) => metadata.path === `/work/${item.slug}`,
  );
  const identity = `<p>${escapeHtml(content.profile.name)} · ${escapeHtml(content.profile.headline)}</p>`;
  let body;
  if (project) {
    body = `<h1>${escapeHtml(project.title)}</h1><p>${escapeHtml(project.summary)}</p><p><strong>Source reviewed ${escapeHtml(project.verifiedAt)}. Runtime behavior and sole authorship are not established.</strong></p><p>${externalLink(project.sourceUrl, "View the public source")}${project.demoUrl ? ` · ${externalLink(project.demoUrl, project.demoLabel || "Open checked demo page")}` : ""}</p>`;
    body += project.sections
      .map(
        (section, index) =>
          `<section id="section-${index + 1}"><h2>${escapeHtml(section.title)}</h2>${paragraphs(section.body)}${section.items?.length ? items(section.items) : ""}</section>`,
      )
      .join("");
    body += `<section><h2>Reviewed architecture components</h2><dl>${project.architecture.map((node) => `<dt><strong>${escapeHtml(node.label)}</strong></dt><dd>${escapeHtml(node.description)}</dd>`).join("")}</dl></section><section><h2>Source evidence</h2><ul>${project.sources.map((source) => `<li>${externalLink(source.url, source.label)}${paragraphs(source.note)}</li>`).join("")}</ul></section>`;
  } else if (metadata.path === "/lab") {
    body =
      "<h1>Research interests & open questions</h1><p>These are learning interests and possible directions, not completed experiments, publications, or academic affiliations.</p>";
    body += content.researchInterests
      .map(
        (interest) =>
          `<section id="interest-${escapeHtml(interest.id)}"><h2>${escapeHtml(interest.topic)}</h2><p><strong>Interest</strong></p><p>${escapeHtml(interest.motivation)}</p><blockquote>${escapeHtml(interest.question)}</blockquote><p>${escapeHtml(interest.direction)}</p></section>`,
      )
      .join("");
  } else if (metadata.path === "/journal") {
    body =
      "<h1>Engineering decision journal</h1><p>These are contemporary implementation records from this portfolio redesign, not reconstructed owner history.</p>";
    body += content.journalEntries
      .map(
        (entry) =>
          `<article id="${escapeHtml(entry.id)}"><h2>${escapeHtml(entry.title)}</h2><p>${escapeHtml(entry.topic)} · ${escapeHtml(entry.date)}</p><dl><dt>Context & problem</dt><dd>${escapeHtml(entry.context)} ${escapeHtml(entry.problem)}</dd><dt>Alternatives</dt><dd>${items(entry.alternatives)}</dd><dt>Chosen approach</dt><dd>${escapeHtml(entry.approach)}</dd><dt>Reasoning</dt><dd>${escapeHtml(entry.reasoning)}</dd><dt>Trade-offs</dt><dd>${escapeHtml(entry.tradeoffs)}</dd><dt>Evidence in this checkout</dt><dd>${items(entry.evidence)}</dd><dt>Remaining question</dt><dd>${escapeHtml(entry.questions)}</dd></dl></article>`,
      )
      .join("");
  } else if (metadata.known) {
    body = `<h1>${escapeHtml(content.profile.name)}</h1><h2>${escapeHtml(content.profile.headline)}</h2><p>${escapeHtml(content.profile.supportingCopy)}</p><p>Based in ${escapeHtml(content.profile.location)}. Educational identity is self-reported; institution and dates are not independently verified.</p><h2>Selected engineering work</h2>`;
    body += content.projects
      .map(
        (item) =>
          `<article><h3><a href="/work/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a></h3><p>${escapeHtml(item.summary)}</p><p>${escapeHtml(item.insight)}</p><p>Source reviewed ${escapeHtml(item.verifiedAt)}; runtime behavior and sole authorship remain unverified.</p><p>${externalLink(item.sourceUrl, "Read the source")}</p></article>`,
      )
      .join("");
    body +=
      '<p><a href="/lab">Explore research questions</a> or <a href="/journal">read implementation decisions</a>.</p>';
  } else {
    body =
      '<h1>This page is not in the notebook.</h1><p>The requested page could not be found. <a href="/">Return to the atelier</a> or explore the selected work.</p>';
  }
  const navigation = getRoutes(content)
    .map((route) => {
      const label =
        route === "/"
          ? "Home"
          : route === "/lab"
            ? "Research Lab"
            : route === "/journal"
              ? "Journal"
              : content.projects.find((item) => route === `/work/${item.slug}`)
                  .title;
      return `<a href="${escapeHtml(route)}">${escapeHtml(label)}</a>`;
    })
    .join(" · ");
  return `<noscript><div style="max-width:52rem;margin:3rem auto;padding:1.25rem;font-family:system-ui;line-height:1.7;overflow-wrap:anywhere"><a href="#static-content">Skip to content</a><nav aria-label="Portfolio">${navigation}</nav><main id="static-content">${identity}${body}</main><footer><p>${externalLink("https://github.com/limon-l", "GitHub")} · ${externalLink("https://www.linkedin.com/in/limonroyapu/", "LinkedIn")} · <a href="mailto:${escapeHtml(content.profile.email)}">Email ${escapeHtml(content.profile.name)}</a></p><p>The full text remains available here without JavaScript. Interactive controls require JavaScript.</p></footer></div></noscript>`;
}

function replaceRequired(html, expression, replacement, label) {
  const count = [...html.matchAll(new RegExp(expression.source, "gi"))].length;
  if (count !== 1)
    throw new Error(
      `Cannot generate route metadata: expected one ${label}, found ${count}.`,
    );
  return html.replace(expression, () => replacement);
}

export function renderRouteHtml(template, path, content = siteContent) {
  const data = getRouteMetadata(path, content);
  let html = replaceRequired(
    template,
    /<title\b[^>]*>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(data.title)}</title>`,
    "title",
  );
  const meta = (attribute, key, value) => {
    const expression = new RegExp(
      `<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${key}["'])[^>]*>`,
      "i",
    );
    html = replaceRequired(
      html,
      expression,
      `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`,
      key,
    );
  };
  meta("name", "description", data.description);
  meta("name", "robots", data.robots);
  meta("property", "og:url", data.canonical);
  meta("property", "og:title", data.title);
  meta("property", "og:description", data.description);
  meta("name", "twitter:title", data.title);
  meta("name", "twitter:description", data.description);
  html = replaceRequired(
    html,
    /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(data.canonical)}" />`,
    "canonical link",
  );
  return replaceRequired(
    html,
    /<noscript\b[^>]*>[\s\S]*?<\/noscript>/i,
    renderNoScript(path, content),
    "no-JavaScript fallback",
  );
}

export function renderSitemap(content = siteContent) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getRoutes(
    content,
  )
    .map(
      (route) =>
        `  <url><loc>${escapeHtml(`${SITE_ORIGIN}${route}`)}</loc></url>`,
    )
    .join("\n")}\n</urlset>\n`;
}

/** Explicit copies bypass unused legacy public files without deleting user work. */
export async function generatePages(options = {}) {
  const sourceRoot = options.rootDirectory || rootDirectory;
  const publicDirectory = options.publicDirectory || join(sourceRoot, "public");
  const distDirectory = options.distDirectory || join(sourceRoot, "dist");
  const content = assertValidContent(options.content || siteContent);
  let template;
  try {
    template = await readFile(join(distDirectory, "index.html"), "utf8");
  } catch {
    throw new Error(
      "Cannot generate route pages: dist/index.html is missing. Run vite build first.",
    );
  }
  for (const asset of REQUIRED_PUBLIC_ASSETS) {
    try {
      const information = await stat(join(publicDirectory, asset));
      if (!information.isFile() || !information.size)
        throw new Error("empty asset");
    } catch {
      throw new Error(
        `Cannot package portfolio: required public asset is missing or empty: public/${asset}. Create the asset before building.`,
      );
    }
  }
  // Render everything before writing so bad metadata cannot leave partial routes.
  const documents = getRoutes(content).map((route) => ({
    route,
    html: renderRouteHtml(template, route, content),
  }));
  const notFound = renderRouteHtml(template, "/404.html", content);
  for (const asset of REQUIRED_PUBLIC_ASSETS)
    await copyFile(join(publicDirectory, asset), join(distDirectory, asset));
  for (const document of documents) {
    const destination =
      document.route === "/"
        ? join(distDirectory, "index.html")
        : join(distDirectory, document.route.slice(1), "index.html");
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, document.html, "utf8");
  }
  await writeFile(join(distDirectory, "404.html"), notFound, "utf8");
  await writeFile(
    join(distDirectory, "sitemap.xml"),
    renderSitemap(content),
    "utf8",
  );
  return {
    routes: documents.length,
    assets: REQUIRED_PUBLIC_ASSETS.length,
    distDirectory,
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  generatePages()
    .then(({ routes, assets }) =>
      console.log(
        `Packaged ${routes} route documents, 404.html, ${assets} required assets, and sitemap.xml.`,
      ),
    )
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}

export default generatePages;
