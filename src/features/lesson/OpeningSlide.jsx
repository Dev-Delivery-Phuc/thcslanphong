// Slide mở đầu: tên bài học xuất hiện như những tấm sticker được dán lên bảng, rồi linh vật Khiên chào lớp.
// Đây là khoảnh khắc chuyển động chính của cả web (xem skill student-friendly-ui).
import Mascot from '@/components/Mascot.jsx';
import { SITE } from '@/config/site.js';

const TITLE_LINES = [
  { text: 'Phòng, chống', tone: 'paper' },
  { text: 'ma túy', tone: 'sun' },
  { text: 'học đường', tone: 'mint' },
];

export default function OpeningSlide({ onNext }) {
  return (
    <div className="opening">
      <p className="opening-school">
        <span>{SITE.school}</span>
        <span>{SITE.location}</span>
      </p>

      <h1 className="opening-title" aria-label={TITLE_LINES.map((l) => l.text).join(' ')}>
        {TITLE_LINES.map((line, i) => (
          <span key={line.text} className={`opening-line tone-${line.tone}`} style={{ '--i': i }} aria-hidden="true">
            {line.text}
          </span>
        ))}
      </h1>

      <div className="opening-mascot">
        <Mascot size={96} mood="happy" />
        <p className="speech">Chào cả lớp! Hôm nay chúng mình cùng học cách nói KHÔNG nhé.</p>
      </div>

      <div className="opening-cta">
        <button type="button" className="btn btn-sun btn-lg" onClick={onNext} autoFocus>
          Bắt đầu bài học
        </button>
        <span className="hint">
          hoặc nhấn <kbd>→</kbd>
        </span>
      </div>
    </div>
  );
}
