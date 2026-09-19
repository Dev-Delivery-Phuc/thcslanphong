import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import HelpStrip from '@/components/HelpStrip.jsx';
import SetGrid from '@/components/SetGrid.jsx';
import { BUILTIN_SETS } from '@/content/questions/index.js';
import { useSavedSets } from '@/lib/storage.js';

export default function GamesPage() {
  const saved = useSavedSets();
  return (
    <>
      <SiteHeader current="tro-choi" />
      <main className="page">
        <h1 className="display-lg">Trò chơi củng cố</h1>
        <p className="lead">Chọn bộ câu hỏi, rồi chọn chơi 5, 10, 15, 20 câu hoặc tất cả.</p>
        <section className="home-section">
          <SetGrid sets={BUILTIN_SETS} />
        </section>
        {saved.length > 0 && (
          <section className="home-section">
            <h2 className="display-sm">Bộ câu hỏi thầy cô soạn trên máy này</h2>
            <SetGrid sets={saved} />
          </section>
        )}
        <HelpStrip />
      </main>
      <SiteFooter />
    </>
  );
}
