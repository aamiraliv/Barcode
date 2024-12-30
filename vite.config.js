import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
//
import path from "path";
import { fileURLToPath } from "url";
// Define __dirname for Vite (not available by default in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  plugins: [react()],
  server: {
    open: true,
    historyApiFallback: true, // Ensures SPA routes are handled
  },
});
