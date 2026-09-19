import { useEffect, useRef, useState } from 'react';
import SiteHeader from '@/components/SiteHeader.jsx';
import SiteFooter from '@/components/SiteFooter.jsx';
import { newId, saveSet } from '@/lib/storage.js';
import AiGenerator from './AiGenerator.jsx';
import QuizEditor, { blankSet } from './QuizEditor.jsx';
import Library from './Library.jsx';

export default function TeacherPage() {
  const [draft, setDraft] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(0);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(''), 3500);
  };

  const edit = (set) => {
    // Bộ có sẵn: tạo bản sao để không sửa dữ liệu gốc
    setDraft(
      set.source === 'builtin' ? { ...set, id: newId(), title: `${set.title} (bản sao)`, source: 'manual' } : set,
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const save = (set) => {
    saveSet(set);
    setDraft(null);
    showToast(`Đã lưu “${set.title}”. Giờ có thể chiếu cho cả lớp hoặc chép link.`);
  };

  return (
    <>
      <SiteHeader current="giao-vien" />
      <main className="page teacher">
        <h1 className="display-lg">Góc thầy cô</h1>
        {draft ? (
          <QuizEditor key={draft.id} initial={draft} onSave={save} onCancel={() => setDraft(null)} />
        ) : (
          <>
            <div className="teacher-intro">
              <p className="lead">
                Tạo câu hỏi bằng AI hoặc tự soạn, rồi chiếu trên máy chiếu hoặc chép link gửi học sinh.
              </p>
              <button type="button" className="btn btn-sun" onClick={() => setDraft(blankSet(newId()))}>
                + Tạo bộ câu hỏi mới
              </button>
            </div>
            <AiGenerator onGenerated={setDraft} />
            <Library onEdit={edit} onToast={showToast} />
          </>
        )}
      </main>
      <SiteFooter />
      <div className={`toast ${toast ? 'is-on' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
