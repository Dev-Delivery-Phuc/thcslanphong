// Luồng chơi: màn chuẩn bị (chọn số câu) → từng câu hỏi → kết quả.
import { useCallback, useState } from 'react';
import { DURATION_MS, countOptions, normalizeCount, pickQuestions } from './quizLogic.js';
import QuestionStage from './QuestionStage.jsx';
import ResultView from './ResultView.jsx';
import Mascot from '@/components/Mascot.jsx';
import Segmented from '@/components/Segmented.jsx';
import { getBest } from '@/lib/storage.js';
import { goBack, routes } from '@/lib/router.js';

export default function PlayPage({ set: setProp, mode = 'solo', initialCount }) {
  const [set] = useState(setProp); // chốt dữ liệu lúc vào chơi, không đổi giữa chừng khi tab khác sửa thư viện
  const isClass = mode === 'class';
  const bankSize = set.questions.length;

  const [count, setCount] = useState(() => normalizeCount(initialCount, bankSize));
  const [phase, setPhase] = useState('ready'); // ready | playing | done
  const [round, setRound] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState([]);

  const start = useCallback(() => {
    setQuestions(pickQuestions(set.questions, count));
    setResults([]);
    setIndex(0);
    setRound((r) => r + 1);
    setPhase('playing');
  }, [set.questions, count]);

  const handleNext = useCallback(
    (outcome) => {
      setResults((prev) => (prev.length > index ? prev : [...prev, outcome]));
      if (index + 1 >= questions.length) setPhase('done');
      else setIndex(index + 1);
    },
    [index, questions.length],
  );

  const score = results.reduce((s, r) => s + r.points, 0);
  let streak = 0;
  for (let i = results.length - 1; i >= 0 && results[i].correct; i--) streak++;

  if (phase === 'playing') {
    return (
      <QuestionStage
        key={`${round}-${index}`}
        q={questions[index]}
        number={index + 1}
        total={questions.length}
        mode={mode}
        durationMs={DURATION_MS[mode]}
        streak={streak}
        score={score}
        grade={set.grade}
        onNext={handleNext}
      />
    );
  }

  if (phase === 'done') {
    return (
      <ResultView
        set={set}
        questions={questions}
        results={results}
        mode={mode}
        onReplay={start}
        onChangeCount={() => setPhase('ready')}
      />
    );
  }

  const best = isClass ? 0 : getBest(set.id, count);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  return (
    <main className="ready">
      <a className="back-link" href={routes.games} onClick={goBack}>
        ‹ Quay lại
      </a>
      <Mascot size={100} mood="happy" />
      <h1 className="display-lg">{set.title}</h1>
      <p className="lead">
        Ngân hàng có {bankSize} câu. Mỗi lượt rút ngẫu nhiên, {DURATION_MS[mode] / 1000} giây cho mỗi câu.
      </p>

      <div className="ready-panel">
        <Segmented
          legend="Chơi bao nhiêu câu?"
          name="count"
          options={countOptions(bankSize)}
          value={count}
          onChange={setCount}
        />
        {best > 0 && <p className="muted">Kỷ lục của bạn với {count} câu: {best} điểm</p>}
      </div>

      {isClass ? (
        <p className="ready-note">
          Chế độ chiếu cho cả lớp: chữ lớn, không tính điểm. Phím tắt: <kbd>1</kbd>–<kbd>4</kbd> chọn đáp án,{' '}
          <kbd>Space</kbd> hiện đáp án, <kbd>Enter</kbd> sang câu tiếp.
        </p>
      ) : (
        <p className="ready-note">Trả lời càng nhanh càng được nhiều điểm. Đúng liên tiếp sẽ có điểm thưởng!</p>
      )}

      <div className="row-actions">
        <button type="button" className="btn btn-sun btn-lg" onClick={start} autoFocus>
          {isClass ? `Bắt đầu chiếu ${count} câu` : `Bắt đầu ${count} câu`}
        </button>
        {isClass && (
          <button type="button" className="btn btn-paper" onClick={toggleFullscreen}>
            Toàn màn hình
          </button>
        )}
      </div>
    </main>
  );
}
