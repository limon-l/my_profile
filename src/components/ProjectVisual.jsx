import React from "react";
import { Icon } from "./ui";

export default function ProjectVisual({ project, large = false }) {
  const kind = /ponnaloy/i.test(project.slug)
    ? "commerce"
    : /wanderlust|travel/i.test(project.slug)
      ? "travel"
      : /blood/i.test(project.slug)
        ? "community"
        : /metro/i.test(project.slug)
          ? "mentorship"
          : "books";
  return (
    <div
      className={`project-visual visual-${kind} ${large ? "visual-large" : ""}`}
      aria-label={`Illustrative concept for ${project.title}; not an application screenshot`}
      role="img"
    >
      <div className="visual-grid" />
      <div className="visual-window">
        <div className="window-top">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="mono">
            {project.title.toLowerCase()} /{" "}
            {kind === "commerce"
              ? "storefront"
              : kind === "travel"
                ? "explore"
                : kind === "mentorship"
                  ? "connect"
                  : kind === "community"
                    ? "donor network"
                    : "library"}
          </span>
          <Icon name="layers" size={12} />
        </div>
        {kind === "commerce" ? (
          <div className="commerce-demo">
            <div className="demo-sidebar">
              <b>
                P<span>.</span>
              </b>
              <span />
              <span />
              <span />
              <span />
              <small>COLLECTION 01</small>
            </div>
            <div className="demo-main">
              <span className="demo-overline">DESIGNED FOR THE EVERYDAY</span>
              <strong>
                Considered objects.
                <br />
                Extraordinary living.
              </strong>
              <div className="product-objects">
                <div className="object-card">
                  <span className="object-lamp">
                    <i />
                  </span>
                  <small>01 / LIGHTING</small>
                </div>
                <div className="object-card">
                  <span className="object-vase" />
                  <small>02 / OBJECTS</small>
                </div>
                <div className="object-card">
                  <span className="object-chair">
                    <i />
                  </span>
                  <small>03 / FURNITURE</small>
                </div>
              </div>
              <div className="demo-bottom">
                <span>EXPLORE THE COLLECTION</span>
                <Icon name="arrow-right" size={13} />
              </div>
            </div>
          </div>
        ) : kind === "travel" ? (
          <div className="travel-demo">
            <span className="demo-overline">
              WANDERLUST / FIND YOUR NEXT CHAPTER
            </span>
            <strong>
              The world is
              <br />
              worth exploring.
            </strong>
            <div className="mountain mountain-one" />
            <div className="mountain mountain-two" />
            <div className="travel-search">
              <span>Where to next?</span>
              <Icon name="arrow-right" size={15} />
            </div>
          </div>
        ) : kind === "community" ? (
          <div className="community-demo">
            <div className="network-lines" />
            <span className="network-node node-one" />
            <span className="network-node node-two" />
            <span className="network-node node-three" />
            <span className="blood-drop">+</span>
            <strong>
              A connection
              <br />
              that matters.
            </strong>
            <span className="demo-overline">BD BLOOD FINDER / COMMUNITY</span>
          </div>
        ) : kind === "mentorship" ? (
          <div className="mentorship-demo">
            <span className="demo-overline">
              METROBRIDGE / LEARNING, CONNECTED
            </span>
            <strong>
              Good questions.
              <br />
              Shared possibilities.
            </strong>
            <div className="mentor-cards">
              <span>
                <i>01</i> Find a mentor
              </span>
              <span>
                <i>02</i> Start a conversation
              </span>
              <span>
                <i>03</i> Explore ideas
              </span>
            </div>
          </div>
        ) : (
          <div className="books-demo">
            <span className="demo-overline">BOOKCOURIER / YOUR NEXT READ</span>
            <strong>
              A library.
              <br />A little closer.
            </strong>
            <div className="book-spines">
              <span>THE ART OF LEARNING</span>
              <span>BETWEEN THE LINES</span>
              <span>A NEW CHAPTER</span>
              <span>DISCOVERY</span>
            </div>
          </div>
        )}
      </div>
      <span className="visual-caption mono">ILLUSTRATIVE INTERFACE STUDY</span>
      <span className="visual-cross" aria-hidden="true">
        +
      </span>
    </div>
  );
}
