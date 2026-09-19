// Bài giảng dạng trình chiếu: ←/→, PageUp/PageDown (bút trình chiếu), Space; F để toàn màn hình.
import { useCallback, useEffect } from 'react';
import { LESSON_SLIDES } from '@/content/lesson.js';
import { SITE } from '@/config/site.js';
import { replaceRoute, routes } from '@/lib/router.js';
import OpeningSlide from './OpeningSlide.jsx';
import {
  CardsSlide,
  ColumnsSlide,
  ConceptSlide,
  GoalsSlide,
  QuizSlide,
  StepsSlide,
  StorySlide,
} from './slides.jsx';

const RENDERERS = {
  story: StorySlide,
  goals: GoalsSlide,
  concept: ConceptSlide,
  cards: CardsSlide,
  columns: ColumnsSlide,
  steps: StepsSlide,
  quiz: QuizSlide,
};

const toggleFullscreen = () => {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
};

export default function LessonPage({ slideNumber }) {
  const total = LESSON_SLIDES.length;
  const index = Math.min(Math.max(slideNumber - 1, 0), total - 1);
  const slide = LESSON_SLIDES[index];

  const go = useCallback(
    (i) => {
      if (i >= 0 && i < total) replaceRoute(`/bai-giang/${i + 1}`);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select')) return;
      const onButton = e.target.closest?.('button, a');
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !onButton)) {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, total]);

  const Renderer = RENDERERS[slide.type];

  return (
    <div className="lesson">
      <header className="lesson-bar">
        <a className="lesson-home" href={routes.home}>
          ‹ {SITE.schoolShort}
        </a>
        <span className="lesson-chapter">{slide.nav}</span>
        <button type="button" className="btn btn-paper btn-sm" onClick={toggleFullscreen}>
          Toàn màn hình
        </button>
      </header>

      <main className="lesson-stage">
        <section key={slide.id} className="slide" aria-roledescription="slide" aria-label={`${index + 1} / ${total}`}>
          {slide.type === 'opening' ? <OpeningSlide onNext={() => go(1)} /> : <Renderer slide={slide} />}
        </section>
      </main>

      <footer className="lesson-nav">
        <button type="button" className="btn btn-paper" onClick={() => go(index - 1)} disabled={index === 0}>
          Trước
        </button>
        <ol className="lesson-dots" aria-label="Các phần của bài giảng">
          {LESSON_SLIDES.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                className={i === index ? 'is-on' : ''}
                onClick={() => go(i)}
                aria-label={`${i + 1}. ${s.nav}`}
                aria-current={i === index ? 'step' : undefined}
              />
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-sun" onClick={() => go(index + 1)} disabled={index === total - 1}>
          Tiếp
        </button>
      </footer>
    </div>
  );
}
