// Hash router tối giản, không cần thư viện.
// Tuyến đường: #/  #/bai-giang/:n  #/tro-choi  #/choi/:setId?mode=class&n=10  #/s/:code  #/giao-vien
import { useSyncExternalStore } from 'react';

const subscribe = (cb) => {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
};
const getHash = () => window.location.hash.slice(1) || '/';

export function useRoute() {
  const hash = useSyncExternalStore(subscribe, getHash);
  const [path, query = ''] = hash.split('?');
  return { path, parts: path.split('/').filter(Boolean), query: new URLSearchParams(query) };
}

/** Đổi trang không tạo thêm mục lịch sử (dùng khi lật slide). */
export const replaceRoute = (to) => window.location.replace(`#${to}`);

export const routes = {
  home: '#/',
  lesson: (n = 1) => `#/bai-giang/${n}`,
  games: '#/tro-choi',
  play: (setId, { mode, count } = {}) => {
    const q = new URLSearchParams();
    if (mode === 'class') q.set('mode', 'class');
    if (count) q.set('n', String(count));
    const qs = q.toString();
    return `#/choi/${setId}${qs ? `?${qs}` : ''}`;
  },
  teacher: '#/giao-vien',
};

// Ghi nhớ trang trước trong phạm vi web, không dựa vào history.back()
// (khi web nằm trong khung nhúng, history.back() có thể làm trang bên ngoài điều hướng).
let currentHash = getHash();
let previousHash = null;
window.addEventListener('hashchange', () => {
  previousHash = currentHash;
  currentHash = getHash();
});

/** Nút "Quay lại": về trang trước nếu có, không thì dùng href mặc định của thẻ <a>. */
export function goBack(event) {
  if (previousHash && previousHash !== getHash()) {
    event.preventDefault();
    window.location.hash = previousHash;
  }
}
