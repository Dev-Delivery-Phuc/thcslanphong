// Học sinh mở link giáo viên gửi: giải mã bất đồng bộ rồi vào chơi.
import { useEffect, useState } from 'react';
import { decodeSet } from '@/lib/share.js';
import { routes } from '@/lib/router.js';
import Mascot from '@/components/Mascot.jsx';
import PlayPage from './PlayPage.jsx';

export default function SharedPlayPage({ code }) {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let alive = true;
    decodeSet(code ?? '')
      .then((set) => alive && setState({ status: 'ok', set }))
      .catch(() => alive && setState({ status: 'error' }));
    return () => {
      alive = false;
    };
  }, [code]);

  if (state.status === 'ok') return <PlayPage set={state.set} mode="solo" />;

  return (
    <main className="ready">
      <Mascot size={100} mood={state.status === 'error' ? 'oops' : 'think'} />
      {state.status === 'error' ? (
        <>
          <h1 className="display-md">Link này bị thiếu hoặc lỗi</h1>
          <p className="lead">Nhờ thầy cô gửi lại link, hoặc chơi bộ câu hỏi có sẵn.</p>
          <a className="btn btn-sun" href={routes.games}>
            Xem bộ câu hỏi có sẵn
          </a>
        </>
      ) : (
        <p className="lead">Đang mở bộ câu hỏi…</p>
      )}
    </main>
  );
}
