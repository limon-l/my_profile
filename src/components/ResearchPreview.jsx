import React from "react";
import { researchInterests } from "../content/research";
import { EvidenceLabel, Icon, Link, SectionHeading } from "./ui";

export default function ResearchPreview() {
  return (
    <section id="research" className="section research-preview">
      <div className="container">
        <SectionHeading
          eyebrow="02 / THE OPEN NOTEBOOK"
          title={
            <>
              Good work starts with
              <br />a better question<span className="accent">.</span>
            </>
          }
          description="An evolving space for AI, software systems, and the human side of technology. These are learning directions, with room to investigate."
        >
          <Link href="/lab" className="text-link">
            Enter the Lab <Icon size={17} />
          </Link>
        </SectionHeading>
        <div className="research-preview-grid">
          {researchInterests.slice(0, 3).map((interest, index) => (
            <article className="research-preview-card" key={interest.id}>
              <div className="research-card-top">
                <span className="mono">
                  QUESTION / {String(index + 1).padStart(2, "0")}
                </span>
                <EvidenceLabel status="interest" />
              </div>
              <h3>{interest.topic}</h3>
              <p>{interest.question}</p>
              <Link href={`/lab#interest-${interest.id}`} className="text-link">
                Explore this question <Icon size={16} />
              </Link>
            </article>
          ))}
        </div>
        <div className="lab-note">
          <span className="status-dot" />
          <p>
            Curiosity in progress. Research interests are presented separately
            from completed experiments and publications.
          </p>
          <span className="mono">THE LAB IS OPEN ↗</span>
        </div>
      </div>
    </section>
  );
}
