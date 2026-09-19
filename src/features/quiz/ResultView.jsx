import { useEffect, useMemo, useState } from 'react';
import { rankFor } from './quizLogic.js';
import { recordBest } from '@/lib/storage.js';
import { routes } from '@/lib/router.js';
import Mascot from '@/components/Mascot.jsx';
import HelpStrip from '@/components/HelpStrip.jsx';

export default function ResultView({ set, questions, results, mode, onReplay, onChangeCount }) {
  const isClass = mode === 'class';
  const total = questions.length;
  const correct = results.filter((r) => r.correct).length;
  const score = results.reduce((sum, r) => sum + r.points, 0);
  const rank = rankFor(correct / total);
  const [isBest, setIsBest] = useState(false);

  useEffect(() => {
    if (!isClass) setIsBest(recordBest(set.id, total, score));
  }, [isClass, set.id, total, score]);

  const toReview = useMemo(
    () => questions.map((q, i) => ({ q, r: results[i] })).filter(({ r }) => isClass || !r?.correct),
    [questions, results, isClass],
  );

  return (
    <main className="result">
      <section className="result-hero">
        <Mascot size={120} mood={isClass || rank.stars >= 2 ? 'wow' : 'happy'} />
        {isClass ? (
          <div>
            <h1 className="display-md">Cả lớp đã hoàn thành {total} câu!</h1>
            <p className="lead">Cùng điểm lại những ý chính của bài học hôm nay.</p>
          </div>
        ) : (
          <div>
            <div className="stars" aria-label={`${rank.stars} trên 3 sao`}>
              {[0, 1, 2].map((i) => (
                <span key={i} className={`star ${i < rank.stars ? 'on' : ''}`} style={{ '--i': i }} aria-hidden="true">
                  ★
                </span>
              ))}
            </div>
            <h1 className="display-md">{rank.name}</h1>
            <p className="lead">{rank.line}</p>
            <div className="result-stats">
              <p>
                <span className="stat-num">{score}</span> điểm
                {isBest && <span className="badge">Kỷ lục mới</span>}
              </p>
              <p>
                <span className="stat-num">
                  {correct}/{total}
                </span>{' '}
                câu đúng
              </p>
            </div>
          </div>
        )}
      </section>

      <div className="row-actions">
        <button type="button" className="btn btn-sun" onClick={onReplay}>
          Chơi lại {total} câu mới
        </button>
        <button type="button" className="btn btn-paper" onClick={onChangeCount}>
          Đổi số câu
        </button>
        <a className="btn-text" href={routes.games}>
          Chọn bộ câu hỏi khác
        </a>
      </div>

      {toReview.length > 0 && (
        <section className="review">
          <h2 className="display-sm">{isClass ? 'Ý chính cần nhớ' : 'Xem lại câu chưa đúng'}</h2>
          <ul className="review-list">
            {toReview.map(({ q }) => (
              <li key={q.question}>
                <p className="review-q">{q.question}</p>
                <p className="review-a">✓ {q.options[q.answerIndex]}</p>
                {q.explanation && <p className="review-e">{q.explanation}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <HelpStrip />
    </main>
  );
}
