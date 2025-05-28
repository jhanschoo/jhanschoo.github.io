// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import icon from 'astro-icon';

import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'


// https://astro.build/config
export default defineConfig({
    site: 'https://jhanschoo.github.io',
    integrations: [react(), mdx(), sitemap(), icon()],
    markdown: {
        rehypePlugins: [rehypeKatex],
        remarkPlugins: [remarkMath],
    },
    vite: {
        plugins: [tailwindcss()],
    },
});