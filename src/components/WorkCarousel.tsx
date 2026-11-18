import { useMemo, useState } from 'react';

export type WorkItem = {
  title: string;
  code: string;
  badge: string;
  description: string;
  stack: string[];
  projectUrl: string;
  repoUrl: string;
};

export default function WorkCarousel({ items }: { items: WorkItem[] }) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const current = useMemo(() => items[index] ?? items[0], [items, index]);

  if (!current) return null;

  const go = (delta: number) => {
    setIndex((value) => (value + delta + total) % total);
  };

  return (
    <div className="work-stage">
      <article className="work-card">
        <div className="work-code">{current.code}</div>
        <div className="work-body">
          <p className="kicker">{current.badge}</p>
          <h3>{current.title}</h3>
          <p>{current.description}</p>
          <div className="stack-list">
            {current.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="work-actions">
          <a href={current.projectUrl} target="_blank" rel="noreferrer">
            View work →
          </a>
          <a href={current.repoUrl} target="_blank" rel="noreferrer">
            Repo
          </a>
        </div>
      </article>
      <div className="work-nav">
        <button type="button" aria-label="上一个项目" onClick={() => go(-1)}>
          ←
        </button>
        <span>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button type="button" aria-label="下一个项目" onClick={() => go(1)}>
          →
        </button>
      </div>
    </div>
  );
}
