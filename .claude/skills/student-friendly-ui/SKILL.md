---
name: student-friendly-ui
description: Dùng khi tạo hoặc sửa component React, CSS, bố cục, slide hoặc copy giao diện của cổng thông tin. Giữ phong cách "sticker vở học trò" nhất quán, dễ dùng cho học sinh THCS và đọc rõ trên máy chiếu lớp học.
---

# Giao diện thân thiện học sinh

## Phong cách
"Sticker vở học trò": nét viền mực navy dày, bóng đổ đặc lệch 4px, bấm vào thì lún xuống. Linh vật **Khiên** (`@/components/Mascot.jsx`, `mood="happy|wow|oops|think"`) là nhân vật duy nhất. Slide mở đầu (các dải tiêu đề dán như sticker) là khoảnh khắc chuyển động chính — không thêm hiệu ứng tự chạy ở nơi khác.

## Token (src/styles/tokens.css) — không hard-code màu mới
| Token | Dùng cho |
|---|---|
| `--sky` | nền trang |
| `--ink` | chữ, viền, bóng |
| `--green` | đúng, linh vật |
| `--sun` | nút chính, lựa chọn đang bật |
| `--coral` | sai, cảnh báo |
| `--violet` | mọi thứ liên quan AI (tạo câu hỏi, Hỏi Khiên), viền focus |
| `--opt-a..d` | 4 ô đáp án, màu thẻ/cột |
Viền `--line`, bóng `--shadow` / `--shadow-lg`, bo góc `--r-tile`, `--r-panel`, `--r-pill`.

## Chữ
- `--font-display` Baloo 2 (tiêu đề, số, nút), `--font-body` Be Vietnam Pro. Cả hai đủ dấu tiếng Việt.
- Class: `.display-xl/lg/md/sm`, `.lead`, `.muted`, `.slide-title`, `.slide-lead`. Sentence case, không VIẾT HOA nhãn.

## Component có sẵn
`.btn` (+ `-sun | -paper | -ink | -violet | -ghost`, `-sm | -lg`), `.btn-text`, `.pill`, `.badge`, `.panel`, `.field`, `<Segmented>` (chọn một), `<SetGrid>`, `.chip`, `.tile`, `.feedback`, `.toast`.

## Slide bài giảng
- Thêm slide = thêm object vào `src/content/lesson.js` với `type` có sẵn; chỉ tạo renderer mới trong `features/lesson/slides.jsx` khi thật sự cần.
- Phải vừa màn 1280×720 không cuộn; chữ nội dung ≥ 1rem, tiêu đề dùng `clamp()` theo cả `vw` và `vh`.

## Quy tắc bắt buộc
- Vùng bấm ≥ 48px; chữ trên nền màu là `--ink` (trừ nền `--violet`/`--ink` dùng chữ trắng)
- Không dùng màu làm tín hiệu duy nhất: đúng/sai luôn kèm ✓/✗ và chữ
- `:focus-visible` rõ; mọi thao tác dùng được bằng bàn phím
- Tôn trọng `prefers-reduced-motion`
- Số thứ tự chỉ dùng cho nội dung là trình tự (mục lục bài giảng, các bước); danh sách thường không đánh số
- Responsive từ 360px

## Copy
- Nút nói rõ hành động: "Vào bài giảng", "Bắt đầu 10 câu", "Chép link cho học sinh"
- Lỗi nói điều gì sai và cách sửa, không xin lỗi, không mơ hồ
- Trạng thái trống là lời mời hành động
