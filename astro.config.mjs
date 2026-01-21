// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://vitype.io.vn",
  outDir: "./docs",
  integrations: [react(), sitemap()],
});
