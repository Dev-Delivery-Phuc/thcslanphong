# Cổng thông tin phòng, chống ma túy học đường — THCS Lân Phong

Hướng dẫn cho Claude Code. Web bài giảng + trò chơi trắc nghiệm cho học sinh lớp 6–9, giáo viên trình chiếu trên lớp tạo câu hỏi bằng Gemini (`/api/quiz`) hoặc tự soạn; học sinh bấm "Hỏi Khiên" để AI giải thích thêm (`/api/explain`).

## Lệnh
- `npm run dev` — Vite dev server, có sẵn `/api/*` (plugin `server/vite-api-plugin.js`), đọc `.env`
- `npm run build` / `npm run preview`
- `npm run check:ai` — gọi thử Gemini qua đúng 2 handler `/api/explain` và `/api/quiz`, báo key/model có hoạt động không
- `npm run build:single` — gộp thành `dist/phong-chong-ma-tuy-offline.html` (1 file, chạy offline, không có tính năng AI)
- Deploy: Vercel (thư mục `api/` tự thành Serverless Functions)

## Kiến trúc (feature-based)
- `src/config/site.js` — nguồn duy nhất cho tên trường, địa phương, nguồn tài liệu, số hỗ trợ. Không hard-code các giá trị này ở nơi khác.
- `src/content/` — DỮ LIỆU thuần (không JSX): `lesson.js` (slide), `questions/*.js` (ngân hàng câu hỏi theo chủ đề, gộp ở `questions/index.js`).
- `src/features/<tên>/` — mỗi tính năng tự chứa component, hook, logic: `lesson`, `quiz`, `teacher`.
- `src/components/` — chỉ những gì ≥ 2 tính năng dùng chung.
- `src/pages/` — trang ghép từ components, không chứa logic nghiệp vụ.
- `src/lib/` — hạ tầng: `router` (hash, tuyến tiếng Việt, dùng `routes.*` thay vì viết tay chuỗi `#/…`), `api` (fetch + AbortController + timeout), `storage` (localStorage + useSyncExternalStore), `share` (nén link bằng CompressionStream).
- `src/styles/` — `tokens` → `base` → `components` → `home|lesson|quiz|teacher`. Mỗi khu vực một file.
- Import bằng alias `@/…` (trỏ tới `src/`).
- `server/` — handler thuần `{body, headers, env} → {status, json}`, dùng chung cho `api/*.js` và dev plugin.

## Tuyến đường
`#/` · `#/bai-giang/:n` · `#/tro-choi` · `#/choi/:setId?mode=class&n=10` · `#/s/:code` · `#/giao-vien`

## Quy tắc bắt buộc
1. **API key không bao giờ ở client.** Không dùng tiền tố `VITE_` cho key. Mọi lời gọi AI đi qua `server/handlers.js`.
2. **Tính năng AI mới** = prompt trong `server/prompts.js` (luôn chèn `SAFETY_RULES`) + handler + route trong `server/vite-api-plugin.js` + file `api/<ten>.js`. Validate input, chuẩn hóa output.
3. **Bất đồng bộ**: async/await; mọi fetch có AbortController + timeout, hủy khi unmount. Đếm giờ/animation dùng `requestAnimationFrame`.
4. **Nội dung**: đọc skill `quiz-content-safety` trước khi sửa slide, câu hỏi, prompt.
5. **Giao diện**: đọc skill `student-friendly-ui` trước khi sửa component/CSS. Dùng token, không thêm màu mới.
6. Không thêm thư viện nếu vài chục dòng tự viết được. Không để lại file, export hay CSS không dùng.

## Mô hình dữ liệu
```js
QuizSet  = { id, title, description?, grade, source: 'builtin'|'ai'|'manual'|'link', questions: Question[] }
Question = { question, options: string[2..4], answerIndex, explanation, fixed?: boolean } // fixed: không trộn đáp án
Slide    = { id, type: 'opening'|'story'|'goals'|'concept'|'cards'|'columns'|'steps'|'quiz', nav, ...dữ liệu theo type }
```
localStorage: `lp.sets.v1`, `lp.best.v1` (khóa `setId:soCau`), `lp.teacherCode`.

## Hướng phát triển
- Phòng thi trực tuyến + bảng xếp hạng lớp (Supabase Realtime), mã phòng ngắn, QR code
- Thống kê câu sai nhiều nhất cho giáo viên
- Thêm bài giảng khác (thuốc lá điện tử, bạo lực học đường) theo cùng cấu trúc `content/`
