import React from "react";
import { EvidenceLabel, Icon, Link, SectionHeading } from "./ui";

export default function AtelierAbout() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-layout">
        <div>
          <p className="eyebrow">03 / THE PERSON BEHIND THE WORK</p>
          <h2>
            A builder’s mindset.
            <br />
            <span className="serif-word">A learner’s curiosity.</span>
          </h2>
          <div className="about-location mono">
            <Icon name="globe" size={17} /> BASED IN BANGLADESH
          </div>
        </div>
        <div className="about-copy">
          <p className="about-lead">
            I’m Limon, a Computer Science and Engineering undergraduate who
            likes turning a good question into something you can use.
          </p>
          <p>
            My work sits between full-stack software development and a growing
            curiosity about artificial intelligence, machine learning, and
            emerging technologies. Building gives me a way to test ideas.
            Studying helps me ask better questions.
          </p>
          <p>
            I’m interested in how systems behave beyond the happy path: how
            people use them, where assumptions break down, and what makes an
            engineering decision defensible.
          </p>
          <div className="academic-note">
            <Icon name="layers" size={21} />
            <div>
              <h3>Computer Science &amp; Engineering</h3>
              <p>Undergraduate · academic identity provided by the owner</p>
              <EvidenceLabel status="self-reported" />
            </div>
          </div>
          <Link href="/lab" className="text-link">
            Follow my research interests <Icon size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
