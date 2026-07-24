import React, { useEffect } from "react";

export default function ProjectModal({ modalOpen, modalData, closeModal }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen, closeModal]);

  if (!modalData) return null;

  return (
    <div
      className={`modal-overlay ${modalOpen ? "active" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={modalData.title}>
      <div className="modal-content">
        {/* Close */}
        <button
          onClick={closeModal}
          className="sticky top-4 float-right mr-4 z-10 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-textGray hover:text-white hover:border-accent/30 transition-all"
          aria-label="Close modal">
          <i className="fas fa-times text-sm"></i>
        </button>

        {/* Image */}
        <div className="h-56 md:h-64 overflow-hidden relative">
          <img
            src={modalData.img}
            alt={modalData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="p-8">
          {/* Title + Desc */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
            {modalData.title}
          </h2>
          <p className="text-textGray text-sm leading-relaxed mb-6">
            {modalData.desc}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h4 className="text-xs uppercase tracking-[0.15em] text-textGray font-semibold mb-3">
              Tech Stack
            </h4>
            <div className="flex gap-2 flex-wrap">
              {modalData.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-accent font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-xs uppercase tracking-[0.15em] text-textGray font-semibold mb-3">
              Key Features
            </h4>
            <ul className="space-y-2.5">
              {modalData.details.map((detail, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-textGray">
                  <span className="w-5 h-5 rounded-md bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fas fa-check text-accent text-[0.6rem]"></i>
                  </span>
                  <span className="leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={modalData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center !text-sm">
              <i className="fab fa-github"></i>
              View Code
            </a>
            <a
              href={modalData.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 justify-center !text-sm">
              <i className="fas fa-external-link-alt"></i>
              Live Demo
            </a>
            <button
              onClick={closeModal}
              className="btn-secondary flex-1 justify-center !text-sm !border-white/10 !text-textGray hover:!text-white hover:!border-white/20">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
