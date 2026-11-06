import React, { lazy, Suspense, useEffect, useState } from "react";
import AtelierNavigation from "./components/AtelierNavigation";
import AtelierHero from "./components/AtelierHero";
import SelectedWork from "./components/SelectedWork";
import ResearchPreview from "./components/ResearchPreview";
import AtelierAbout from "./components/AtelierAbout";
import TechnologyExplorer from "./components/TechnologyExplorer";
import AtelierContact from "./components/AtelierContact";
import AtelierFooter from "./components/AtelierFooter";
import { Icon, Link, Button } from "./components/ui";
import { projects } from "./content/projects";

const LabPage = lazy(() => import("./pages/LabPage"));
const JournalPage = lazy(() => import("./pages/JournalPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const origin = "https://my-profile-green-beta.vercel.app";

function HomePage() {
  const [lens, setLens] = useState("engineering");
  return (
    <>
      <AtelierHero />
      <div className="perspective-bar">
        <div className="container perspective-inner">
          <div className="perspective-caption">
            <Icon name="layers" size={17} />
            <span>One curious mind. Two perspectives.</span>
          </div>
          <div
            className="lens-control"
            role="group"
            aria-label="Choose a portfolio perspective"
          >
            <button
              aria-pressed={lens === "engineering"}
              onClick={() => setLens("engineering")}
            >
              <Icon name="code" size={15} /> Engineering
            </button>
            <button
              aria-pressed={lens === "research"}
              onClick={() => setLens("research")}
            >
              <Icon name="spark" size={15} /> Research
            </button>
          </div>
          <span className="mono perspective-hint" role="status">
            {lens === "engineering"
              ? "MADE TO WORK. BUILT TO LEARN."
              : "QUESTIONS FIRST. EVIDENCE ALWAYS."}
          </span>
        </div>
      </div>
      {lens === "engineering" ? (
        <>
          <SelectedWork />
          <ResearchPreview />
        </>
      ) : (
        <>
          <ResearchPreview />
          <SelectedWork />
        </>
      )}
      <AtelierAbout />
      <TechnologyExplorer />
      <section className="github-section">
        <div className="container github-inner">
          <div className="github-icon">
            <Icon name="github" size={29} />
          </div>
          <div>
            <p className="eyebrow">05 / THE WORK, IN THE OPEN</p>
            <h2>Follow the code. Form your own view.</h2>
            <p>
              Selected source, implementation notes, and the ongoing process of
              building.
            </p>
          </div>
          <Link href="https://github.com/limon-l" className="text-link">
            Explore GitHub <Icon size={18} />
          </Link>
        </div>
      </section>
      <section className="journal-preview container">
        <p className="eyebrow">FROM THE ENGINEERING JOURNAL</p>
        <Link href="/journal">
          <span>Why keep Vite? Why make evidence part of the content?</span>
          <span className="text-link">
            Read the decisions <Icon size={17} />
          </span>
        </Link>
      </section>
      <AtelierContact />
    </>
  );
}

function metadata(path) {
  const project = path.startsWith("/work/")
    ? projects.find((item) => item.slug === path.split("/")[2])
    : null;
  if (project)
    return {
      title: `${project.title} — Engineering Case Study | Limon Roy Apu`,
      description: project.summary,
    };
  if (path === "/lab")
    return {
      title: "Research Lab — Questions & Learning | Limon Roy Apu",
      description:
        "Explore Limon Roy Apu’s research interests in AI, machine learning, reproducible software, and human-centered computing. An honest notebook of open questions.",
    };
  if (path === "/journal")
    return {
      title: "Engineering Decision Journal | Limon Roy Apu",
      description:
        "Contemporary implementation notes from this portfolio redesign: architecture, evidence-based content, and purposeful interaction.",
    };
  if (path !== "/")
    return {
      title: "Page not found | Limon Roy Apu",
      description:
        "This page is not in the notebook. Explore Limon Roy Apu’s selected engineering work and research interests.",
    };
  return {
    title: "Limon Roy Apu — CSE Undergraduate & Research-Minded Developer",
    description:
      "Exploring artificial intelligence, machine learning, and emerging technologies while building practical full-stack software. Selected engineering work, research interests, and decisions.",
  };
}

export default function AtelierApp() {
  const [location, setLocation] = useState(
    () =>
      window.location.pathname.replace(/\/$/, "") + window.location.hash || "/",
  );
  const path = location.split("#")[0] || "/";
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );
  useEffect(() => {
    const navigate = () =>
      setLocation(
        window.location.pathname.replace(/\/$/, "") + window.location.hash ||
          "/",
      );
    window.addEventListener("popstate", navigate);
    window.addEventListener("hashchange", navigate);
    return () => {
      window.removeEventListener("popstate", navigate);
      window.removeEventListener("hashchange", navigate);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#10151b" : "#f4f3ee");
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Theme still works without storage. */
    }
  }, [theme]);
  useEffect(() => {
    const data = metadata(path);
    document.title = data.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", data.description);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${origin}${path === "/" ? "/" : path}`);
    for (const prefix of ["og", "twitter"]) {
      document
        .querySelector(
          `meta[${prefix === "og" ? "property" : "name"}="${prefix}:title"]`,
        )
        ?.setAttribute("content", data.title);
      document
        .querySelector(
          `meta[${prefix === "og" ? "property" : "name"}="${prefix}:description"]`,
        )
        ?.setAttribute("content", data.description);
    }
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `${origin}${path === "/" ? "/" : path}`);
    document
      .querySelector('meta[name="robots"]')
      ?.setAttribute(
        "content",
        path === "/" ||
          path === "/lab" ||
          path === "/journal" ||
          projects.some((project) => path === `/work/${project.slug}`)
          ? "index, follow"
          : "noindex, follow",
      );
  }, [path]);
  useEffect(() => {
    let target = location.includes("#") ? location.split("#")[1] : null;
    try {
      if (target) target = decodeURIComponent(target);
    } catch {
      /* Keep malformed fragments harmless. */
    }
    if (!target) {
      window.scrollTo(0, 0);
      document.getElementById("main-content")?.focus({ preventScroll: true });
      return;
    }
    let observer;
    const scroll = () => {
      const element = document.getElementById(target);
      if (!element) return false;
      element.scrollIntoView({ block: "start", behavior: "instant" });
      element.setAttribute("tabindex", "-1");
      element.focus({ preventScroll: true });
      observer?.disconnect();
      return true;
    };
    if (!scroll()) {
      observer = new MutationObserver(scroll);
      observer.observe(document.getElementById("main-content"), {
        childList: true,
        subtree: true,
      });
    }
    return () => observer?.disconnect();
  }, [location]);
  const known =
    path === "/" ||
    path === "/lab" ||
    path === "/journal" ||
    projects.some((project) => path === `/work/${project.slug}`);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <AtelierNavigation
        theme={theme}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        path={location}
      />
      <main id="main-content" tabIndex="-1">
        <Suspense
          fallback={
            <div className="container route-loading" role="status">
              Opening the notebook…
            </div>
          }
        >
          {path === "/" ? (
            <HomePage />
          ) : path === "/lab" ? (
            <LabPage />
          ) : path === "/journal" ? (
            <JournalPage />
          ) : path.startsWith("/work/") && known ? (
            <CaseStudyPage key={path} slug={path.split("/")[2]} />
          ) : (
            <div className="container not-found">
              <p className="eyebrow">404 / A PAGE TO BE WRITTEN</p>
              <h1>
                This page isn’t
                <br />
                in the notebook.
              </h1>
              <p>Try the selected work or return to the atelier.</p>
              <Button href="/">
                Back home <Icon name="arrow-right" />
              </Button>
            </div>
          )}
        </Suspense>
      </main>
      <AtelierFooter />
    </>
  );
}
