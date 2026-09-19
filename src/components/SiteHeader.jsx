import { useState } from 'react';
import { SITE } from '@/config/site.js';
import { routes } from '@/lib/router.js';

const NAV = [
  { href: routes.home, label: 'Trang chủ', key: 'home' },
  { href: routes.lesson(1), label: 'Bài giảng', key: 'bai-giang' },
  { href: routes.games, label: 'Trò chơi', key: 'tro-choi' },
  { href: routes.news, label: 'Báo chí & Cổng TT', key: 'tin-tuc' },
  { href: routes.teacher, label: 'Góc thầy cô', key: 'giao-vien' },
  { href: routes.hotline, label: '📞 Đường dây nóng', key: 'duong-day-nong', isHotline: true },
];

export default function SiteHeader({ current }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-navbar-wrapper">
      <div className="site-navbar">
        {/* Brand Logo & Tên Trường */}
        <a className="navbar-brand" href={routes.home}>
          <img
            src="images/logo-thcs-lan-phong.jpg"
            alt="Logo Trường THCS Lân Phong"
            className="navbar-logo"
          />
          <div className="brand-text">
            <span className="brand-school">{SITE.schoolShort}</span>
            <span className="brand-sub">{SITE.shortName}</span>
          </div>
        </a>

        {/* Nút bấm Menu Mobile */}
        <button
          type="button"
          className="navbar-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Mở menu điều hướng"
        >
          <span className="toggle-icon">{isOpen ? '✕' : '☰'}</span>
          <span className="toggle-text">Menu</span>
        </button>

        {/* Thanh Menu Điều Hướng (Navbar Nav) */}
        <nav className={`navbar-nav ${isOpen ? 'is-open' : ''}`} aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`nav-item ${item.isHotline ? 'nav-item-hotline' : ''} ${current === item.key ? 'active' : ''}`}
              aria-current={current === item.key ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
