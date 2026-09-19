// Một câu hỏi: đếm giờ, chọn đáp án, hiện phản hồi. Được key theo số thứ tự nên mỗi câu tự reset state.
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCountdown } from './useCountdown.js';
import { LETTERS, scoreFor } from './quizLogic.js';
import Mascot from '@/components/Mascot.jsx';
import AiExplain from './AiExplain.jsx';
import { goBack, routes } from '@/lib/router.js';

const REVEAL_ONLY = -2; // lớp học: giáo viên bấm "Hiện đáp án"
const TIMEOUT = -1;

export default function QuestionStage({ q, number, total, mode, durationMs, streak, score, grade, onNext }) {
  const isClass = mode === 'class';
  const barRef = useRef(null);
  const [outcome, setOutcome] = useState(null);
  const outcomeRef = useRef(null);

  const { seconds, remainingMs } = useCountdown({
    durationMs,
    running: !outcome,
    barRef,
    onExpire: () => choose(TIMEOUT),
  });

  const choose = useCallback(
    (idx) => {
      if (outcomeRef.current) return;
      const correct = idx === q.answerIndex;
      const next = {
        chosen: idx,
        correct,
        points: isClass ? 0 : scoreFor({ correct, remainingMs: remainingMs(), durationMs, streak }),
      };
      outcomeRef.current = next;
      setOutcome(next);
    },
    [q.answerIndex, isClass, remainingMs, durationMs, streak],
  );

  // Phím tắt: 1–4 / A–D chọn đáp án, Space hiện đáp án (lớp học), Enter sang câu tiếp.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return;
      const key = e.key.toLowerCase();
      const idx = key.length === 1 ? Math.max('1234'.indexOf(key), 'abcd'.indexOf(key)) : -1;
      if (!outcomeRef.current && idx >= 0 && idx < q.options.length) {
        e.preventDefault();
        choose(idx);
      } else if (isClass && key === ' ' && !outcomeRef.current) {
        e.preventDefault();
        choose(REVEAL_ONLY);
      } else if (key === 'enter' && outcomeRef.current && !e.target.closest?.('button')) {
        onNext(outcomeRef.current);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [choose, isClass, onNext, q.options.length]);

  const tileState = (i) => {
    if (!outcome) return '';
    if (i === q.answerIndex) return 'is-correct';
    if (i === outcome.chosen) return 'is-wrong';
    return 'is-dim';
  };

  const feedback = !outcome
    ? null
    : isClass
      ? { tone: 'neutral', mood: 'happy', title: `Đáp án đúng: ${LETTERS[q.answerIndex]}` }
      : outcome.correct
        ? { tone: 'good', mood: 'wow', title: `Chính xác! +${outcome.points}` }
        : outcome.chosen === TIMEOUT
          ? { tone: 'bad', mood: 'oops', title: 'Hết giờ rồi!' }
          : { tone: 'bad', mood: 'oops', title: 'Chưa đúng rồi' };

  return (
    <main className={`stage ${isClass ? 'is-class' : ''}`}>
      <div className="stage-head">
        <a className="exit" href={routes.games} onClick={goBack} aria-label="Thoát trò chơi">
          ✕
        </a>
        <span className="pill">
          Câu {number}/{total}
        </span>
        <div className="timer" aria-label={`Còn ${seconds} giây`}>
          <div className="timer-track">
            <div className="timer-fill" ref={barRef} />
          </div>
          <span className="timer-num" aria-hidden="true">
            {seconds}
          </span>
        </div>
        {!isClass && (
          <span className="pill pill-sun" aria-label={`Điểm ${score + (outcome?.points ?? 0)}`}>
            ★ {score + (outcome?.points ?? 0)}
            {streak >= 2 && <span className="streak">🔥 {streak}</span>}
          </span>
        )}
      </div>

      <h1 className="question">{q.question}</h1>

      <div className="answers" data-count={q.options.length}>
        {q.options.map((opt, i) => {
          const s = tileState(i);
          return (
            <button
              key={i}
              type="button"
              className={`tile tile-${i} ${s}`}
              onClick={() => choose(i)}
              disabled={!!outcome}
            >
              <span className="tile-letter" aria-hidden="true">
                {LETTERS[i]}
              </span>
              <span className="tile-text">{opt}</span>
              {s === 'is-correct' && <span className="tile-mark">✓<span className="sr-only"> đáp án đúng</span></span>}
              {s === 'is-wrong' && <span className="tile-mark">✗<span className="sr-only"> đã chọn</span></span>}
            </button>
          );
        })}
      </div>

      {isClass && !outcome && (
        <div className="class-controls">
          <button type="button" className="btn btn-ink" onClick={() => choose(REVEAL_ONLY)}>
            Hiện đáp án
          </button>
          <span className="hint">Bấm đáp án lớp chọn, hoặc phím Space để hiện đáp án</span>
        </div>
      )}

      {feedback && (
        <section className={`feedback feedback-${feedback.tone}`} role="status" aria-live="polite">
          <Mascot size={64} mood={feedback.mood} className="feedback-mascot" />
          <div className="feedback-body">
            <p className="feedback-title">{feedback.title}</p>
            {!isClass && !outcome.correct && (
              <p className="feedback-answer">
                Đáp án đúng: <strong>{q.options[q.answerIndex]}</strong>
              </p>
            )}
            {q.explanation && <p className="feedback-explain">{q.explanation}</p>}
            {!isClass && <AiExplain q={q} chosenIndex={outcome.chosen} grade={grade} />}
          </div>
          <button type="button" className="btn btn-sun feedback-next" onClick={() => onNext(outcome)} autoFocus>
            {number === total ? 'Xem kết quả' : 'Câu tiếp theo'}
          </button>
        </section>
      )}
    </main>
  );
}
