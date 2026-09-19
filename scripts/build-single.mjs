// Gộp bản build (dist/) thành 1 file HTML tự chứa: mở offline bằng cách bấm đúp, hoặc chép qua USB.
// Chạy sau `vite build`:  npm run build:single
// Lưu ý: bản 1 file không có máy chủ /api nên các tính năng AI (tạo câu hỏi, Hỏi Khiên) tạm tắt.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const OUT = join(DIST, 'phong-chong-ma-tuy-offline.html');
const read = (p) => readFileSync(join(DIST, p), 'utf8');

let html = read('index.html');

html = html.replace(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g, (_, file) => `<style>${read(file)}</style>`);

html = html.replace(
  /<script type="module"[^>]*src="\/(assets\/[^"]+\.js)"[^>]*><\/script>/g,
  (_, file) => `<script type="module">${read(file).replace(/<\/script/gi, '<\\/script')}</script>`,
);

html = html.replace('href="/favicon.svg"', () => `href="data:image/svg+xml,${encodeURIComponent(read('favicon.svg'))}"`);

if (/(src|href)="\/assets\//.test(html)) throw new Error('Còn tài nguyên chưa được gộp vào file.');

writeFileSync(OUT, html);
console.log(`✓ ${OUT} (${(Buffer.byteLength(html) / 1024).toFixed(0)} kB)`);
