// Client gọi /api/* với timeout + hủy (AbortController). Không bao giờ chạm tới API key.
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const TEACHER_CODE_KEY = 'lp.teacherCode';
export const getTeacherCode = () => {
  try {
    return localStorage.getItem(TEACHER_CODE_KEY) || '';
  } catch {
    return '';
  }
};
export const setTeacherCode = (code) => {
  try {
    localStorage.setItem(TEACHER_CODE_KEY, code);
  } catch {
    /* bỏ qua khi trình duyệt chặn storage */
  }
};

const NO_SERVER_MESSAGE =
  'Bản web này chưa kết nối máy chủ AI. Chạy `npm run dev` hoặc deploy Vercel kèm GEMINI_API_KEY để dùng.';

async function postJSON(path, body, { signal, timeoutMs = 60_000, headers } = {}) {
  // Bản 1 file mở offline (file://) không có máy chủ: báo ngay, không gọi mạng
  if (window.location.protocol === 'file:') throw new ApiError(NO_SERVER_MESSAGE, 0);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new DOMException('timeout', 'TimeoutError')), timeoutMs);
  const forwardAbort = () => ctrl.abort(signal.reason);
  signal?.addEventListener('abort', forwardAbort, { once: true });

  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 404 || res.status === 405) {
      throw new ApiError(NO_SERVER_MESSAGE, res.status);
    }
    if (!res.ok) throw new ApiError(data.error || `Máy chủ báo lỗi (${res.status}).`, res.status);
    return data;
  } catch (err) {
    if (err?.name === 'TimeoutError') throw new ApiError('AI phản hồi quá lâu, hãy thử lại.', 408);
    if (err?.name === 'AbortError' || err instanceof ApiError) throw err;
    throw new ApiError('Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại.', 0);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', forwardAbort);
  }
}

export const generateQuiz = (params, opts = {}) =>
  postJSON('/api/quiz', params, { ...opts, headers: { 'x-teacher-code': getTeacherCode() } });

// Cache theo câu hỏi để học sinh bấm lại không tốn thêm lượt gọi AI
const explainCache = new Map();
export async function explainAnswer(params, opts = {}) {
  const key = JSON.stringify([params.question, params.chosenIndex]);
  if (explainCache.has(key)) return explainCache.get(key);
  const data = await postJSON('/api/explain', params, { timeoutMs: 30_000, ...opts });
  explainCache.set(key, data.text);
  return data.text;
}
