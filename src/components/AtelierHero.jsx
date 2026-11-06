import React, { useRef } from "react";
import { Button, Icon, Link } from "./ui";
import { profile } from "../content/profile";

export default function AtelierHero() {
  const gridRef = useRef(null);
  function moveGrid(event) {
    if (
      !window.matchMedia(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    gridRef.current?.style.setProperty(
      "--grid-x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    gridRef.current?.style.setProperty(
      "--grid-y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  }
  return (
    <section
      id="home"
      className="atelier-hero container"
      onPointerMove={moveGrid}
    >
      <div className="hero-topline mono">
        <span>
          <span className="status-dot" /> A WORK IN CURIOSITY
        </span>
        <span>BANGLADESH · PERSONAL PORTFOLIO</span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">HELLO, I’M</p>
          <h1 aria-label={profile.name}>
            Limon Roy
            <br />
            <span>Apu</span>
            <span className="name-period">.</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-description">{profile.supportingCopy}</p>
          <div className="hero-buttons">
            <Button href="/#projects">
              Explore My Work <Icon name="arrow-right" size={18} />
            </Button>
            <Link href="/lab" className="text-link">
              Research Interests <Icon size={17} />
            </Link>
          </div>
          <div className="hero-socials">
            <Link href="https://github.com/limon-l">
              <Icon name="github" size={16} /> GitHub <Icon size={12} />
            </Link>
            <Link href="https://www.linkedin.com/in/limonroyapu/">
              <Icon name="linkedin" size={16} /> LinkedIn <Icon size={12} />
            </Link>
            <Link href="mailto:limonroyapu101@gmail.com">
              <Icon name="mail" size={16} /> Email <Icon size={12} />
            </Link>
          </div>
        </div>
        <div className="hero-art" ref={gridRef}>
          <div className="technical-grid" aria-hidden="true" />
          <span className="portrait-coordinate mono" aria-hidden="true">
            FIG. 01 — THE BUILDER
          </span>
          <div className="portrait-frame">
            <img
              src="/hero.jpeg"
              alt="Limon Roy Apu"
              width="688"
              height="776"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <span className="portrait-side mono" aria-hidden="true">
            OBSERVE. QUESTION. BUILD. REPEAT.
          </span>
          <div className="portrait-note">
            <span className="note-icon">
              <Icon name="spark" size={22} />
            </span>
            <div>
              <span className="mono">CURRENT DIRECTION</span>
              <p>
                From working software
                <br />
                to better questions.
              </p>
            </div>
            <Link
              href="/lab"
              className="icon-button"
              aria-label="Explore current research interests"
            >
              <Icon />
            </Link>
          </div>
          <span className="portrait-corner" aria-hidden="true">
            +
          </span>
        </div>
      </div>
      <div className="hero-bottom mono">
        <span>THINK DEEPLY. BUILD THOUGHTFULLY.</span>
        <Link href="/#projects">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
