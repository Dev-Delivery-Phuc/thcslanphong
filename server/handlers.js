// Handler thuần (không phụ thuộc framework): nhận {body, headers, env}, trả {status, json}.
// Dùng chung cho api/*.js (Vercel) và server/vite-api-plugin.js (Vite dev/preview).
import { callGemini, HttpError } from './gemini.js';
import { QUIZ_SYSTEM, QUIZ_SCHEMA, quizPrompt, EXPLAIN_SYSTEM, explainPrompt } from './prompts.js';

const clampInt = (v, min, max, fallback) => {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};
const clean = (v, max) => (typeof v === 'string' ? v.replace(/\s+/g, ' ').trim().slice(0, max) : '');

function requireTeacher(headers, env) {
  if (!env.TEACHER_CODE) return;
  if (headers['x-teacher-code'] !== env.TEACHER_CODE) {
    throw new HttpError(401, 'Cần nhập đúng mã giáo viên để tạo câu hỏi bằng AI.');
  }
}

function parseJson(text) {
  try {
    return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ''));
  } catch {
    throw new HttpError(502, 'AI trả về dữ liệu lỗi định dạng. Bấm tạo lại.');
  }
}

function normalizeQuiz(raw, count) {
  const questions = (Array.isArray(raw?.questions) ? raw.questions : [])
    .map((q) => {
      const options = (Array.isArray(q?.options) ? q.options : []).map((o) => clean(o, 160)).filter(Boolean);
      const isTrueFalse = options.length === 2 && options[0] === 'Đúng' && options[1] === 'Sai';
      return {
        question: clean(q?.question, 300),
        options,
        answerIndex: Number(q?.answerIndex),
        explanation: clean(q?.explanation, 400),
        fixed: isTrueFalse || options.some((o) => /^tất cả|^cả [a-d] và/i.test(o)),
      };
    })
    .filter(
      (q) =>
        q.question &&
        q.options.length >= 2 &&
        q.options.length <= 4 &&
        new Set(q.options).size === q.options.length &&
        Number.isInteger(q.answerIndex) &&
        q.answerIndex >= 0 &&
        q.answerIndex < q.options.length,
    )
    .slice(0, count);

  if (!questions.length) throw new HttpError(502, 'AI chưa tạo được câu hỏi hợp lệ. Bấm tạo lại.');
  return { title: clean(raw?.title, 80) || 'Bộ câu hỏi mới', questions };
}

async function run(fn) {
  try {
    return { status: 200, json: await fn() };
  } catch (err) {
    if (err instanceof HttpError) return { status: err.status, json: { error: err.message } };
    console.error(err);
    return { status: 500, json: { error: 'Lỗi máy chủ không xác định.' } };
  }
}

export const handleQuiz = ({ body, headers, env }) =>
  run(async () => {
    requireTeacher(headers, env);
    const params = {
      topic: clean(body?.topic, 200) || 'Phòng, chống ma túy trong trường học',
      grade: clampInt(body?.grade, 6, 9, 8),
      count: clampInt(body?.count, 3, 15, 10),
      difficulty: ['de', 'vua', 'kho'].includes(body?.difficulty) ? body.difficulty : 'vua',
    };
    const text = await callGemini({
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL,
      system: QUIZ_SYSTEM,
      prompt: quizPrompt(params),
      schema: QUIZ_SCHEMA,
    });
    return normalizeQuiz(parseJson(text), params.count);
  });

export const handleExplain = ({ body, env }) =>
  run(async () => {
    const options = (Array.isArray(body?.options) ? body.options : []).slice(0, 4).map((o) => clean(o, 160));
    const question = clean(body?.question, 300);
    const answerIndex = Number(body?.answerIndex);
    if (!question || options.length < 2 || !(answerIndex >= 0 && answerIndex < options.length)) {
      throw new HttpError(400, 'Thiếu dữ liệu câu hỏi.');
    }
    const text = await callGemini({
      apiKey: env.GEMINI_API_KEY,
      model: env.GEMINI_MODEL,
      system: EXPLAIN_SYSTEM,
      prompt: explainPrompt({
        question,
        options,
        answerIndex,
        chosenIndex: Number.isInteger(body?.chosenIndex) ? body.chosenIndex : -1,
        grade: clampInt(body?.grade, 6, 9, 8),
      }),
      timeoutMs: 25_000,
    });
    return { text: text.slice(0, 800) };
  });
