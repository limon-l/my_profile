import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 bg-primary/50 border-t border-accent/20 text-center">
      <p className="text-gray-500 mb-4">
        <i className="fas fa-heart text-accent mr-2"></i>
        Built with passion. &copy; 2025 Limon Roy Apu. All rights reserved.
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/limon-l"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
          <i className="fab fa-github text-2xl"></i>
        </a>
        <a
          href="https://linkedin.com/in/limonroyapu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
          <i className="fab fa-linkedin text-2xl"></i>
        </a>
        <a
          href="mailto:limonroyapu101@gmail.com"
          className="text-gray-400 hover:text-accent hover:scale-125 transition-all">
          <i className="fas fa-envelope text-2xl"></i>
        </a>
      </div>
    </footer>
  );
}
