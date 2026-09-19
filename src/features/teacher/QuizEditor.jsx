// Trình sửa bộ câu hỏi: sửa nội dung, chọn đáp án đúng, thêm/xóa câu, kiểm tra trước khi lưu.
import { useMemo, useState } from 'react';
import { LETTERS } from '@/features/quiz/quizLogic.js';

const blankQuestion = () => ({ question: '', options: ['', '', '', ''], answerIndex: 0, explanation: '' });

/** Bộ câu hỏi trống để thầy cô tự soạn từ đầu. */
export const blankSet = (id) => ({ id, title: '', grade: 8, source: 'manual', questions: [blankQuestion()] });
const withKeys = (qs) => qs.map((q) => ({ ...q, _k: q._k ?? Math.random().toString(36).slice(2) }));

function problemsOf(set) {
  const errs = [];
  if (!set.title.trim()) errs.push('Bộ câu hỏi chưa có tên.');
  if (!set.questions.length) errs.push('Cần ít nhất 1 câu hỏi.');
  set.questions.forEach((q, i) => {
    const filled = q.options.filter((o) => o.trim());
    if (!q.question.trim()) errs.push(`Câu ${i + 1}: chưa có nội dung.`);
    if (filled.length < 2) errs.push(`Câu ${i + 1}: cần ít nhất 2 đáp án.`);
    if (!q.options[q.answerIndex]?.trim()) errs.push(`Câu ${i + 1}: đáp án đúng đang để trống.`);
  });
  return errs;
}

export default function QuizEditor({ initial, onSave, onCancel }) {
  const [set, setSet] = useState(() => ({ ...initial, questions: withKeys(initial.questions) }));
  const [showErrors, setShowErrors] = useState(false);
  const errors = useMemo(() => problemsOf(set), [set]);

  const patchQ = (i, patch) =>
    setSet((s) => ({ ...s, questions: s.questions.map((q, j) => (j === i ? { ...q, ...patch } : q)) }));
  const setOption = (i, oi, value) =>
    setSet((s) => ({
      ...s,
      questions: s.questions.map((q, j) =>
        j === i ? { ...q, options: q.options.map((o, k) => (k === oi ? value : o)) } : q,
      ),
    }));
  const removeQ = (i) => setSet((s) => ({ ...s, questions: s.questions.filter((_, j) => j !== i) }));
  const addQ = () => setSet((s) => ({ ...s, questions: [...s.questions, ...withKeys([blankQuestion()])] }));

  const save = () => {
    if (errors.length) return setShowErrors(true);
    const questions = set.questions.map(({ _k, ...q }) => {
      // Bỏ đáp án trống, cập nhật lại vị trí đáp án đúng
      const kept = q.options.map((o, k) => ({ o: o.trim(), k })).filter((x) => x.o);
      return {
        ...q,
        question: q.question.trim(),
        explanation: q.explanation.trim(),
        options: kept.map((x) => x.o),
        answerIndex: kept.findIndex((x) => x.k === q.answerIndex),
      };
    });
    onSave({ ...set, title: set.title.trim(), questions, updatedAt: Date.now() });
  };

  return (
    <section className="editor">
      <div className="editor-head">
        <label className="field grow">
          <span>Tên bộ câu hỏi</span>
          <input
            className="input-title"
            value={set.title}
            maxLength={80}
            placeholder="Ví dụ: Ôn tập phòng, chống ma túy – lớp 8"
            onChange={(e) => setSet((s) => ({ ...s, title: e.target.value }))}
          />
        </label>
        <label className="field">
          <span>Khối lớp</span>
          <select value={set.grade} onChange={(e) => setSet((s) => ({ ...s, grade: Number(e.target.value) }))}>
            {[6, 7, 8, 9].map((g) => (
              <option key={g} value={g}>
                Lớp {g}
              </option>
            ))}
          </select>
        </label>
        <div className="row-actions">
          <button type="button" className="btn btn-paper" onClick={onCancel}>
            Hủy
          </button>
          <button type="button" className="btn btn-sun" onClick={save}>
            Lưu bộ câu hỏi
          </button>
        </div>
      </div>

      {set.source === 'ai' && (
        <p className="note">
          Nội dung do AI soạn nháp. Thầy cô vui lòng đọc lại từng câu, nhất là các thông tin về pháp luật và số liệu.
        </p>
      )}

      {showErrors && errors.length > 0 && (
        <div className="form-error" role="alert">
          <p>Cần sửa {errors.length} chỗ trước khi lưu:</p>
          <ul>
            {errors.slice(0, 6).map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <ol className="edit-list">
        {set.questions.map((q, i) => (
          <li key={q._k} className="edit-card">
            <div className="edit-card-head">
              <span className="pill">Câu {i + 1}</span>
              <button type="button" className="btn-text danger" onClick={() => removeQ(i)}>
                Xóa câu
              </button>
            </div>
            <label className="field">
              <span className="sr-only">Nội dung câu {i + 1}</span>
              <textarea
                rows={2}
                value={q.question}
                maxLength={300}
                placeholder="Nhập câu hỏi"
                onChange={(e) => patchQ(i, { question: e.target.value })}
              />
            </label>
            <div className="edit-options" role="radiogroup" aria-label={`Đáp án đúng của câu ${i + 1}`}>
              {q.options.map((opt, oi) => (
                <div key={oi} className={`edit-option ${q.answerIndex === oi ? 'is-answer' : ''}`}>
                  <label className="answer-radio" title="Đánh dấu là đáp án đúng">
                    <input
                      type="radio"
                      name={`ans-${q._k}`}
                      checked={q.answerIndex === oi}
                      onChange={() => patchQ(i, { answerIndex: oi })}
                    />
                    <span aria-hidden="true">{LETTERS[oi]}</span>
                    <span className="sr-only">Đáp án {LETTERS[oi]} là đáp án đúng</span>
                  </label>
                  <input
                    value={opt}
                    maxLength={160}
                    placeholder={`Đáp án ${LETTERS[oi]}`}
                    aria-label={`Đáp án ${LETTERS[oi]}`}
                    onChange={(e) => setOption(i, oi, e.target.value)}
                  />
                </div>
              ))}
              {q.options.length < 4 && !q.fixed && (
                <button
                  type="button"
                  className="btn-text"
                  onClick={() => patchQ(i, { options: [...q.options, ''] })}
                >
                  + Thêm đáp án
                </button>
              )}
            </div>
            <label className="field">
              <span>Giải thích (hiện sau khi trả lời)</span>
              <textarea
                rows={2}
                value={q.explanation}
                maxLength={400}
                onChange={(e) => patchQ(i, { explanation: e.target.value })}
              />
            </label>
          </li>
        ))}
      </ol>

      <button type="button" className="btn btn-paper" onClick={addQ}>
        + Thêm câu hỏi
      </button>
    </section>
  );
}
