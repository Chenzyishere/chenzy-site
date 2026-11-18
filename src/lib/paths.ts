export function withBase(path = '/') {
  const base = import.meta.env.BASE_URL || '/';
  if (!path || path === '/') return base;
  return `${base}${path.replace(/^\//, '')}`;
}
