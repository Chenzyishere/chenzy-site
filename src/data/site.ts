export const site = {
  name: 'Chenzy',
  handle: 'Chenzyishere',
  url: 'https://blog.chenzymark.space',
  title: 'Chenzy',
  kicker: 'Chenzy · Frontend',
  manifesto: '量化学习，驱散认知迷雾。',
  lead:
    '我是 Chenzy，做前端。这里记下能被复述的判断：语言机制、框架边界、性能和工程化。先写清楚，再让项目检验。',
  description: 'Chenzy 的个人站点。前端笔记、项目与正在做的事。',
  github: 'https://github.com/Chenzyishere',
  email: '',
} as const;

export const nav = [
  { href: '/', label: 'Home', no: '01' },
  { href: '/notes', label: 'Notes', no: '02' },
  { href: '/work', label: 'Work', no: '03' },
  { href: '/topics', label: 'Topics', no: '04' },
  { href: '/about', label: 'About', no: '05' },
  { href: '/list', label: 'Lists', no: '06' },
] as const;
