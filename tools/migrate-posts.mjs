import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.resolve(
  root,
  '../Hexo-Project/ChenzyMark-Blog_Hexo-site/source/_posts',
);
const destDir = path.join(root, 'src/content/notes');

const skip = new Set(['leetCode copy.md', 'codex_log.md']);
const featured = new Set(['前端性能优化.md', '项目相关问题.md', 'WebComponents.md', '前端存储.md']);

const fallback = {
  'leetCode.md': `---
title: leetCode
date: 2026-04-09 13:20:00
description: LeetCode 题解摘录。
tags:
  - javascript
categories:
  - 前端知识库
  - JavaScript
featured: false
---
`,
  'leetCode1.md': `---
title: leetCode1
date: 2026-04-09 13:20:00
description: LeetCode 题解摘录。
tags:
  - javascript
categories:
  - 前端知识库
  - JavaScript
featured: false
---
`,
  'MDN_JS阅读笔记.md': `---
title: MDN JavaScript 阅读笔记
date: 2026-04-09 13:20:00
description: MDN JavaScript 语言概览的阅读摘录。
tags:
  - javascript
categories:
  - 前端知识库
  - JavaScript
featured: false
---
`,
};

function cleanBody(body) {
  return body
    .replace(/^\[TOC\]\s*$/gim, '')
    .replace(/^!\[.*?\]\([A-Za-z]:\\.*?\)\s*$/gim, '')
    .replace(/^\uFEFF/, '')
    .replace(/^\s+/, '');
}

function withFeatured(frontmatter, isFeatured) {
  const lines = frontmatter.replace(/\r\n/g, '\n').split('\n').filter((line) => !/^featured:/i.test(line));
  lines.push(`featured: ${isFeatured}`);
  return `${lines.join('\n').trim()}\n`;
}

await mkdir(destDir, { recursive: true });
const files = (await readdir(sourceDir)).filter((name) => name.endsWith('.md') && !skip.has(name));

for (const name of files) {
  const raw = (await readFile(path.join(sourceDir, name), 'utf8')).replace(/^\uFEFF/, '');
  const isFeatured = featured.has(name);
  let output;

  if (fallback[name] && !raw.startsWith('---')) {
    output = `${fallback[name].trim()}\n\n${cleanBody(raw)}\n`;
  } else if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3);
    if (end === -1) throw new Error(`No closing front matter in ${name}`);
    const fm = withFeatured(raw.slice(4, end), isFeatured);
    const body = cleanBody(raw.slice(end + 4));
    output = `---\n${fm}---\n\n${body}\n`;
  } else {
    throw new Error(`Missing front matter: ${name}`);
  }

  await writeFile(path.join(destDir, name), output, 'utf8');
  console.log(`wrote ${name}${isFeatured ? ' (featured)' : ''}`);
}

console.log(`migrated ${files.length} notes from ${sourceDir}`);
