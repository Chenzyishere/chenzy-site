import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const notesDir = path.join(root, 'src/content/notes');
const distDir = path.join(root, 'dist');

function html(to) {
  const href = encodeURI(to);
  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0;url=${href}" />
    <link rel="canonical" href="${href}" />
    <title>Redirecting</title>
  </head>
  <body>
    <a href="${href}">Moved</a>
  </body>
</html>
`;
}

const files = (await readdir(notesDir)).filter((name) => name.endsWith('.md'));

for (const name of files) {
  const raw = await readFile(path.join(notesDir, name), 'utf8');
  const match = raw.match(/^date:\s*["']?(\d{4})-(\d{2})-(\d{2})/m);
  if (!match) continue;
  const [, year, month, day] = match;
  const slug = name.replace(/\.md$/, '');
  const dest = `/notes/${slug.toLowerCase().replace(/[（）()&]/g, '')}/`;
  const dir = path.join(distDir, year, month, day, slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html(dest), 'utf8');
}

const aliases = {
  '/projects/index.html': '/work/',
  '/taxonomy/index.html': '/topics/',
  '/categories/index.html': '/topics/',
  '/tags/index.html': '/topics/',
  '/archives/index.html': '/archive/',
  '/music/index.html': '/list/',
  '/movies/index.html': '/list/',
  '/link/index.html': '/list/',
};

for (const [from, to] of Object.entries(aliases)) {
  const file = path.join(distDir, from);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html(to), 'utf8');
}

console.log(`wrote ${files.length} hexo redirects`);
