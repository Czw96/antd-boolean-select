import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  root: "./preview",
  base: "/antd-boolean-select/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "/var/www/demo.29dev.cn/antd-boolean-select",
  },
});
