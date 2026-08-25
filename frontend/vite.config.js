import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      // Gateway Treks API
      "/api": {
        target: "https://gatewaytreks.com",
        changeOrigin: true,
        secure: true,
       
      },
    },
  },
});