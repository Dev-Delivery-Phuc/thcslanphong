import Mascot from './Mascot.jsx';
import { SITE, SCHOOL_HOTLINES, HOTLINES, HOTLINE_PAGES, SOURCES } from '@/config/site.js';
import { routes } from '@/lib/router.js';

export default function SiteFooter() {
  const [diep, duy] = SCHOOL_HOTLINES;

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-main-row">
          <div className="footer-brand">
            <Mascot size={46} mood="happy" />
            <div className="footer-brand-text">
              <h3>{SITE.school}</h3>
              <p>
                {SITE.name} • {SITE.location}
              </p>
            </div>
          </div>

          <div className="footer-actions">
            <div className="footer-chips-group">
              <span className="footer-label">📞 Hotline:</span>
              <a className="chip chip-teacher" href={`tel:${diep.rawPhone}`} title={`Gọi ${diep.name} (${diep.phone})`}>
                <span className="chip-icon">👩‍🏫</span>
                <span>Cô Điệp:</span>
                <span className="chip-num">{diep.phone}</span>
              </a>
              <a className="chip chip-teacher" href={`tel:${duy.rawPhone}`} title={`Gọi ${duy.name} (${duy.phone})`}>
                <span className="chip-icon">👨‍🏫</span>
                <span>Thầy Duy:</span>
                <span className="chip-num">{duy.phone}</span>
              </a>
              <a className="chip chip-alert" href="tel:111" title="Tổng đài Quốc gia Bảo vệ Trẻ em">
                <span className="chip-icon">🚨</span>
                <span className="chip-num">111</span>
              </a>
              <a className="chip chip-alert" href="tel:113" title="Công an khẩn cấp">
                <span className="chip-icon">👮</span>
                <span className="chip-num">113</span>
              </a>
            </div>

            <div className="footer-chips-group">
              <span className="footer-label">🌐 Liên kết:</span>
              <a
                className="chip chip-link"
                href="http://quangngai.gov.vn"
                target="_blank"
                rel="noreferrer"
                title="Cổng thông tin điện tử tỉnh Quảng Ngãi"
              >
                <span className="chip-icon">🏛️</span>
                <span>Cổng TT Quảng Ngãi</span>
              </a>
              <a
                className="chip chip-link"
                href="https://share.google/RtoX2T3Li1jzxskgR"
                target="_blank"
                rel="noreferrer"
                title="Kênh tài liệu & tư vấn 1"
              >
                <span className="chip-icon">📁</span>
                <span>Tài liệu 1</span>
              </a>
              <a
                className="chip chip-link"
                href="https://share.google/enzqiUiC8uuZrNaho"
                target="_blank"
                rel="noreferrer"
                title="Tài liệu tuyên truyền & kỹ năng 2"
              >
                <span className="chip-icon">🛡️</span>
                <span>Tài liệu 2</span>
              </a>
              <a
                className="chip chip-link"
                href="https://share.google/kaX2f4Soe00cDRNcs"
                target="_blank"
                rel="noreferrer"
                title="Cẩm nang nhận biết ma túy mới"
              >
                <span className="chip-icon">📖</span>
                <span>Cẩm nang</span>
              </a>
              <a className="chip chip-more" href={routes.news} title="Cổng thông tin tỉnh, Chính phủ & Báo chí">
                <span>📰 Báo chí & Cổng TT ↗</span>
              </a>
              <a className="chip chip-more" href={routes.hotline} title="Trang đường dây nóng và tư liệu chi tiết">
                <span>📞 Hotline ↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} <strong>{SITE.school}</strong>. Chung tay xây dựng học đường an toàn, không ma túy.
          </div>
          <div className="footer-ref">
            Tài liệu tham khảo:{' '}
            {SOURCES.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ' • '}
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.publisher}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
