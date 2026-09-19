import { useState } from 'react';
import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import Mascot from '@/components/Mascot.jsx';
import { SITE, SCHOOL_HOTLINES, HOTLINES, HOTLINE_PAGES } from '@/config/site.js';
import { routes } from '@/lib/router.js';

export default function HotlinePage() {
  const [sent, setSent] = useState(false);
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSent(true);
  };

  return (
    <>
      <SiteHeader current="duong-day-nong" />
      <main className="page hotline-page">
        {/* Banner Hero */}
        <section className="hotline-hero">
          <div className="hotline-hero-header">
            <div className="hotline-hero-content">
              <span className="pill pill-coral">
                <span role="img" aria-label="shield">🛡️</span> KÊNH HỖ TRỢ & BẢO MẬT DANH TÍNH
              </span>
              <h1>Đường Dây Nóng & Kênh Hỗ Trợ Khẩn Cấp</h1>
              <p className="lead">
                Dành riêng cho học sinh, phụ huynh và thầy cô {SITE.school}. Nếu em hoặc bạn bè đang gặp nguy cơ, bị dụ dỗ, đe dọa hoặc có bất kỳ băn khoăn nào về tệ nạn ma túy học đường, hãy liên hệ ngay với thầy cô bên dưới.
              </p>
            </div>
            <div className="hotline-mascot-box">
              <Mascot size={75} mood="happy" />
              <div className="hotline-mascot-speech">
                “Đừng giữ một mình em nhé!
                <br />
                Thầy cô luôn ở bên lắng nghe và bảo vệ em.”
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Đường Dây Nóng Trường THCS Lân Phong */}
        <section className="hotline-section" id="truong-lan-phong">
          <div className="section-head">
            <h2>
              <span>📞</span> Đường Dây Nóng Trường THCS Lân Phong
            </h2>
            <p className="desc">
              Cán bộ giáo viên tiếp nhận thông tin trực tiếp 24/7. Mọi cuộc gọi và tin nhắn đều được bảo mật tuyệt đối.
            </p>
          </div>

          <div className="school-hotline-grid">
            {SCHOOL_HOTLINES.map((item, idx) => (
              <div key={item.rawPhone} className="teacher-card">
                <div>
                  <div className="teacher-card-top">
                    <div className={`teacher-avatar ${item.avatarIcon === 'user-female' ? 'female' : 'male'}`}>
                      {item.avatarIcon === 'user-female' ? '👩‍🏫' : '👨‍🏫'}
                    </div>
                    <div className="teacher-info">
                      <h3>{item.name}</h3>
                      <span className="teacher-role">{item.role}</span>
                      <p className="teacher-note">{item.note}</p>
                    </div>
                  </div>

                  <div className="phone-display-box" style={{ marginTop: '1.25rem' }}>
                    <span className="phone-label">Số điện thoại đường dây nóng</span>
                    <span className="phone-number-big">{item.phone}</span>
                  </div>
                </div>

                <div className="teacher-card-actions">
                  <a className="btn btn-sun" href={`tel:${item.rawPhone}`}>
                    <span>📞</span> Gọi điện ngay
                  </a>
                  <a
                    className="btn btn-paper"
                    href={`https://zalo.me/${item.rawPhone}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>💬</span> Nhắn Zalo / SMS
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Cam kết an toàn */}
          <div className="safety-guarantee-box">
            <div className="guarantee-icon">🛡️</div>
            <div className="guarantee-text">
              <h4>Cam kết an toàn và giữ kín danh tính 100%</h4>
              <p>
                Ban Giám hiệu và Ban Tư vấn tâm lý {SITE.school} cam kết bảo vệ thông tin người phản ánh. Các em học sinh hoàn toàn có thể yên tâm chia sẻ mà không sợ bị trừng phạt hay lộ danh tính.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Đường Dây Nóng Cứu Trợ Quốc Gia */}
        <section className="hotline-section" id="quoc-gia">
          <div className="section-head">
            <h2>
              <span>🚨</span> Đường Dây Nóng Khẩn Cấp Quốc Gia
            </h2>
            <p className="desc">Liên hệ ngay khi gặp nguy hiểm tính mạng hoặc phát hiện tội phạm hình sự:</p>
          </div>

          <div className="national-hotline-grid">
            <div className="national-card">
              <div className="national-card-left">
                <div className="national-num-badge">111</div>
                <div className="national-info">
                  <h4>Tổng đài Quốc gia Bảo vệ Trẻ em</h4>
                  <p>Miễn phí cuộc gọi 24/7, tư vấn tâm lý, can thiệp khẩn cấp trẻ em bị bạo hành, dụ dỗ.</p>
                </div>
              </div>
              <a className="btn btn-coral" href="tel:111">
                Gọi 111
              </a>
            </div>

            <div className="national-card">
              <div className="national-card-left">
                <div className="national-num-badge blue">113</div>
                <div className="national-info">
                  <h4>Lực lượng Cảnh sát Phản ứng Nhanh</h4>
                  <p>Tiếp nhận tin báo tội phạm ma túy, an ninh trật tự, can thiệp nguy cấp tức thời.</p>
                </div>
              </div>
              <a className="btn btn-paper" href="tel:113">
                Gọi 113
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: Cổng Thông Tin & Các Trang Liên Kết (Hotline Pages) */}
        <section className="hotline-section" id="tai-lieu-lien-ket">
          <div className="section-head">
            <h2>
              <span>🌐</span> Cổng Thông Tin & Kênh Tuyên Truyền Liên Kết
            </h2>
            <p className="desc">
              Các trang tài liệu số, cẩm nang phòng ngừa ma túy và cổng thông tin chính thống:
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

                <div>
                  <a
                    className="btn btn-paper"
                    href={page.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Mở liên kết</span> ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Hướng dẫn kỹ năng học sinh (Quy tắc 4 KHÔNG & 3 BƯỚC BẢO VỆ) */}
        <section className="guidance-box">
          <div className="section-head" style={{ marginBottom: '1rem' }}>
            <h2 style={{ color: '#86198f' }}>
              <span>💡</span> Cẩm Nang Nhắc Nhở: Quy Tắc 4 KHÔNG & 3 BƯỚC BẢO VỆ
            </h2>
            <p className="desc">Dành cho mọi học sinh THCS Lân Phong ghi nhớ khi bước ra ngoài xã hội:</p>
          </div>

          <div className="guidance-grid">
            <div className="guidance-card">
              <div className="guidance-card-header">
                <span>1️⃣</span> KHÔNG THỬ DÙ CHỈ 1 LẦN
              </div>
              <p>
                Tuyệt đối không dùng thử bánh kẹo, nước uống lạ, thuốc lá điện tử (Pod Chill) hay các chất không rõ nguồn gốc.
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-card-header">
                <span>2️⃣</span> KHÔNG CẦM GIÚP ĐỒ VẬT LẠ
              </div>
              <p>
                Không nhận giữ hộ đồ vật, bọc hàng kín từ người lạ ở cổng trường, bến xe, quán internet hay qua mạng xã hội.
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-card-header">
                <span>3️⃣</span> KHÔNG RỦ RÊ, LÔI KÉO
              </div>
              <p>
                Nói KHÔNG dứt khoát khi có người rủ rê. Khuyên nhủ và giúp đỡ bạn bè cùng tránh xa các tụ điểm xấu.
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-card-header">
                <span>4️⃣</span> BÁO NGAY THẦY CÔ & CÔNG AN
              </div>
              <p>
                Khi phát hiện dấu hiệu nghi vấn, hãy gọi ngay cô Điệp (0935 362 946) hoặc thầy Duy (037 989 8198).
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Hòm thư phản ánh ẩn danh */}
        <section className="feedback-box">
          <div className="section-head" style={{ marginBottom: '1rem' }}>
            <h2>
              <span>✉️</span> Hòm Thư Phản Ánh & Tâm Sự Bí Mật
            </h2>
            <p className="desc">
              Nếu em ngại gọi điện thoại trực tiếp, hãy gửi nội dung vào đây. Tin nhắn này được gửi đến ban tư vấn tâm lý trường.
            </p>
          </div>

          {sent ? (
            <div className="form-success" style={{ background: '#ecfdf5', border: '2px solid var(--green-deep)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <h3 style={{ font: '800 1.3rem var(--font-display)', color: 'var(--green-deep)', marginBottom: '0.4rem' }}>
                Đã gửi thông điệp thành công!
              </h3>
              <p style={{ color: '#064e3b', margin: '0 0 1rem' }}>
                Cảm ơn em đã dũng cảm chia sẻ. Thầy cô sẽ tiếp nhận và có biện pháp hỗ trợ, bảo vệ em kịp thời.
              </p>
              <button
                type="button"
                className="btn btn-paper btn-sm"
                onClick={() => {
                  setSent(false);
                  setContent('');
                }}
              >
                Gửi thông tin khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="feedback-form">
              <label className="field">
                <span>Khối lớp (tùy chọn):</span>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <option value="">Giữ bí mật / Ẩn danh</option>
                  <option value="6">Học sinh Khối 6</option>
                  <option value="7">Học sinh Khối 7</option>
                  <option value="8">Học sinh Khối 8</option>
                  <option value="9">Học sinh Khối 9</option>
                  <option value="ph">Phụ huynh học sinh</option>
                </select>
              </label>

              <label className="field">
                <span>Nội dung phản ánh, thắc mắc hoặc cần giúp đỡ:</span>
                <textarea
                  rows="4"
                  required
                  placeholder="Hãy chia sẻ điều em đang lo lắng hoặc thông tin em muốn báo cho thầy cô..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>

              <div>
                <button type="submit" className="btn btn-sun">
                  <span>Gửi tin nhắn bí mật</span> 🚀
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
