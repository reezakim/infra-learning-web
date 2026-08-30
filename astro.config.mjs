// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://reezakim.my.id',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), keystatic(), sitemap()],
});


