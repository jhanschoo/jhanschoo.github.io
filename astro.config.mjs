// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import icon from "astro-icon";

import rehypeMathML from "@daiji256/rehype-mathml";
import remarkMath from "remark-math";
import remarkAddAstroPlainText from "./remark-plugins/remark-add-astro-plain-text";

// https://astro.build/config
export default defineConfig({
  site: "https://jhanschoo.github.io",
  integrations: [react(), mdx(), sitemap(), icon()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "EB Garamond",
      cssVariable: "--font-eb-garamond",
      weights: ["400 800"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.local(),
      name: "Monaspace Xenon",
      cssVariable: "--font-monaspace-xenon",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/MonaspaceXenonVarVF.ttf"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Garamond Math",
      cssVariable: "--font-garamond-math",
      fallbacks: ["Cambria Math", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/Garamond-Math.otf"],
            weight: "normal",
            style: "normal",
          },
        ],
      },
    },
  ],
  markdown: {
    rehypePlugins: [rehypeMathML],
    remarkPlugins: [remarkMath, remarkAddAstroPlainText],
    shikiConfig: {
      themes: {
        light: "gruvbox-light-soft",
        dark: "gruvbox-dark-soft",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
