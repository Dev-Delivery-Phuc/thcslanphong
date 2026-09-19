// Plugin Vite: mount /api/* vào dev server và preview server, để `npm run dev` gọi được AI
// mà không cần `vercel dev`. Production trên Vercel dùng api/*.js.
import { handleQuiz, handleExplain } from './handlers.js';

const ROUTES = { '/quiz': handleQuiz, '/explain': handleExplain };
const MAX_BODY_BYTES = 32 * 1024;

async function readJson(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw Object.assign(new Error('Dữ liệu gửi lên quá lớn.'), { status: 413 });
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch {
    return {};
  }
}

function createMiddleware(env) {
  return async (req, res, next) => {
    const handler = ROUTES[(req.url || '').split('?')[0]];
    if (!handler) return next();

    const send = (status, json) => {
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(json));
    };
    if (req.method !== 'POST') return send(405, { error: 'Chỉ hỗ trợ POST.' });

    try {
      const body = await readJson(req);
      const { status, json } = await handler({ body, headers: req.headers, env });
      send(status, json);
    } catch (err) {
      send(err.status || 500, { error: err.message || 'Lỗi máy chủ.' });
    }
  };
}

export function apiPlugin(env) {
  return {
    name: 'lan-phong-api',
    configureServer(server) {
      server.middlewares.use('/api', createMiddleware(env));
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api', createMiddleware(env));
    },
  };
}
