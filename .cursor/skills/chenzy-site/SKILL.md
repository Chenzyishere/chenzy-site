---
name: chenzy-site
description: >-
  Continues Chenzy's Astro personal site (chenzy-site): homepage, notes, work,
  topics, menu, transitions, GitHub Pages. Use when editing this repo, the
  personal blog rebuild, or when the user mentions chenzy-site, blog.chenzymark.space,
  lizheng, daveholloway, Chiara Luzzana, or leaving Hexo.
---

# chenzy-site

Zhiyan 的个人站。仓库 `Chenzyishere/chenzy-site`，本地 `e:/SynologyDrive/WORK/develop-project/chenzy-site`。旧站是旁边的 Hexo 工程，**不要改 Hexo，除非用户明确要求**。

回复用简体中文。

## 设计约定（不要走样）

三站只借结构/视觉/交互，不抄内容和品牌。

| 参考 | 借什么 | 不借什么 |
| --- | --- | --- |
| [lizheng.ai](https://www.lizheng.ai/) | 长页叙事：主张 → 现在 → 精选判断 → 入口 | 问答、学院、书、评价 |
| [daveholloway.uk](https://daveholloway.uk/) | 平涂蓝、超大字、黑框海报卡、左右项目轮播 | 插画、gold mode、整站铺蓝 |
| [chiaraluzzana.com/blog](https://www.chiaraluzzana.com/blog) | 全屏黑底菜单、扫过转场、桌面圆环光标 | WebGL、声音、竖屏请旋转 |

视觉规则：

- 首页 / work：`--blue: #2f3bff`，黑字，3px 黑线
- 笔记 / about / archive / topics：`--paper: #e8e2d4`
- 中文标题 Noto Sans SC 900；英文区块名 Alumni Sans / Anton
- 页眉：左 C + CHENZY，右 INDEX。INDEX 打开全屏菜单（HOME / NOTES / WORK / TOPICS / ABOUT / LISTS）
- `prefers-reduced-motion` 时关掉菜单动画、转场、光标
- 不要引入组件库或再套主题

## 技术

Astro 5 静态输出 + 少量 React 岛（`Menu`、`WorkCarousel`）。Markdown + remark-gfm + rehype-slug。搜索是 Pagefind（`npm run build` 之后才有索引）。

不要上 Next、不要整站 React。不要用 Lenis：它会给 html 加 transform，弄坏 `position: fixed` 菜单。

菜单必须挂在 `body` 下（见 `src/layouts/Base.astro`），不要放进 sticky header，否则 overlay 会被裁切。

## 目录

```text
src/content/notes/       文章（从 Hexo 迁入）
src/content/projects/    三个项目
src/data/site.ts         站名、主张、社交
src/data/now.ts          在学 / 在做
src/pages/index.astro    首页长页
src/pages/notes/         笔记列表 + [slug]
src/pages/work/          项目
src/pages/topics/        知识分类
src/layouts/             Base / Note
src/components/          Header, Menu, WorkCarousel, Cursor, Transition
```

## 内容约定

笔记 front matter：`title` `date` `description` `categories` `tags` `featured`。`featured: true` 上首页精选（目前四篇：前端性能优化、前端存储、WebComponents、项目相关问题）。分类取 **第二级** 当 topic。

链接用 `notePath()` / `publicSlug()`（`src/lib/notes.ts`），不要手写文件名。Astro 会清洗动态路由：小写、去掉 `（）()&`。日期按 YAML 日历日，用 UTC getter，避免东八区偏一天。

旧 Hexo 地址 `/年/月/日/原文件名/` 由 `tools/write-redirects.mjs` 在 build 后写入 `dist`。`codex_log.md` 和 `leetCode copy.md` 不迁。

新文章放到 `src/content/notes/`。写作源以后仍可以是 `Chenzyishere/chenzymark-documents`；workflow 已留 `repository_dispatch`，密钥名 `DOCS_REPO_PAT`，**还没接上**。

## 命令

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # astro build + hexo 跳转 + pagefind
npm run preview
npm run migrate:posts  # 仅当要从旁边 Hexo 再导一遍笔记
```

Node 22。依赖安装优先 `https://registry.npmmirror.com`。

改 UI 后：`npm run build` 或 `npm run dev`，再用浏览器点一遍 INDEX 菜单、一篇长笔记、项目左右切换、一次站内跳转。

## 部署现状

- GitHub：https://github.com/Chenzyishere/chenzy-site
- Workflow：`.github/workflows/deploy.yml` → GitHub Pages
- **Pages 还没在仓库设置里打开**。打开后预览是 `https://chenzyishere.github.io/chenzy-site/`
- 自定义域 `blog.chenzymark.space` **还没切**。切之前不要写 `public/CNAME`，也不要停 Hexo 部署
- 预览若走 github.io 子路径，需要给 `astro.config.mjs` 加 `base: '/chenzy-site'`；绑自定义域时 `base` 必须是 `/`

## 未做完（用户没点名就不要自己做）

1. GitHub Pages 开关与第一次 Actions 部署
2. 域名从 Hexo 切过来
3. documents 仓库的 `repository_dispatch` 改打到本仓库
4. 关于/音乐/电影/友链仍是占位文案
5. 精选四篇的 `description` 有的还是标题复读，可以改成一句判断
