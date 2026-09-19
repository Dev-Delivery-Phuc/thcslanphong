import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import HelpStrip from '@/components/HelpStrip.jsx';
import Mascot from '@/components/Mascot.jsx';
import SetGrid from '@/components/SetGrid.jsx';
import { SITE } from '@/config/site.js';
import { LESSON_SLIDES } from '@/content/lesson.js';
import { BUILTIN_SETS } from '@/content/questions/index.js';
import { routes } from '@/lib/router.js';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
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
              Bài giảng trình chiếu, trò chơi củng cố kiến thức và tài liệu tham khảo cho học sinh và thầy cô.
            </p>
            <div className="row-actions hero-actions">
              <a className="btn btn-sun btn-lg" href={routes.lesson(1)}>
                Vào bài giảng
              </a>
              <a className="btn btn-paper btn-lg" href={routes.games}>
                Chơi trò chơi
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <Mascot size={210} mood="happy" />
            <span className="sticker sticker-a">Nói KHÔNG!</span>
            <span className="sticker sticker-b">+200</span>
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
