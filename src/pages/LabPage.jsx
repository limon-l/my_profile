import { useState } from "react";
import { Link, SectionHeading, EvidenceLabel, Icon } from "../components/ui";
import { researchInterests } from "../content/research";

export default function LabPage() {
  const [selectedId, setSelectedId] = useState(researchInterests[0].id);
  const selected = researchInterests.find(
    (interest) => interest.id === selectedId,
  );

  return (
    <div className="lab-page">
      <header className="page-header container">
        <p className="eyebrow">The research notebook</p>
        <h1>
          Good work begins with
          <br />
          <span className="serif-word">a better question.</span>
        </h1>
        <p className="page-description">
          Exploring the space between building software and understanding why it
          works. An open map of interests, questions, and possible learning
          directions.
        </p>
        <div className="lab-intro">
          <EvidenceLabel status="interest" />
          <p>
            These topics describe what I want to study. Supporting work will be
            linked as it becomes available.
          </p>
        </div>
      </header>

      <section
        className="section container"
        aria-label="Research Question Atlas"
      >
        <SectionHeading
          eyebrow="01 / Question atlas"
          title="Follow a thread of curiosity."
          description="Choose a topic to focus on its question. Every topic and learning direction is also available in the notebook below."
        />
        <div className="research-atlas">
          <div
            className="atlas-topics"
            role="group"
            aria-label="Research topics"
          >
            {researchInterests.map((interest, index) => (
              <button
                key={interest.id}
                type="button"
                className={`atlas-topic${selectedId === interest.id ? " is-active" : ""}`}
                aria-pressed={selectedId === interest.id}
                aria-controls="atlas-detail"
                onClick={() => setSelectedId(interest.id)}
              >
                <span className="atlas-topic-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span>{interest.shortLabel}</span>
                <Icon name="arrow-up-right" />
              </button>
            ))}
          </div>
          <div
            className="atlas-detail"
            id="atlas-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="atlas-detail-kicker">
              <span className="eyebrow">An open question</span>
              <EvidenceLabel status={selected.status} />
            </div>
            <h2>{selected.topic}</h2>
            <p className="atlas-question">{selected.question}</p>
            <div className="atlas-next-step">
              <span className="eyebrow">A direction to explore</span>
              <p>{selected.direction}</p>
            </div>
            <a className="inline-link" href={`#interest-${selected.id}`}>
              Read the full note <Icon name="arrow-up-right" />
            </a>
          </div>
        </div>
      </section>

      <section
        className="section container"
        aria-label="Research interest notebook"
      >
        <SectionHeading
          eyebrow="02 / The open notebook"
          title="Interests with a next step."
          description="A starting point for learning, discussion, and future work. Each question is deliberately open."
        />
        <div className="research-grid">
          {researchInterests.map((interest, index) => (
            <article
              className="interest-card"
              id={`interest-${interest.id}`}
              key={interest.id}
            >
              <div className="interest-card-topline">
                <span className="interest-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <EvidenceLabel status={interest.status} />
              </div>
              <h3>{interest.topic}</h3>
              <p>{interest.motivation}</p>
              <blockquote>{interest.question}</blockquote>
              <div className="interest-direction">
                <span className="eyebrow">Learning direction</span>
                <p>{interest.direction}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section container lab-principles"
        aria-label="Approach to learning"
      >
        <div>
          <p className="eyebrow">A working principle</p>
          <h2>
            Make the question clear.
            <br />
            Make the evidence inspectable.
          </h2>
        </div>
        <div>
          <p>
            My software projects are the practical side of this curiosity.
            Source code, implementation boundaries, and known limitations give
            each discussion a concrete starting point.
          </p>
          <Link className="inline-link" href="/#projects">
            Explore the engineering work <Icon name="arrow-up-right" />
          </Link>
        </div>
      </section>
    </div>
  );
}
