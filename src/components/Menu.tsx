import { useEffect, useId, useState } from 'react';
import { nav } from '../data/site';
import { withBase } from '../lib/paths';

export default function Menu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.documentElement.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>INDEX</span>
        <span aria-hidden="true">{open ? '×' : '☰'}</span>
      </button>
      <nav
        id={panelId}
        className={`menu-overlay${open ? ' is-open' : ''}`}
        aria-label="全站"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <ul className="menu-list">
          {nav.map((item) => (
            <li key={item.href}>
              <a className="menu-link" href={withBase(item.href)} onClick={() => setOpen(false)}>
                <span className="menu-no">{item.no}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
