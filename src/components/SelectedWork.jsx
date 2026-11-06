import React, { useState } from 'react';
import { projects } from '../content/projects';
import { EvidenceLabel, Icon, Link, SectionHeading } from './ui';
import ProjectVisual from './ProjectVisual';

const filters = ['All work', 'Full-stack', 'Frontend', 'Community'];
export function matchesProject(project, filter) {
  if (filter === 'All work') return true;
  const text = `${project.category} ${project.slug}`.toLowerCase();
  if (filter === 'Community') return /blood|community/.test(text);
  if (filter === 'Frontend') return /frontend|metro/.test(text);
  return !/blood|community|frontend|metro/.test(text);
}
export default function SelectedWork() {
  const [filter, setFilter] = useState('All work');
  const filtered = projects.filter(project => matchesProject(project, filter));
  return <section id="projects" className="section work-section"><div className="container">
    <SectionHeading eyebrow="01 / SELECTED ENGINEERING" title={<>Ideas, made tangible<span className="accent">.</span></>} description="A closer look at the systems I build, the choices inside them, and the evidence behind the work."><Link href="https://github.com/limon-l?tab=repositories" className="text-link">All repositories <Icon size={16} /></Link></SectionHeading>
    <div className="work-toolbar"><div className="filter-controls" role="group" aria-label="Filter projects">{filters.map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div><span className="mono result-count" role="status">{String(filtered.length).padStart(2, '0')} PROJECTS / SOURCE REVIEWED</span></div>
    <div className="project-gallery">{filtered.map((project, index) => <article key={project.slug} className={`project-card ${index === 0 && filter === 'All work' ? 'flagship-project' : ''}`}>
      <Link href={`/work/${project.slug}`} className="project-art-link" aria-label={`Read the ${project.title} case study`}><ProjectVisual project={project} large={index === 0 && filter === 'All work'} /></Link><div className="project-copy"><div className="project-kicker"><span className="mono">{String(projects.indexOf(project) + 1).padStart(2, '0')} / {project.category}</span><EvidenceLabel status="verified" /></div><h3><Link href={`/work/${project.slug}`}>{project.title}<Icon name="arrow-up-right" size={23} /></Link></h3><p>{project.summary}</p><div className="stack-list">{project.stack.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div><p className="project-insight"><Icon name="code" size={17} /><span>{project.insight}</span></p><div className="project-links"><Link href={`/work/${project.slug}`} className="text-link">Read case study <Icon name="arrow-right" size={16} /></Link><Link href={project.sourceUrl} className="project-source"><Icon name="github" size={16} /> Source <Icon size={12} /></Link></div></div>
    </article>)}</div><p className="work-footnote"><span className="status-dot" /> Source reviewed on 5 November 2026. Code evidence is distinct from production validation. Each case study records its limits.</p>
  </div></section>;
}
