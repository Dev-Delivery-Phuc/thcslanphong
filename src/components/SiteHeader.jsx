import Mascot from './Mascot.jsx';
import { SITE } from '@/config/site.js';
import { routes } from '@/lib/router.js';

const NAV = [
  { href: routes.lesson(1), label: 'Bài giảng', key: 'bai-giang' },
  { href: routes.games, label: 'Trò chơi', key: 'tro-choi' },
  { href: routes.teacher, label: 'Góc thầy cô', key: 'giao-vien' },
];

export default function SiteHeader({ current }) {
  return (
    <header className="site-header">
      <a className="brand" href={routes.home}>
        <Mascot size={36} />
        <span className="brand-text">
          <span className="brand-school">{SITE.schoolShort}</span>
          <span className="brand-sub">{SITE.shortName}</span>
        </span>
      </a>
      <nav className="site-nav" aria-label="Điều hướng chính">
        {NAV.map((item) => (
          <a key={item.key} href={item.href} aria-current={current === item.key ? 'page' : undefined}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
