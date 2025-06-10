// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import icon from 'astro-icon';

import rehypeMathML from '@daiji256/rehype-mathml'
import remarkMath from 'remark-math'


// https://astro.build/config
export default defineConfig({
    site: 'https://jhanschoo.github.io',
    integrations: [react(), mdx(), sitemap(), icon()],
    markdown: {
        rehypePlugins: [rehypeMathML],
        remarkPlugins: [remarkMath],
        shikiConfig: {
            themes: {
                light: 'gruvbox-light-soft',
                dark: 'gruvbox-dark-soft',
            },
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});