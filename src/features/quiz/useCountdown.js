// Đếm ngược bằng requestAnimationFrame + performance.now(): mượt, không trôi giờ như setInterval.
// Thanh thời gian cập nhật trực tiếp qua ref (không re-render 60 lần/giây); state chỉ đổi khi sang giây mới.
import { useCallback, useEffect, useRef, useState } from 'react';

export function useCountdown({ durationMs, running, barRef, onExpire }) {
  const [seconds, setSeconds] = useState(Math.ceil(durationMs / 1000));
  const elapsedRef = useRef(0);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!running) return undefined;
    let raf = 0;
    const start = performance.now() - elapsedRef.current;

    const tick = (now) => {
      elapsedRef.current = Math.min(durationMs, now - start);
      const left = durationMs - elapsedRef.current;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${left / durationMs})`;
        barRef.current.dataset.low = left < durationMs * 0.3 ? 'true' : 'false';
      }
      setSeconds(Math.ceil(left / 1000));
      if (left <= 0) {
        onExpireRef.current?.();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, durationMs, barRef]);

  const remainingMs = useCallback(() => Math.max(0, durationMs - elapsedRef.current), [durationMs]);
  return { seconds, remainingMs };
}
