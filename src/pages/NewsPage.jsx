import { useState } from 'react';
import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import HelpStrip from '@/components/HelpStrip.jsx';
import { SITE, GOV_PORTALS, PRESS_ARTICLES, HOTLINE_PAGES } from '@/config/site.js';
import { routes } from '@/lib/router.js';

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'Tất cả bài viết' },
    { key: 'Cảnh báo học đường', label: 'Cảnh báo học đường' },
    { key: 'Chỉ đạo địa phương', label: 'Chỉ đạo Quảng Ngãi' },
    { key: 'Pháp luật', label: 'Pháp luật & Trách nhiệm' },
    { key: 'Kỹ năng sống', label: 'Kỹ năng tự bảo vệ' },
  ];

  const filteredArticles =
    activeCategory === 'all'
      ? PRESS_ARTICLES
      : PRESS_ARTICLES.filter((item) => item.category === activeCategory);

  return (
    <>
      <SiteHeader current="tin-tuc" />
      <main className="page news-page">
        {/* Banner Hero */}
        <section className="news-hero">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div className="news-hero-content">
              <span className="pill pill-sun">
                <span>📰</span> BÁO CHÍ & CỔNG THÔNG TIN CHÍNH THỨC
              </span>
              <h1>Cổng Thông Tin Tỉnh, Chính Phủ & Báo Chí Tuyên Truyền</h1>
              <p className="lead">
                Tổng hợp thông tin chính thống từ Cổng thông tin điện tử tỉnh Quảng Ngãi, Chính phủ, Bộ Công an, Bộ GD&ĐT cùng các bài báo cảnh báo, hướng dẫn phòng chống ma túy học đường dành cho thầy cô, học sinh và phụ huynh {SITE.school}.
              </p>
            </div>
            <div className="hotline-mascot-box" style={{ background: '#eff6ff' }}>
              <img
                src="images/logo-thcs-lan-phong.jpg"
                alt="Logo Trường THCS Lân Phong"
                className="hotline-speech-logo"
              />
              <div className="hotline-mascot-speech">
                “Đọc báo chính thống
                <br />
                Hiểu luật để tự bảo vệ mình!”
              </div>
            </div>
          </div>
        </section>

        {/* Banner Tiêu Điểm Thực Tiễn Tại Trường */}
        <section className="news-school-highlight">
          <div className="school-highlight-card">
            <div className="highlight-img-box">
              <img
                src="images/hoi-nghi-chuyen-de.jpg"
                alt="Hội nghị chuyên đề phòng chống ma túy học đường tại THCS Lân Phong"
                className="highlight-img"
              />
              <span className="highlight-tag">THỰC TIỄN NHÀ TRƯỜNG</span>
            </div>
            <div className="highlight-info-box">
              <span className="badge badge-soft">Chuyên đề học đường 2026</span>
              <h2>Hội Nghị Chuyên Đề: Xây Dựng Trường Học Không Ma Túy Tại {SITE.school}</h2>
              <p>
                Nhà trường chủ động phối hợp cùng lực lượng chức năng, ban đại diện cha mẹ học sinh và các thầy cô giáo tổ chức các buổi hội nghị, tọa đàm phổ biến pháp luật và trang bị bộ kỹ năng xử lý tình huống cho học sinh.
              </p>
              <div className="highlight-meta">
                <span>📍 Địa điểm: Trường THCS Lân Phong</span>
                <span>🛡️ Mục tiêu: Trường học an toàn - Học sinh khỏe mạnh</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Cổng Thông Tin Tỉnh & Chính Phủ */}
        <section className="news-section" id="cong-thong-tin">
          <div className="section-head">
            <h2>
              <span>🏛️</span> Cổng Thông Tin Tỉnh Quảng Ngãi & Các Cơ Quan Nhà Nước
            </h2>
            <p className="desc">
              Kênh thông tin chính thống của cơ quan quản lý nhà nước và lực lượng chức năng:
            </p>
          </div>

          <div className="portals-grid">
            {GOV_PORTALS.map((portal) => (
              <div key={portal.url} className="portal-card">
                <div>
                  <div className="portal-header">
                    <span className="badge badge-soft">{portal.badge}</span>
                    <span className="portal-icon">
                      {portal.icon === 'landmark' && '🏛️'}
                      {portal.icon === 'newspaper' && '📰'}
                      {portal.icon === 'shield' && '🛡️'}
                      {portal.icon === 'rss' && '📡'}
                      {portal.icon === 'graduation-cap' && '🎓'}
                    </span>
                  </div>
                  <h3>{portal.title}</h3>
                  <span className="portal-agency">{portal.agency}</span>
                  <p className="portal-desc">{portal.desc}</p>
                </div>

                <a className="btn btn-paper btn-sm" href={portal.url} target="_blank" rel="noreferrer">
                  Truy cập cổng ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Kho Tư Liệu Số & Hotline Pages */}
        <section className="news-section" id="kho-tu-lieu">
          <div className="section-head">
            <h2>
              <span>📁</span> Kho Tư Liệu Số & Hotline Pages Tuyên Truyền
            </h2>
            <p className="desc">
              Các liên kết tài liệu truyền thông, infographic và cẩm nang số chính thức:
            </p>
          </div>

          <div className="hotline-pages-grid">
            {HOTLINE_PAGES.map((page) => (
              <div key={page.url} className="page-link-card">
                <div className="page-card-top">
                  <div className="page-badge-row">
                    <span className="page-badge">{page.badge}</span>
                    <span className="page-icon">
                      {page.icon === 'landmark' && '🏛️'}
                      {page.icon === 'folder-open' && '📁'}
                      {page.icon === 'shield-heart' && '🛡️'}
                      {page.icon === 'book-open' && '📖'}
                    </span>
                  </div>
                  <h3>{page.title}</h3>
                  <p>{page.desc}</p>
                </div>

                <a className="btn btn-paper" href={page.url} target="_blank" rel="noreferrer">
                  Mở trang tài liệu ↗
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Bài Báo & Tin Tức Tuyên Truyền */}
        <section className="news-section" id="bai-bao">
          <div className="section-head">
            <h2>
              <span>📰</span> Bài Báo & Chuyên Đề Cảnh Báo Ma Túy Học Đường
            </h2>
            <p className="desc">
              Tin tức chọn lọc từ các báo đài uy tín, phân tích chiêu thức ngụy trang mới và giải pháp phòng ngừa:
            </p>
          </div>

          {/* Filter tabs */}
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`tab-btn ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="articles-list">
            {filteredArticles.map((art) => (
              <article key={art.id} className="article-card">
                <div className="article-meta">
                  <span className={`pill pill-${art.badgeColor || 'sun'}`} style={{ fontSize: '0.8rem', padding: '0.15rem 0.65rem' }}>
                    {art.category}
                  </span>
                  <span>📅 {art.date}</span>
                  <span>•</span>
                  <span>Nguồn: <strong>{art.source}</strong></span>
                </div>

                <h3 className="article-title">{art.title}</h3>
                <p className="article-summary">{art.summary}</p>

                {art.highlights && (
                  <div className="article-highlights">
                    <h5>Điểm cốt lõi học sinh cần nhớ:</h5>
                    <ul>
                      {art.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="article-actions">
                  <span style={{ fontSize: '0.88rem', color: 'var(--ink-soft)' }}>
                    Xuất bản phục vụ công tác tuyên truyền tại {SITE.school}
                  </span>
                  <a className="btn btn-paper btn-sm" href={art.url} target="_blank" rel="noreferrer">
                    Đọc trên nguồn gốc ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <HelpStrip />
      </main>
      <SiteFooter />
    </>
  );
}
