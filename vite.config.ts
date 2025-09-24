import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: "esbuild",
    lib: {
      entry: "src/nierenrechner.ts",
      name: "Nierenrechner",
      fileName: "nierenrechner",
      formats: ["es"],
    },
  },
});
