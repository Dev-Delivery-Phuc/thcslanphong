// Lưới chọn bộ câu hỏi (trang chủ, trang trò chơi, slide củng cố).
import { routes } from '@/lib/router.js';

const TILE_COLORS = ['var(--opt-a)', 'var(--opt-b)', 'var(--opt-c)', 'var(--opt-d)'];

export default function SetGrid({ sets, mode }) {
  return (
    <ul className="set-grid">
      {sets.map((s, i) => (
        <li key={s.id}>
          <a className="set-tile" href={routes.play(s.id, { mode })} style={{ '--tile': TILE_COLORS[i % 4] }}>
            <span className="set-tile-title">{s.title}</span>
            {s.description && <span className="set-tile-desc">{s.description}</span>}
            <span className="set-tile-meta">{s.questions.length} câu trong ngân hàng</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
