import { access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import projectContent, {
  projects as namedProjects,
  EVIDENCE_STATUS,
} from "../src/content/projects.js";
import { profile, technologies } from "../src/content/profile.js";
import { researchInterests } from "../src/content/research.js";
import { journalEntries } from "../src/content/journal.js";

export const siteContent = {
  projects: projectContent,
  profile,
  technologies,
  researchInterests,
  journalEntries,
};
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const statuses = new Set(Object.values(EVIDENCE_STATUS));
const identifier = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const text = (value) => typeof value === "string" && value.trim().length > 0;
const validDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;

function validUrl(value) {
  if (!text(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

/** Returns useful content errors without filesystem access or mutation. */
export function validateContent(content = siteContent) {
  const errors = [];
  const fail = (message) => errors.push(message);
  const requireText = (object, fields, context) => {
    for (const field of fields)
      if (!text(object?.[field])) fail(`${context}: missing ${field}.`);
  };
  const unique = (values, context) => {
    if (new Set(values).size !== values.length)
      fail(`${context}: duplicate values.`);
  };
  const list = (value, context) => {
    if (!Array.isArray(value) || !value.length) {
      fail(`${context}: must be a nonempty array.`);
      return [];
    }
    return value;
  };
  const projects = list(content.projects, "Projects");
  const projectIds = new Set([
    "atelier",
    ...projects.map((project) => project.id),
  ]);
  unique(
    projects.map((project) => project.id),
    "Project IDs",
  );
  unique(
    projects.map((project) => project.slug),
    "Project slugs",
  );

  for (const project of projects) {
    const context = `Project ${project.id || "(unnamed)"}`;
    requireText(
      project,
      [
        "id",
        "slug",
        "title",
        "category",
        "summary",
        "insight",
        "contribution",
        "evidenceLabel",
        "demoCheck",
      ],
      context,
    );
    if (
      !identifier.test(project.id || "") ||
      !identifier.test(project.slug || "")
    )
      fail(`${context}: invalid id or slug.`);
    if (!statuses.has(project.evidenceStatus))
      fail(`${context}: unknown or missing evidence status.`);
    if (!validDate(project.verifiedAt))
      fail(`${context}: invalid or missing review date.`);
    if (
      !validUrl(project.sourceUrl) ||
      new URL(project.sourceUrl).hostname !== "github.com"
    )
      fail(`${context}: source URL must be a public HTTPS GitHub URL.`);
    if (!Object.hasOwn(project, "demoUrl"))
      fail(`${context}: demoUrl must explicitly be a checked URL or null.`);
    if (project.demoUrl !== null && !validUrl(project.demoUrl))
      fail(`${context}: unsafe or invalid demo URL.`);
    if (!/^[a-f0-9]{40}$/.test(project.revision || ""))
      fail(`${context}: missing full source revision.`);
    const stack = list(project.stack, `${context} stack`);
    if (stack.some((item) => !text(item)))
      fail(`${context}: stack entries must be nonempty strings.`);
    unique(stack, `${context} stack`);
    const sections = list(project.sections, `${context} sections`);
    if (sections.length !== 13)
      fail(`${context}: case study must have all 13 sections.`);
    unique(
      sections.map((section) => section.title),
      `${context} section titles`,
    );
    for (const section of sections) {
      requireText(section, ["title"], `${context} section`);
      if (
        !text(section.body) &&
        !(
          Array.isArray(section.body) &&
          section.body.length &&
          section.body.every(text)
        )
      )
        fail(`${context}: empty section body.`);
      if (
        section.items &&
        (!Array.isArray(section.items) ||
          section.items.some((item) => !text(item)))
      )
        fail(`${context}: section items must be text.`);
    }
    const architecture = list(project.architecture, `${context} architecture`);
    if (architecture.length !== 4)
      fail(`${context}: expected four reviewed architecture components.`);
    unique(
      architecture.map((node) => node.id),
      `${context} architecture IDs`,
    );
    for (const node of architecture)
      requireText(
        node,
        ["id", "label", "description"],
        `${context} architecture`,
      );
    const limitations = list(project.limitations, `${context} limitations`);
    if (limitations.some((item) => !text(item)))
      fail(`${context}: limitations must be text.`);
    const sources = list(project.sources, `${context} sources`);
    unique(
      sources.map((source) => source.url),
      `${context} source URLs`,
    );
    for (const source of sources) {
      requireText(source, ["label", "path", "note"], `${context} source`);
      if (!validUrl(source.url))
        fail(`${context}: missing or unsafe evidence URL.`);
      if (
        project.evidenceStatus === EVIDENCE_STATUS.VERIFIED &&
        source.url !==
          `${project.sourceUrl}/blob/${project.revision}/${source.path}`
      )
        fail(
          `${context}: verified source must be pinned to its reviewed revision and path.`,
        );
    }
  }

  requireText(
    content.profile,
    ["name", "headline", "supportingCopy", "email", "location", "portrait"],
    "Profile",
  );
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content.profile?.email || ""))
    fail("Profile: invalid email address.");
  if (!content.profile?.portrait?.startsWith("/"))
    fail("Profile: portrait must reference a local asset.");
  if (!statuses.has(content.profile?.education?.status?.toUpperCase()))
    fail("Profile: education requires an explicit evidence status.");
  for (const social of list(content.profile?.socials, "Profile social links")) {
    requireText(social, ["label", "href"], "Social link");
    if (
      !validUrl(social.href) &&
      social.href !== `mailto:${content.profile?.email}`
    )
      fail(`Social link ${social.label}: unsafe URL.`);
  }

  const technologies = list(content.technologies, "Technologies");
  unique(
    technologies.map((technology) => technology.name),
    "Technology names",
  );
  for (const technology of technologies) {
    const context = `Technology ${technology.name || "(unnamed)"}`;
    requireText(technology, ["name", "group", "description"], context);
    if (!statuses.has(technology.status?.toUpperCase()))
      fail(`${context}: unknown evidence status.`);
    if (!Array.isArray(technology.projectIds)) {
      fail(`${context}: projectIds must be an array.`);
      continue;
    }
    unique(technology.projectIds, `${context} project references`);
    for (const id of technology.projectIds)
      if (!projectIds.has(id))
        fail(`${context}: unknown project reference ${id}.`);
    if (technology.status === "verified" && !technology.projectIds.length)
      fail(`${context}: verified usage needs a project reference.`);
    if (technology.status !== "verified" && technology.projectIds.length)
      fail(`${context}: project-backed usage must be classified as verified.`);
  }

  const interests = list(content.researchInterests, "Research interests");
  unique(
    interests.map((interest) => interest.id),
    "Research IDs",
  );
  for (const interest of interests) {
    requireText(
      interest,
      ["id", "topic", "question", "motivation", "direction"],
      "Research interest",
    );
    if (!identifier.test(interest.id || ""))
      fail("Research interest: invalid id.");
    if (interest.status !== "interest")
      fail(
        `Research ${interest.id}: an open question must remain classified as interest.`,
      );
  }

  const entries = list(content.journalEntries, "Journal entries");
  unique(
    entries.map((entry) => entry.id),
    "Journal IDs",
  );
  for (const entry of entries) {
    const context = `Journal ${entry.id || "(unnamed)"}`;
    requireText(
      entry,
      [
        "id",
        "title",
        "topic",
        "context",
        "problem",
        "approach",
        "reasoning",
        "tradeoffs",
        "questions",
      ],
      context,
    );
    if (!identifier.test(entry.id || "")) fail(`${context}: invalid id.`);
    if (!validDate(entry.date)) fail(`${context}: invalid date.`);
    if (
      list(entry.alternatives, `${context} alternatives`).some(
        (item) => !text(item),
      )
    )
      fail(`${context}: alternatives must be text.`);
    for (const path of list(entry.evidence, `${context} evidence`)) {
      if (
        !text(path) ||
        path.startsWith("/") ||
        /^[a-z]:/i.test(path) ||
        path.split(/[\\/]/).includes("..")
      )
        fail(`${context}: evidence must use repository-relative paths.`);
    }
  }
  return errors;
}

export function assertValidContent(content = siteContent) {
  const errors = validateContent(content);
  if (errors.length)
    throw new Error(
      `Content validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`,
    );
  return content;
}

async function main() {
  if (projectContent !== namedProjects)
    throw new Error(
      "Default and named project exports must reference the same manifest.",
    );
  assertValidContent();
  for (const entry of journalEntries) {
    for (const path of entry.evidence) {
      try {
        await access(resolve(rootDirectory, path));
      } catch {
        throw new Error(
          `Journal ${entry.id}: evidence file does not exist: ${path}`,
        );
      }
    }
  }
  console.log(
    `Content checks passed: ${projectContent.length} projects, ${technologies.length} technologies, ${researchInterests.length} research interests, ${journalEntries.length} journal entries.`,
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

export default validateContent;
