import React, { useEffect, useState } from "react";

export default function ProjectModal({ modalOpen, modalData, closeModal }) {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [architectureExpanded, setArchitectureExpanded] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") setActiveGalleryIdx(prev => {
        if (!modalData?.gallery) return prev;
        return (prev + 1) % modalData.gallery.length;
      });
      if (e.key === "ArrowLeft") setActiveGalleryIdx(prev => {
        if (!modalData?.gallery) return prev;
        return (prev - 1 + modalData.gallery.length) % modalData.gallery.length;
      });
    };
    if (modalOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeModal, modalData]);

  useEffect(() => {
    setActiveGalleryIdx(0);
    setArchitectureExpanded(false);
  }, [modalData]);

  if (!modalData) return null;

  return (
    <div
      className={`modal-overlay ${modalOpen ? "active" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
      role="dialog"
      aria-modal="true"
      aria-label={modalData.title}>
      <div className="modal">
        {/* Close button */}
        <button onClick={closeModal} className="modal-close" aria-label="Close modal">
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Gallery */}
        {modalData.gallery && modalData.gallery.length > 0 && (
          <div className="modal-header">
            <img
              src={modalData.gallery[activeGalleryIdx]}
              alt={`${modalData.title} screenshot ${activeGalleryIdx + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="modal-header-overlay" />

            {modalData.gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveGalleryIdx(prev => (prev - 1 + modalData.gallery.length) % modalData.gallery.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)] transition-all z-10"
                  aria-label="Previous image">
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveGalleryIdx(prev => (prev + 1) % modalData.gallery.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)] flex items-center justify-center text-white hover:border-[var(--accent)] transition-all z-10"
                  aria-label="Next image">
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {modalData.gallery.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveGalleryIdx(i); }}
                      className={`rounded-full transition-all ${i === activeGalleryIdx ? "w-5 h-1.5 bg-[var(--accent)]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
                      aria-label={`Go to image ${i + 1}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <div className="modal-body">
          <h2 className="modal-title">{modalData.title}</h2>
          <p className="modal-description">{modalData.desc}</p>

          {/* Meta badges */}
          {modalData.timeline && (
            <div className="modal-meta">
              <span className="modal-meta-badge">
                <i className="fas fa-clock text-[var(--accent)] opacity-50"></i>
                {modalData.timeline}
              </span>
              {modalData.category && (
                <span className="modal-meta-badge !bg-[var(--accent-soft)] !border-[var(--border-accent)] !text-[var(--accent)]">
                  <i className="fas fa-tag"></i>
                  {modalData.category}
                </span>
              )}
              {modalData.highlights && (
                <>
                  <span className="modal-meta-badge">
                    <i className="fas fa-star text-amber-400 opacity-60"></i>
                    {modalData.highlights.stars} Stars
                  </span>
                  <span className="modal-meta-badge">
                    <i className="fas fa-code-branch text-[var(--accent)] opacity-50"></i>
                    {modalData.highlights.forks} Forks
                  </span>
                </>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="modal-section-title">Tech Stack</h4>
            <div className="modal-tech-stack">
              {modalData.stack.map((t) => (
                <span key={t} className="modal-tech-item">{t}</span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          {modalData.architecture && (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h4 className="modal-section-title !mb-0">Architecture</h4>
                {Object.keys(modalData.architecture).length > 4 && (
                  <button
                    type="button"
                    className="modal-architecture-toggle"
                    onClick={() => setArchitectureExpanded((expanded) => !expanded)}
                    aria-expanded={architectureExpanded}>
                    {architectureExpanded ? "Show less" : `Show all ${Object.keys(modalData.architecture).length}`}
                    <i className={`fas fa-chevron-${architectureExpanded ? "up" : "down"}`} aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(modalData.architecture)
                  .slice(0, architectureExpanded ? undefined : 4)
                  .map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--surface-1)] border border-[var(--border-subtle)]">
                    <i className="fas fa-cube text-[var(--accent)] opacity-40 text-xs"></i>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{key}</span>
                      <p className="text-white text-xs font-medium">{val}</p>
                    </div>
                  </div>
                  ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mb-8">
            <h4 className="modal-section-title">Key Features</h4>
            <ul className="modal-features">
              {modalData.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            {modalData.links?.github && (
              <a href={modalData.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 justify-center !text-sm">
                <i className="fab fa-github"></i>
                View Code
              </a>
            )}
            {modalData.links?.live && (
              <a href={modalData.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-secondary flex-1 justify-center !text-sm">
                <i className="fas fa-external-link-alt"></i>
                Live Demo
              </a>
            )}
            <button onClick={closeModal} className="btn btn-ghost flex-1 justify-center !text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
