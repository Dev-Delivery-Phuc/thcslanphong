# Cổng thông tin phòng, chống ma túy học đường

**Trường THCS Lân Phong** · Xã Lân Phong, tỉnh Quảng Ngãi

Web bài giảng + trò chơi củng cố kiến thức phòng, chống ma túy cho học sinh lớp 6–9. Giáo viên trình chiếu bài giảng trên máy chiếu, cả lớp chơi trắc nghiệm, hoặc gửi link cho học sinh tự ôn trên điện thoại. Gemini giúp giáo viên soạn câu hỏi và giúp học sinh hiểu sâu hơn qua nút "Hỏi Khiên".

**Stack:** Vite 8 · React 19 · Gemini API (gọi qua server, key không lộ ra trình duyệt) · Vercel Functions

## Chạy thử

```bash
npm install
cp .env.example .env      # dán GEMINI_API_KEY lấy tại https://aistudio.google.com/apikey
npm run check:ai          # kiểm tra key Gemini đã hoạt động chưa
npm run dev               # http://localhost:5173
```

Bài giảng và trò chơi chạy được ngay khi chưa có key; chỉ "Tạo câu hỏi bằng AI" và nút "Hỏi Khiên" cần key.

**Bản 1 file dùng offline:** `npm run build:single` → `dist/phong-chong-ma-tuy-offline.html`. Chép file này qua USB, bấm đúp là mở được trên máy chiếu (cần mạng chỉ để tải font; không có mạng vẫn chạy bằng font hệ thống). Bản này không có các tính năng AI.

## Tính năng

| Khu vực | Đường dẫn | Nội dung |
|---|---|---|
| Trang chủ | `#/` | Giới thiệu, mục lục bài giảng, chọn trò chơi |
| Bài giảng | `#/bai-giang/1` | 10 slide: mở đầu, tình huống khởi động, kiến thức, kỹ năng, củng cố. Phím ←/→, bút trình chiếu, F toàn màn hình |
| Trò chơi | `#/tro-choi` | 4 bộ (Tổng hợp, Nhận biết, Tác hại, Tự bảo vệ). Chọn 5/10/15/20 câu hoặc tất cả, rút ngẫu nhiên mỗi lượt |
| Chiếu cả lớp | `#/choi/:bo?mode=class` | Chữ lớn, 30 giây/câu, phím 1–4 / Space / Enter |
| Góc thầy cô | `#/giao-vien` | Tạo câu hỏi bằng AI, tự soạn bộ mới hoặc sửa bản sao từ ngân hàng, lưu, chiếu cả lớp, chép link gửi học sinh |

## Cấu trúc thư mục

```
├── api/                      Vercel Functions (adapter mỏng)
├── server/                   Lõi server dùng chung: gọi Gemini, prompt, validate
│   ├── gemini.js
│   ├── handlers.js
│   ├── prompts.js
│   └── vite-api-plugin.js    Mount /api vào `npm run dev`
├── public/favicon.svg
├── scripts/
│   ├── build-single.mjs      Gộp bản build thành 1 file HTML offline
│   └── check-gemini.mjs      Kiểm tra key Gemini (npm run check:ai)
├── src/
│   ├── config/site.js        Tên trường, địa phương, nguồn tài liệu, số hỗ trợ
│   ├── content/
│   │   ├── lesson.js         Nội dung 10 slide bài giảng
│   │   └── questions/        Ngân hàng câu hỏi theo chủ đề
│   ├── components/           Thành phần dùng chung (header, footer, linh vật…)
│   ├── features/
│   │   ├── lesson/           Trình chiếu bài giảng
│   │   ├── quiz/             Trò chơi trắc nghiệm
│   │   └── teacher/          Góc thầy cô
│   ├── pages/                Trang chủ, trang trò chơi, 404
│   ├── lib/                  router, api, storage, share
│   └── styles/               tokens → base → components → từng khu vực
├── .claude/skills/           Skill cho Claude Code
└── CLAUDE.md
```

**Sửa nội dung không cần biết code:** thông tin trường ở `src/config/site.js`, slide ở `src/content/lesson.js`, câu hỏi ở `src/content/questions/*.js`.

## Biến môi trường

| Biến | Bắt buộc | Ý nghĩa |
|---|---|---|
| `GEMINI_API_KEY` | có | Key Gemini. **Không** thêm tiền tố `VITE_` |
| `GEMINI_MODEL` | không | Mặc định `gemini-flash-latest` |
| `TEACHER_CODE` | nên có khi deploy | Chỉ ai nhập đúng mã mới tạo được câu hỏi bằng AI |

## Deploy lên Vercel

1. Đẩy repo lên GitHub → Import vào Vercel (framework: Vite).
2. Thêm các biến môi trường ở trên trong Project Settings → Environment Variables.
3. Deploy. Thư mục `api/` tự thành `/api/quiz` và `/api/explain`.

## Nguồn nội dung

Bài giảng và ngân hàng câu hỏi được biên soạn lại (diễn đạt lại, rút gọn, bổ sung tình huống) từ bài tuyên truyền "Phòng, chống ma túy trong học đường" đăng trên cổng thông tin các trường THCS (danh sách đầy đủ trong `src/config/site.js`). Giáo viên nên rà soát lại trước khi dạy.

## Giới hạn hiện tại

- Bộ câu hỏi giáo viên tạo và kỷ lục lưu trong trình duyệt (localStorage) của từng máy.
- Link chia sẻ khá dài vì chứa toàn bộ câu hỏi; giáo viên chưa thu được kết quả của học sinh.
