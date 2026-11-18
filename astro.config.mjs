import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: 'https://blog.chenzymark.space',
  integrations: [react()],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    shikiConfig: {
      theme: 'min-dark',
    },
  },
  redirects: {
    '/projects': '/work',
    '/taxonomy': '/topics',
    '/categories': '/topics',
    '/tags': '/topics',
    '/archives': '/archive',
    '/music': '/list',
    '/movies': '/list',
    '/link': '/list',
  },
});
