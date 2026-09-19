// Thư viện: bộ của thầy cô + ngân hàng có sẵn. Chiếu cho cả lớp, chép link gửi học sinh, sửa, xóa.
import { useState } from 'react';
import { TOPIC_SETS } from '@/content/questions/index.js';
import { deleteSet, useSavedSets } from '@/lib/storage.js';
import { encodeSet, shareUrl } from '@/lib/share.js';
import { routes } from '@/lib/router.js';

function SetRow({ set, onEdit, onToast }) {
  const [link, setLink] = useState('');
  const [confirming, setConfirming] = useState(false);
  const isBuiltin = set.source === 'builtin';

  const copyLink = async () => {
    const url = shareUrl(await encodeSet(set));
    try {
      await navigator.clipboard.writeText(url);
      onToast('Đã chép link. Dán vào nhóm Zalo/Messenger của lớp nhé.');
    } catch {
      setLink(url); // Trình duyệt chặn clipboard: hiện link để thầy cô tự chép
    }
  };

  return (
    <li className="set-row">
      <div className="set-row-info">
        <p className="set-row-title">
          {set.title}
          {isBuiltin && <span className="badge badge-soft">Có sẵn</span>}
          {set.source === 'ai' && <span className="badge badge-violet">AI</span>}
        </p>
        <p className="muted">
          {set.questions.length} câu, lớp {set.grade}
        </p>
      </div>
      <div className="set-row-actions">
        <a className="btn btn-sun btn-sm" href={routes.play(set.id, { mode: 'class' })}>
          Chiếu cho cả lớp
        </a>
        <button type="button" className="btn btn-paper btn-sm" onClick={copyLink}>
          Chép link cho học sinh
        </button>
        <button type="button" className="btn-text" onClick={() => onEdit(set)}>
          {isBuiltin ? 'Sửa bản sao' : 'Sửa'}
        </button>
        {!isBuiltin &&
          (confirming ? (
            <span className="confirm">
              Xóa hẳn?
              <button
                type="button"
                className="btn-text danger"
                onClick={() => {
                  deleteSet(set.id);
                  onToast(`Đã xóa “${set.title}”.`);
                }}
              >
                Xóa
              </button>
              <button type="button" className="btn-text" onClick={() => setConfirming(false)}>
                Giữ lại
              </button>
            </span>
          ) : (
            <button type="button" className="btn-text danger" onClick={() => setConfirming(true)}>
              Xóa
            </button>
          ))}
      </div>
      {link && (
        <input className="link-box" readOnly value={link} onFocus={(e) => e.target.select()} aria-label="Link chia sẻ" />
      )}
    </li>
  );
}

export default function Library({ onEdit, onToast }) {
  const saved = useSavedSets();
  return (
    <section className="library">
      <h2 className="display-sm">Bộ câu hỏi của thầy cô</h2>
      {saved.length === 0 ? (
        <p className="empty">Chưa có bộ nào. Tạo bằng AI hoặc bấm “Tạo bộ câu hỏi mới” ở trên, hoặc sửa bản sao từ ngân hàng có sẵn bên dưới.</p>
      ) : (
        <ul className="set-list">
          {saved.map((s) => (
            <SetRow key={s.id} set={s} onEdit={onEdit} onToast={onToast} />
          ))}
        </ul>
      )}
      <h2 className="display-sm">Ngân hàng câu hỏi theo bài giảng</h2>
      <ul className="set-list">
        {TOPIC_SETS.map((s) => (
          <SetRow key={s.id} set={s} onEdit={onEdit} onToast={onToast} />
        ))}
      </ul>
    </section>
  );
}
