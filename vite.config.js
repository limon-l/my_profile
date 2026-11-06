import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    // The legacy, unused hero.svg is unreadable on the source host.
    // generate-pages.mjs copies the explicit assets used by this application.
    copyPublicDir: false,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
