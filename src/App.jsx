import { useEffect, useMemo } from 'react';
import { useRoute } from '@/lib/router.js';
import { findSet, useSavedSets } from '@/lib/storage.js';
import HomePage from '@/pages/HomePage.jsx';
import GamesPage from '@/pages/GamesPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage.jsx';
import LessonPage from '@/features/lesson/LessonPage.jsx';
import PlayPage from '@/features/quiz/PlayPage.jsx';
import SharedPlayPage from '@/features/quiz/SharedPlayPage.jsx';
import TeacherPage from '@/features/teacher/TeacherPage.jsx';

function PlayRoute({ setId, mode, count }) {
  const saved = useSavedSets();
  const set = useMemo(() => findSet(setId, saved), [setId, saved]);
  if (!set) return <NotFoundPage />;
  return <PlayPage key={`${setId}-${mode}`} set={set} mode={mode} initialCount={count} />;
}

export default function App() {
  const { path, parts, query } = useRoute();
  const [page, arg] = parts;

  useEffect(() => {
    if (page !== 'bai-giang') window.scrollTo(0, 0);
  }, [path, page]);

  switch (page) {
    case undefined:
      return <HomePage />;
    case 'bai-giang':
      return <LessonPage slideNumber={Number(arg) || 1} />;
    case 'tro-choi':
      return <GamesPage />;
    case 'choi':
      return (
        <PlayRoute setId={arg} mode={query.get('mode') === 'class' ? 'class' : 'solo'} count={query.get('n')} />
      );
    case 's':
      return <SharedPlayPage key={arg} code={arg} />;
    case 'giao-vien':
      return <TeacherPage />;
    default:
      return <NotFoundPage />;
  }
}
