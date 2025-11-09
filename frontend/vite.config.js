import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/vibeathon/",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://vibeathon-zeta.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
