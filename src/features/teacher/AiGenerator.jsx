// Form tạo câu hỏi bằng Gemini (qua /api/quiz). Có hủy yêu cầu và xử lý mã giáo viên.
import { useEffect, useRef, useState } from 'react';
import { generateQuiz, getTeacherCode, setTeacherCode } from '@/lib/api.js';
import { newId } from '@/lib/storage.js';
import Segmented from '@/components/Segmented.jsx';

const TOPICS = [
  'Ma túy là gì và các loại thường gặp',
  'Tác hại của ma túy với cơ thể',
  'Hậu quả với bản thân, gia đình, xã hội',
  'Thủ đoạn lôi kéo và ma túy trá hình',
  'Kỹ năng nói KHÔNG và xử lý tình huống',
];
const LEVELS = [
  { value: 'de', label: 'Dễ' },
  { value: 'vua', label: 'Vừa' },
  { value: 'kho', label: 'Khó' },
];

export default function AiGenerator({ onGenerated }) {
  const [form, setForm] = useState({ topic: '', grade: 8, count: 10, difficulty: 'vua' });
  const [status, setStatus] = useState({ state: 'idle' });
  const [code, setCode] = useState(getTeacherCode);
  const ctrlRef = useRef(null);

  useEffect(() => () => ctrlRef.current?.abort(), []);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e?.preventDefault();
    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    setStatus({ state: 'loading' });
    try {
      const topic = form.topic.trim() || TOPICS[0];
      const data = await generateQuiz(
        { topic, grade: Number(form.grade), count: Number(form.count), difficulty: form.difficulty },
        { signal: ctrl.signal },
      );
      setStatus({ state: 'idle' });
      onGenerated({
        id: newId(),
        title: data.title,
        grade: Number(form.grade),
        source: 'ai',
        createdAt: Date.now(),
        questions: data.questions,
      });
    } catch (err) {
      if (err.name === 'AbortError') return setStatus({ state: 'idle' });
      setStatus({ state: 'error', message: err.message, needCode: err.status === 401 });
    }
  };

  const loading = status.state === 'loading';

  return (
    <form className="panel generator" onSubmit={submit} aria-busy={loading}>
      <h2 className="display-sm">Tạo câu hỏi bằng AI</h2>
      <p className="muted">Nhập chủ đề bài giảng. AI soạn nháp, thầy cô xem lại và sửa trước khi dùng cho lớp.</p>

      <label className="field">
        <span>Chủ đề</span>
        <input
          value={form.topic}
          onChange={update('topic')}
          maxLength={200}
          placeholder={TOPICS[0]}
          disabled={loading}
        />
      </label>
      <div className="chips" role="group" aria-label="Chủ đề gợi ý">
        {TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip ${form.topic === t ? 'is-on' : ''}`}
            onClick={() => setForm((f) => ({ ...f, topic: t }))}
            disabled={loading}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="field-row">
        <label className="field">
          <span>Khối lớp</span>
          <select value={form.grade} onChange={update('grade')} disabled={loading}>
            {[6, 7, 8, 9].map((g) => (
              <option key={g} value={g}>
                Lớp {g}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Số câu</span>
          <select value={form.count} onChange={update('count')} disabled={loading}>
            {[5, 8, 10, 12, 15].map((n) => (
              <option key={n} value={n}>
                {n} câu
              </option>
            ))}
          </select>
        </label>
        <Segmented
          legend="Mức độ"
          name="difficulty"
          options={LEVELS}
          value={form.difficulty}
          onChange={(v) => setForm((f) => ({ ...f, difficulty: v }))}
          disabled={loading}
        />
      </div>

      {status.state === 'error' && (
        <div className="form-error" role="alert">
          <p>{status.message}</p>
          {status.needCode && (
            <div className="code-row">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Mã giáo viên"
                aria-label="Mã giáo viên"
              />
              <button
                type="button"
                className="btn btn-ink btn-sm"
                onClick={() => {
                  setTeacherCode(code.trim());
                  submit();
                }}
              >
                Lưu mã và tạo lại
              </button>
            </div>
          )}
        </div>
      )}

      <div className="row-actions">
        <button type="submit" className="btn btn-violet" disabled={loading}>
          {loading ? 'AI đang soạn câu hỏi…' : 'Tạo câu hỏi'}
        </button>
        {loading && (
          <button type="button" className="btn btn-paper" onClick={() => ctrlRef.current?.abort()}>
            Hủy
          </button>
        )}
      </div>

      {loading && (
        <div className="skeleton-list" aria-hidden="true">
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      )}
    </form>
  );
}
