import React, { useState } from "react";
import { projects } from "../content/projects";
import ProjectVisual from "../components/ProjectVisual";
import { Button, EvidenceLabel, Icon, Link } from "../components/ui";

function ArchitectureExplorer({ nodes = [] }) {
  const [selected, setSelected] = useState(0);
  if (!nodes.length) return null;
  return (
    <div className="architecture-explorer">
      <p className="eyebrow">SOURCE-BASED COMPONENT EXPLORER</p>
      <div
        className="architecture-nodes"
        role="group"
        aria-label="Architecture components"
      >
        {nodes.map((node, index) => (
          <React.Fragment key={node.id || node.label}>
            <button
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              <span className="mono">0{index + 1}</span>
              {node.label}
            </button>
            {index < nodes.length - 1 && (
              <span className="architecture-arrow" aria-hidden="true">
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="architecture-description" role="status">
        {nodes[selected]?.description}
      </p>
      <details>
        <summary>Read all component descriptions</summary>
        <dl>
          {nodes.map((node) => (
            <React.Fragment key={node.id || node.label}>
              <dt>{node.label}</dt>
              <dd>{node.description}</dd>
            </React.Fragment>
          ))}
        </dl>
      </details>
      <p className="section-footnote">
        Components are arranged for exploration. Their order does not imply a
        complete request sequence.
      </p>
    </div>
  );
}
export default function CaseStudyPage({ slug }) {
  const project = projects.find((item) => item.slug === slug);
  if (!project)
    return (
      <div className="container not-found">
        <p className="eyebrow">404 / PROJECT NOT FOUND</p>
        <h1>
          That page isn’t in
          <br />
          the notebook.
        </h1>
        <Button href="/#projects">
          Explore selected work <Icon name="arrow-right" />
        </Button>
      </div>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="case-study">
      <div className="container page-header">
        <Link href="/#projects" className="back-link">
          <Icon name="arrow-left" size={16} /> Selected work
        </Link>
        <p className="eyebrow">ENGINEERING CASE STUDY / {project.category}</p>
        <h1>
          {project.title}
          <span className="accent">.</span>
        </h1>
        <p className="page-description">{project.summary}</p>
        <div className="case-meta">
          <EvidenceLabel status="verified" />
          <span className="mono">REVIEWED 5 NOVEMBER 2026</span>
          <span className="mono">SOURCE REVIEW / RUNTIME UNVERIFIED</span>
        </div>
        <div className="case-buttons">
          <Button href={project.sourceUrl}>
            <Icon name="github" size={18} /> View source <Icon size={16} />
          </Button>
          {project.demoUrl && (
            <Button href={project.demoUrl} variant="secondary">
              {project.demoLabel || "Open demo"} <Icon size={16} />
            </Button>
          )}
        </div>
        <p className="section-footnote">
          External destinations open in a new tab. A responding demo does not
          establish that every feature works.
        </p>
      </div>
      <div className="container case-cover">
        <ProjectVisual project={project} large />
      </div>
      <div className="container case-layout">
        <nav className="case-toc" aria-label="Case study contents">
          <span className="eyebrow">IN THIS CASE STUDY</span>
          {project.sections.map((section, index) => (
            <a href={`#section-${index + 1}`} key={section.title}>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              {section.title.replace(/^\d+[./\s]+/, "")}
            </a>
          ))}
        </nav>
        <div className="case-body">
          <div className="case-evidence-note">
            <EvidenceLabel status="verified">
              What the evidence establishes
            </EvidenceLabel>
            <p>
              This is an independent review of public repository source.
              Repository ownership does not establish sole authorship. Runtime
              behavior, deployment security, and outcomes require separate
              validation.
            </p>
          </div>
          {project.sections.map((section, index) => (
            <section
              id={`section-${index + 1}`}
              className="case-section"
              key={section.title}
            >
              <p className="eyebrow">
                {String(index + 1).padStart(2, "0")} / THE DETAILS
              </p>
              <h2>{section.title.replace(/^\d+[./\s]+/, "")}</h2>
              {Array.isArray(section.body) ? (
                section.body.map((text, i) => <p key={i}>{text}</p>)
              ) : (
                <p>{section.body}</p>
              )}
              {section.items?.length > 0 && (
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>
                      {typeof item === "string"
                        ? item
                        : item.text || item.label}
                    </li>
                  ))}
                </ul>
              )}
              {/architecture/i.test(section.title) && (
                <ArchitectureExplorer nodes={project.architecture} />
              )}
              {/technical stack/i.test(section.title) && (
                <div className="stack-list">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}
            </section>
          ))}
          <section className="case-section">
            <p className="eyebrow">AUDIT TRAIL</p>
            <h2>Read the evidence.</h2>
            <ul className="evidence-sources">
              {project.sources?.map((source, index) => (
                <li key={source.url || index}>
                  <Link href={source.url}>
                    {source.label || source.path} <Icon size={14} />
                  </Link>
                  {source.note && <p>{source.note}</p>}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <div className="container next-project">
        <p className="eyebrow">CONTINUE EXPLORING</p>
        <Link href={`/work/${next.slug}`}>
          {next.title}
          <Icon name="arrow-right" size={36} />
        </Link>
      </div>
    </article>
  );
}
