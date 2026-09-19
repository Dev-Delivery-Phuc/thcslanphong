// Vercel Function: POST /api/quiz  → tạo bộ câu hỏi bằng Gemini
import { handleQuiz } from '../server/handlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Chỉ hỗ trợ POST.' });
  const { status, json } = await handleQuiz({ body: req.body, headers: req.headers, env: process.env });
  res.status(status).json(json);
}
