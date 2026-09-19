// Kiểm tra kết nối Gemini bằng đúng đường chạy của web (2 handler /api/explain và /api/quiz).
// Chạy:  npm run check:ai   (đọc GEMINI_API_KEY, GEMINI_MODEL, TEACHER_CODE từ file .env)
import { handleExplain, handleQuiz } from '../server/handlers.js';
import { DEFAULT_MODEL } from '../server/gemini.js';

const env = process.env;
const key = env.GEMINI_API_KEY ?? '';

if (!key) {
  console.error('✗ Chưa có GEMINI_API_KEY trong file .env');
  process.exit(1);
}

console.log(`Model: ${env.GEMINI_MODEL || DEFAULT_MODEL}`);
console.log(`Key:   ${key.slice(0, 6)}…${key.slice(-4)} (${key.length} ký tự)\n`);

async function step(name, run) {
  process.stdout.write(`${name}… `);
  const started = performance.now();
  const { status, json } = await run();
  const ms = Math.round(performance.now() - started);
  if (status !== 200) {
    console.log(`✗ lỗi ${status}: ${json.error}`);
    return false;
  }
  console.log(`✓ ${ms} ms`);
  return json;
}

const explain = await step('1/2 Hỏi Khiên (/api/explain)', () =>
  handleExplain({
    env,
    body: {
      question: 'Ngày Quốc tế phòng, chống ma túy là ngày nào trong năm?',
      options: ['26/6', '1/12', '31/5', '20/11'],
      answerIndex: 0,
      chosenIndex: 1,
      grade: 8,
    },
  }),
);
if (explain) console.log(`    “${explain.text}”\n`);

const quiz = await step('2/2 Tạo câu hỏi bằng AI (/api/quiz)', () =>
  handleQuiz({
    env,
    headers: { 'x-teacher-code': env.TEACHER_CODE ?? '' },
    body: { topic: 'Kỹ năng nói KHÔNG khi bị rủ rê', grade: 8, count: 3, difficulty: 'de' },
  }),
);
if (quiz) {
  console.log(`    Bộ: ${quiz.title}`);
  quiz.questions.forEach((q, i) => console.log(`    ${i + 1}. ${q.question}  →  ${q.options[q.answerIndex]}`));
}

if (explain && quiz) console.log('\n✓ Gemini hoạt động với cả hai tính năng AI.');
else process.exit(1);
