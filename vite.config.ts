import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // optimizeDeps: {
  //   exclude: ['fs'], // Exclude 'fs' module
  // },
  // build: {
  //   rollupOptions: {
  //     external: ['fs'], // Treat 'fs' as an external dependency to avoid bundling
  //   },
  // },
});
