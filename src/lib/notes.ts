import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './paths';

export type Note = CollectionEntry<'notes'>;

const topicSlugMap: Record<string, string> = {
  JavaScript: 'javascript',
  Vue: 'vue',
  React: 'react',
  'HTML-CSS': 'html-css',
  浏览器与网络: 'network',
  性能优化: 'performance',
  工程化: 'engineering',
};

const slugTopicMap = Object.fromEntries(
  Object.entries(topicSlugMap).map(([name, slug]) => [slug, name]),
);

export function topicOf(note: Note): string {
  const cats = note.data.categories;
  return cats[1] ?? cats[0] ?? '未分类';
}

export function topicSlug(name: string): string {
  return topicSlugMap[name] ?? encodeURIComponent(name);
}

export function topicNameFromSlug(slug: string): string | undefined {
  return slugTopicMap[slug] ?? decodeURIComponent(slug);
}

export function publicSlug(id: string): string {
  return id.toLowerCase().replace(/[（）()&]/g, '');
}

function civilParts(date: Date) {
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

export function formatDotDate(date: Date): string {
  const { year, month } = civilParts(date);
  return `${year}.${String(month).padStart(2, '0')}`;
}

export function formatFullDate(date: Date): string {
  const { year, month, day } = civilParts(date);
  return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
}

export function readingMinutes(body: string): number {
  const cn = (body.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const en = (body.match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cn / 400 + en / 200));
}

export async function allNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  return notes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function notePath(note: Note): string {
  return withBase(`/notes/${publicSlug(note.id)}/`);
}

export function topicPath(name: string): string {
  return withBase(`/topics/${topicSlug(name)}/`);
}

export function oldHexoPath(note: Note): {
  year: string;
  month: string;
  day: string;
  slug: string;
} {
  const { year, month, day } = civilParts(note.data.date);
  return {
    year: String(year),
    month: String(month).padStart(2, '0'),
    day: String(day).padStart(2, '0'),
    slug: note.id,
  };
}
