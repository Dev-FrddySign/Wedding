import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Este fallback hace que Vite sirva index.html para rutas que no reconoce
    historyApiFallback: true,
  },
});