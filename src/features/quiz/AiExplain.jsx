// Nút "Hỏi Khiên" – gọi AI giải thích sâu hơn, có hủy khi rời câu hỏi.
import { useEffect, useRef, useState } from 'react';
import { explainAnswer } from '@/lib/api.js';

export default function AiExplain({ q, chosenIndex, grade }) {
  const [state, setState] = useState({ status: 'idle' });
  const ctrlRef = useRef(null);

  useEffect(() => () => ctrlRef.current?.abort(), []);

  const ask = async () => {
    ctrlRef.current?.abort();
    const ctrl = new AbortController();
    ctrlRef.current = ctrl;
    setState({ status: 'loading' });
    try {
      const text = await explainAnswer(
        { question: q.question, options: q.options, answerIndex: q.answerIndex, chosenIndex, grade },
        { signal: ctrl.signal },
      );
      setState({ status: 'done', text });
    } catch (err) {
      if (err.name !== 'AbortError') setState({ status: 'error', message: err.message });
    }
  };

  if (state.status === 'done') {
    return (
      <div className="ai-bubble" aria-live="polite">
        <span className="ai-name">Khiên giải thích</span>
        <p>{state.text}</p>
      </div>
    );
  }

  return (
    <div className="ai-ask">
      <button type="button" className="btn btn-ghost btn-sm" onClick={ask} disabled={state.status === 'loading'}>
        {state.status === 'loading' ? 'Khiên đang suy nghĩ…' : 'Hỏi Khiên: vì sao vậy?'}
      </button>
      {state.status === 'error' && <p className="form-error">{state.message}</p>}
    </div>
  );
}
