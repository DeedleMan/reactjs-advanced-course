import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Включает нативное разрешение путей из tsconfig.json
    tsconfigPaths: true,
  },
});
