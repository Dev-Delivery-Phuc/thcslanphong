// Các kiểu slide nội dung. Dữ liệu nằm ở src/content/lesson.js.
import { useEffect, useState } from 'react';
import Mascot from '@/components/Mascot.jsx';
import SetGrid from '@/components/SetGrid.jsx';
import { BUILTIN_SETS } from '@/content/questions/index.js';

export function StorySlide({ slide }) {
  const [picked, setPicked] = useState(null);
  const choice = picked === null ? null : slide.choices[picked];

  // Phím 1–3 để chọn nhanh khi trình chiếu
  useEffect(() => {
    const onKey = (e) => {
      const n = Number(e.key);
      if (picked === null && n >= 1 && n <= slide.choices.length) setPicked(n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picked, slide.choices.length]);

  return (
    <div className="slide-story">
      <h2 className="slide-title">{slide.title}</h2>
      <div className="story-lines">
        {slide.lines.map((line, i) => (
          <p key={line} className="story-line" style={{ '--i': i }}>
            {line}
          </p>
        ))}
      </div>

      <div className="story-ask" style={{ '--i': slide.lines.length }}>
        <p className="story-question">{slide.question}</p>
        <div className="story-choices">
          {slide.choices.map((c, i) => {
            const state = picked === null ? '' : c.good ? 'is-good' : i === picked ? 'is-bad' : 'is-dim';
            return (
              <button
                key={c.text}
                type="button"
                className={`story-choice ${state}`}
                onClick={() => setPicked(i)}
                disabled={picked !== null}
              >
                <span className="story-choice-num" aria-hidden="true">
                  {i + 1}
                </span>
                {c.text}
              </button>
            );
          })}
        </div>
      </div>

      {choice && (
        <div className={`story-reply ${choice.good ? 'is-good' : 'is-bad'}`} role="status">
          <Mascot size={70} mood={choice.good ? 'wow' : 'oops'} />
          <div>
            <p className="story-reply-title">{choice.reply}</p>
            <p>{slide.fact}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function GoalsSlide({ slide }) {
  return (
    <div className="slide-goals">
      <h2 className="slide-title">{slide.title}</h2>
      <ul className="goal-list">
        {slide.goals.map((g) => (
          <li key={g.text}>
            <span className="goal-icon" aria-hidden="true">
              {g.icon}
            </span>
            {g.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConceptSlide({ slide }) {
  return (
    <div className="slide-concept">
      <h2 className="slide-title">{slide.title}</h2>
      <blockquote className="definition">{slide.definition}</blockquote>
      <p className="slide-lead">{slide.note}</p>
      <p className="chips-title">{slide.chipsTitle}</p>
      <ul className="type-chips">
        {slide.chips.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export function CardsSlide({ slide }) {
  return (
    <div className="slide-cards">
      <h2 className="slide-title">{slide.title}</h2>
      {slide.lead && <p className="slide-lead">{slide.lead}</p>}
      <ul className="lesson-cards" data-count={slide.cards.length}>
        {slide.cards.map((c) => (
          <li key={c.title} className="lesson-card">
            <span className="lesson-card-icon" aria-hidden="true">
              {c.icon}
            </span>
            <p className="lesson-card-title">{c.title}</p>
            <p>{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ColumnsSlide({ slide }) {
  return (
    <div className="slide-columns">
      <h2 className="slide-title">{slide.title}</h2>
      <div className="impact-columns">
        {slide.columns.map((col, i) => (
          <section key={col.title} className={`impact-col tone-${i}`}>
            <h3>{col.title}</h3>
            <ul>
              {col.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

export function StepsSlide({ slide }) {
  return (
    <div className="slide-steps">
      <h2 className="slide-title">{slide.title}</h2>
      <ol className="step-list">
        {slide.steps.map((s, i) => (
          <li key={s.title}>
            <span className="step-num" aria-hidden="true">
              {i + 1}
            </span>
            <p className="step-title">{s.title}</p>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function QuizSlide({ slide }) {
  return (
    <div className="slide-quiz">
      <h2 className="slide-title">{slide.title}</h2>
      <p className="slide-lead">{slide.lead}</p>
      <SetGrid sets={BUILTIN_SETS} mode="class" />
    </div>
  );
}
