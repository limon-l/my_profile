import React from "react";

export default function Navigation({ mobileOpen, setMobileOpen, scrollY }) {
  return (
    <nav
      className="fixed w-full top-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-accent/20 shadow-lg transition-all duration-300"
      style={{ transform: `translateY(${scrollY > 50 ? 0 : 0}px)` }}>
      <div className="container px-6 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-bold text-accent tracking-wider hover:scale-105 transition-transform">
          LIMON.<span className="text-white">DEV</span>
        </a>

        <ul className="hidden md:flex space-x-8 text-sm font-semibold uppercase tracking-wide">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className="nav-link relative group text-gray-300 hover:text-accent transition-colors">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent rounded transition-all group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-2xl focus:outline-none hover:text-accent transition-colors">
          <i className={`fas fa-${mobileOpen ? "times" : "bars"}`}></i>
        </button>
      </div>

      {mobileOpen && (
        <div className="bg-secondary/95 backdrop-blur-md border-t border-gray-700 absolute w-full md:hidden animate-slideDown">
          {["home", "about", "skills", "projects", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setMobileOpen(false)}
              className="nav-link block py-3 px-6 hover:bg-accent/10 hover:text-accent transition-all">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
