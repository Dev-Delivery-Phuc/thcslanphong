import Mascot from './Mascot.jsx';
import { SITE } from '@/config/site.js';
import { routes } from '@/lib/router.js';

const NAV = [
  { href: routes.lesson(1), label: 'Bài giảng', key: 'bai-giang' },
  { href: routes.games, label: 'Trò chơi', key: 'tro-choi' },
  { href: routes.news, label: 'Báo chí & Cổng TT', key: 'tin-tuc' },
  { href: routes.teacher, label: 'Góc thầy cô', key: 'giao-vien' },
  { href: routes.hotline, label: '📞 Đường dây nóng', key: 'duong-day-nong', isHotline: true },
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
          <a
            key={item.key}
            href={item.href}
            className={item.isHotline ? 'nav-hotline' : undefined}
            aria-current={current === item.key ? 'page' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
