// Lõi gọi Gemini qua REST generateContent. Chạy phía server (Vercel Function / Vite dev middleware),
// nên API key không bao giờ xuất hiện trong trình duyệt.
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
export const DEFAULT_MODEL = 'gemini-flash-latest';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function callGemini({ apiKey, model, system, prompt, schema, timeoutMs = 45_000 }) {
  if (!apiKey) throw new HttpError(500, 'Máy chủ chưa cấu hình GEMINI_API_KEY.');

  const generationConfig = schema ? { responseMimeType: 'application/json', responseJsonSchema: schema } : {};

  let res;
  try {
    res = await fetch(`${API_BASE}/${encodeURIComponent(model || DEFAULT_MODEL)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig,
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (err) {
    if (err?.name === 'TimeoutError') throw new HttpError(504, 'AI phản hồi quá lâu, hãy thử lại.');
    throw new HttpError(502, 'Không kết nối được tới Gemini.');
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('[gemini]', res.status, detail.slice(0, 600));
    const map = {
      400: 'Yêu cầu tới Gemini không hợp lệ. Kiểm tra GEMINI_API_KEY và GEMINI_MODEL.',
      403: 'API key không có quyền dùng Gemini API.',
      404: 'Không tìm thấy model. Kiểm tra lại GEMINI_MODEL.',
      429: 'Đã dùng hết lượt gọi AI tạm thời. Đợi khoảng 1 phút rồi thử lại.',
    };
    throw new HttpError(res.status === 429 ? 429 : 502, map[res.status] ?? `Gemini báo lỗi (${res.status}).`);
  }

  const data = await res.json();
  const cand = data.candidates?.[0];
  const text = (cand?.content?.parts ?? [])
    .filter((p) => !p.thought)
    .map((p) => p.text ?? '')
    .join('')
    .trim();

  if (!text) {
    const reason = data.promptFeedback?.blockReason || cand?.finishReason || 'EMPTY';
    throw new HttpError(422, `AI không trả lời được yêu cầu này (${reason}). Thử diễn đạt chủ đề khác.`);
  }
  return text;
}
