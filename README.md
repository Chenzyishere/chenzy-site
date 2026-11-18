# chenzy-site

Chenzy 的个人站点。Astro 静态生成，部署到 GitHub Pages。

视觉参考 [Dave Holloway](https://daveholloway.uk/)，信息结构参考 [lizheng.ai](https://www.lizheng.ai/)，菜单与转场参考 [Chiara Luzzana](https://www.chiaraluzzana.com/blog)。

## 本地

```bash
npm install
npm run migrate:posts   # 从旁边的 Hexo 工程导入笔记，只需跑一次
npm run dev
```

打开 `http://localhost:4321`。

```bash
npm run build
npm run preview
```

全文搜索依赖 `pagefind`，在 `build` 之后可用。

## 内容

- 笔记：`src/content/notes/*.md`
- 项目：`src/content/projects/*.md`
- 站点文案：`src/data/site.ts`、`src/data/now.ts`

文章 front matter：

```yaml
title: 前端存储
date: 2026-01-01 11:33:00
description: 前端本地存储方案
categories:
  - 前端知识库
  - 浏览器与网络
tags:
  - frontend
  - storage
featured: true
```

`featured: true` 会出现在首页精选。分类取第二级作为主题。

写作源仍可以是 `Chenzyishere/chenzymark-documents`。推送后用 `repository_dispatch` 触发本仓库的部署 workflow。需要仓库密钥 `DOCS_REPO_PAT`。

## 域名

当前先按 GitHub Pages 预览。切 `blog.chenzymark.space` 时，在仓库 Settings → Pages 绑定自定义域名，并在 `public/CNAME` 写入该域名。Hexo 仓库的部署 workflow 再停掉。

旧链接 `/年/月/日/文件名/` 会 301 到 `/notes/文件名/`。
