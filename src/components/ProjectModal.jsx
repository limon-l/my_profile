import React from "react";

export default function ProjectModal({ modalOpen, modalData, closeModal }) {
  if (!modalOpen || !modalData) return null;

  return (
    <div
      className={`modal fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm active`}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}>
      <div className="bg-gradient-to-b from-secondary to-primary w-full max-w-3xl rounded-xl shadow-2xl border border-accent/30 overflow-hidden relative max-h-[90vh] overflow-y-auto animate-scaleIn">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10 hover:rotate-90 transition-transform">
          <i className="fas fa-times"></i>
        </button>
        <div className="p-8">
          <img
            src={modalData.img}
            className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
            alt=""
          />
          <h2 className="text-3xl font-bold mb-2 text-accent">
            {modalData.title}
          </h2>
          <p className="text-gray-300 mb-4">{modalData.desc}</p>

          <div className="mb-6">
            <h4 className="font-bold text-white mb-3">Tech Stack:</h4>
            <div className="flex gap-2 flex-wrap">
              {modalData.stack.map((t) => (
                <span
                  key={t}
                  className="bg-accent/10 px-3 py-1 rounded-full text-xs text-accent border border-accent/30">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-white mb-3">Key Features:</h4>
            <ul className="text-gray-300 space-y-2">
              {modalData.details.map((detail, idx) => (
                <li key={idx} className="flex gap-2">
                  <i className="fas fa-check text-accent mt-1"></i>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={modalData.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 bg-gradient-to-r from-accent to-blue-500 text-primary font-bold rounded-lg text-center hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all">
              <i className="fab fa-github mr-2"></i>View Code
            </a>
            <a
              href={modalData.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 border border-accent text-accent font-bold rounded-lg text-center hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all">
              <i className="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>
            <button
              onClick={closeModal}
              className="flex-1 py-3 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
