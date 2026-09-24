import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://tiny-jackal.cloudvent.net/",
  integrations: [react(), editableRegions(), mdx()],
  image: {
    // SVG sources are passed through the image pipeline by the component globs.
    // Disabled by default since Astro 6.3; our SVGs are local, trusted assets.
    dangerouslyProcessSVG: true,
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
