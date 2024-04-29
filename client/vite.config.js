import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@components": "/src/components",
      "@services": "/src/services",
      "@features": "/src/features",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@utils": "/src/utils",
    },
  },
});
