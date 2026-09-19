import { HOTLINES } from '@/config/site.js';

export default function HelpStrip() {
  const [child, police] = HOTLINES;
  return (
    <aside className="help-strip">
      <p>
        <strong>Em đang lo lắng cho bản thân hay một người bạn?</strong> Hãy nói với thầy cô, cha mẹ, hoặc gọi{' '}
        <a href={`tel:${child.number}`}>{child.number}</a> ({child.label}). Khi gặp nguy hiểm tức thời, gọi{' '}
        <a href={`tel:${police.number}`}>{police.number}</a>.
      </p>
    </aside>
  );
}
