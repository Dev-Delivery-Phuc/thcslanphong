import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import HelpStrip from '@/components/HelpStrip.jsx';
import Mascot from '@/components/Mascot.jsx';
import SetGrid from '@/components/SetGrid.jsx';
import { SITE, SCHOOL_HOTLINES, HOTLINES, HOTLINE_PAGES } from '@/config/site.js';
import { LESSON_SLIDES } from '@/content/lesson.js';
import { BUILTIN_SETS } from '@/content/questions/index.js';
import { routes } from '@/lib/router.js';

export default function HomePage() {
  return (
    <>
      <SiteHeader current="home" />
      <main className="page home">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-school">
              Cổng thông tin của {SITE.school}
              <br />
              {SITE.location}
            </p>
            <h1 className="display-xl">
              <span className="line">Phòng, chống</span> <span className="line">ma túy học đường</span>
            </h1>
            <p className="lead">
              Bài giảng trình chiếu, trò chơi củng cố kiến thức, đường dây nóng tư vấn và tài liệu tham khảo cho học sinh và thầy cô.
            </p>
            <div className="row-actions hero-actions">
              <a className="btn btn-sun btn-lg" href={routes.lesson(1)}>
                Vào bài giảng
              </a>
              <a className="btn btn-paper btn-lg" href={routes.games}>
                Chơi trò chơi
              </a>
              <a className="btn btn-coral btn-lg" href={routes.hotline}>
                📞 Đường dây nóng
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Mascot size={210} mood="happy" />
            <span className="sticker sticker-a">Nói KHÔNG!</span>
            <span className="sticker sticker-b">+200</span>
          </div>
        </section>

        {/* Thanh Tiện Ích Tinh Gọn: Hotline & Tư Liệu (Chỉ dùng Icon, không tách khung card lẻ) */}
        <section className="quick-dock" aria-label="Đường dây nóng và liên kết nhanh">
          <div className="quick-dock-row">
            <div className="quick-dock-title">
              <span className="dot-live"></span>
              <span>Đường dây nóng THCS Lân Phong:</span>
            </div>
            <div className="quick-chips">
              <a className="chip chip-teacher" href="tel:0935362946" title="Gọi Cô Hồ Ngọc Điệp (0935 362 946)">
                <span className="chip-icon">👩‍🏫</span>
                <span>Cô Điệp:</span>
                <span className="chip-num">0935 362 946</span>
              </a>
              <a className="chip chip-teacher" href="tel:0379898198" title="Gọi Thầy Trần Tiến Duy (037 989 8198)">
                <span className="chip-icon">👨‍🏫</span>
                <span>Thầy Duy:</span>
                <span className="chip-num">037 989 8198</span>
              </a>
              <a className="chip chip-alert" href="tel:111" title="Tổng đài Quốc gia Bảo vệ Trẻ em">
                <span className="chip-icon">🚨</span>
                <span>Trẻ em:</span>
                <span className="chip-num">111</span>
              </a>
              <a className="chip chip-alert" href="tel:113" title="Công an khẩn cấp">
                <span className="chip-icon">👮</span>
                <span>Công an:</span>
                <span className="chip-num">113</span>
              </a>
            </div>
          </div>

          <div className="quick-dock-divider"></div>

          <div className="quick-dock-row">
            <div className="quick-dock-title">
              <span>Cổng TT & Tư liệu liên kết:</span>
            </div>
            <div className="quick-chips">
              <a className="chip chip-link" href="http://quangngai.gov.vn" target="_blank" rel="noreferrer" title="Cổng thông tin điện tử tỉnh Quảng Ngãi">
                <span className="chip-icon">🏛️</span>
                <span>Cổng TT Quảng Ngãi</span>
              </a>
              <a className="chip chip-link" href="https://share.google/RtoX2T3Li1jzxskgR" target="_blank" rel="noreferrer" title="Kênh tài liệu & tư vấn 1">
                <span className="chip-icon">📁</span>
                <span>Tài liệu 1</span>
              </a>
              <a className="chip chip-link" href="https://share.google/enzqiUiC8uuZrNaho" target="_blank" rel="noreferrer" title="Tài liệu tuyên truyền & kỹ năng 2">
                <span className="chip-icon">🛡️</span>
                <span>Tài liệu 2</span>
              </a>
              <a className="chip chip-link" href="https://share.google/kaX2f4Soe00cDRNcs" target="_blank" rel="noreferrer" title="Cẩm nang nhận biết ma túy mới">
                <span className="chip-icon">📖</span>
                <span>Cẩm nang ma túy mới</span>
              </a>
              <a className="chip chip-more" href={routes.news} title="Cổng thông tin tỉnh, Chính phủ & Báo chí tuyên truyền">
                <span>📰 Báo chí & Cổng TT ↗</span>
              </a>
              <a className="chip chip-more" href={routes.hotline} title="Xem toàn bộ hướng dẫn, cam kết bảo mật và gửi tin ẩn danh">
                <span>📞 Hotline & Hỗ trợ ↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="home-section">
          <h2 className="display-sm">Nội dung bài giảng</h2>
          <p className="muted">
            {LESSON_SLIDES.length} phần, trình chiếu được trên máy chiếu. Dùng phím mũi tên hoặc bút trình chiếu để chuyển.
          </p>
          <ol className="chapter-list">
            {LESSON_SLIDES.map((s, i) => (
              <li key={s.id}>
                <a href={routes.lesson(i + 1)}>{s.nav}</a>
              </li>
            ))}
          </ol>
        </section>

        <section className="home-section">
          <h2 className="display-sm">Trò chơi củng cố</h2>
          <p className="muted">Chọn một bộ, sau đó chọn số câu muốn chơi.</p>
          <SetGrid sets={BUILTIN_SETS} />
        </section>

        <HelpStrip />
      </main>
      <SiteFooter />
    </>
  );
}
