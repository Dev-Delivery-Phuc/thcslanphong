// Vercel Function: POST /api/explain → AI giải thích thêm một câu hỏi cho học sinh
import { handleExplain } from '../server/handlers.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Chỉ hỗ trợ POST.' });
  const { status, json } = await handleExplain({ body: req.body, headers: req.headers, env: process.env });
  res.status(status).json(json);
}
