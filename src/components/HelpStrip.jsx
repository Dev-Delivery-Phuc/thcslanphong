import { SCHOOL_HOTLINES, HOTLINES } from '@/config/site.js';
import { routes } from '@/lib/router.js';

export default function HelpStrip() {
  const [diep, duy] = SCHOOL_HOTLINES;
  const [child, police] = HOTLINES;

  return (
    <aside className="help-strip">
      <p>
        <strong>Em đang lo lắng cho bản thân hay bạn bè?</strong> Hãy gọi đường dây nóng THCS Lân Phong:{' '}
        <strong>{diep.name}</strong> (<a href={`tel:${diep.rawPhone}`}>{diep.phone}</a>) hoặc{' '}
        <strong>{duy.name}</strong> (<a href={`tel:${duy.rawPhone}`}>{duy.phone}</a>). Quốc gia: Tổng đài trẻ em{' '}
        <a href={`tel:${child.number}`}>{child.number}</a>, Công an <a href={`tel:${police.number}`}>{police.number}</a>.{' '}
        <a href={routes.hotline} style={{ display: 'inline-block', marginLeft: '0.4rem', fontWeight: 800 }}>
          Xem toàn bộ kênh hỗ trợ & tư liệu ↗
        </a>
      </p>
    </aside>
  );
}
