import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  return {
    plugins: [react(), WindiCSS()],
    cors: false,
  };
});
