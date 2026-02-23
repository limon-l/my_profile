import React from "react";

export default function ProjectsSection({ projects, openModal }) {
  return (
    <section id="projects" className="py-20 bg-secondary/30 backdrop-blur-sm">
      <div className="container">
        <h2 className="section-title text-4xl font-bold text-center mb-16 animate-slideUp">
          <span className="border-b-4 border-accent pb-2">
            Featured Projects
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.keys(projects).map((k, idx) => {
            const p = projects[k];
            return (
              <div
                key={k}
                className="group project-card bg-primary/40 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/20 hover:border-accent/60 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] transition-all hover:-translate-y-2 duration-300 animate-slideUp"
                style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="project-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30">
                        {tech}
                      </span>
                    ))}
                    {p.stack.length > 2 && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30">
                        +{p.stack.length - 2}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => openModal(k)}
                    className="text-accent font-semibold hover:text-white transition-colors flex items-center gap-1 group/btn">
                    View Details
                    <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
