---
name: quiz-content-safety
description: Dùng khi viết, sửa hoặc review bất kỳ nội dung nào về ma túy/chất gây nghiện trong dự án — slide bài giảng (src/content/lesson.js), ngân hàng câu hỏi (src/content/questions), system prompt Gemini (server/prompts.js), lời giải thích, copy giao diện. Đảm bảo nội dung chính xác, phù hợp học sinh THCS và chỉ phục vụ phòng ngừa.
---

# An toàn nội dung giáo dục phòng, chống ma túy

Người đọc là học sinh THCS (11–15 tuổi). Mục tiêu duy nhất: **hiểu tác hại, nhận diện nguy cơ, biết từ chối, biết tìm giúp đỡ.**

## Được viết
- Khái niệm ma túy, tác hại lên cơ thể, bản thân, gia đình, xã hội (mức tổng quát, chính xác)
- Nhận diện thủ đoạn lôi kéo (mời thử miễn phí, lợi dụng làm công cụ) và ma túy trá hình (kẹo, trà sữa, "nước vui", tem giấy, tinh dầu thuốc lá điện tử) — chỉ ở mức "nhận biết để tránh"
- Việc học sinh cần làm, kỹ năng từ chối, tìm người lớn tin cậy
- Thái độ không kỳ thị người nghiện (nghiện là bệnh cần điều trị)

## Không bao giờ viết
- Cách dùng, liều lượng, cách pha chế/điều chế, cách mua bán, nơi mua, giá cả
- Cách che giấu, qua mặt xét nghiệm hay kiểm tra
- Mô tả cảm giác "phê" theo hướng hấp dẫn, tò mò
- Số liệu, số điều luật, tên vụ án cụ thể khi không chắc chắn nguồn (tài liệu tuyên truyền cũ có thể trích luật đã hết hiệu lực — không dùng lại)
- Số điện thoại ngoài **111** (Tổng đài quốc gia bảo vệ trẻ em, miễn phí) và **113** (Công an)

## Khi lấy nội dung từ tài liệu tuyên truyền
- Diễn đạt lại bằng lời của mình, rút gọn cho học sinh; không chép nguyên đoạn
- Bỏ các chi tiết lỗi thời hoặc thiếu căn cứ khoa học
- Thêm nguồn vào `SOURCES` trong `src/config/site.js`

## Quy tắc câu hỏi
- 1 đáp án đúng duy nhất; đáp án sai hợp lý nhưng rõ ràng sai khi đã hiểu bài
- Ưu tiên tình huống gần gũi: cổng trường, tiệc sinh nhật, mạng xã hội, bạn thân
- Câu Đúng/Sai dùng đúng `["Đúng", "Sai"]` và đặt `fixed: true`
- Tránh "Tất cả các đáp án trên"; nếu dùng thì đặt `fixed: true`
- Giải thích nói **vì sao**, 1–3 câu, không nhắc chữ cái A/B/C/D (đáp án bị trộn khi chơi)
- Giọng văn: câu hỏi, slide, thông tin hỗ trợ dùng "em" (giọng thầy cô); lời linh vật Khiên dùng "mình – bạn"
- Mỗi chủ đề nên có ≥ 10 câu để tùy chọn "10 câu" có ý nghĩa

## Checklist review
- [ ] Mỗi khẳng định đều đúng và kiểm chứng được?
- [ ] Có chi tiết nào giúp ai đó *sử dụng* hay *tiếp cận* chất cấm không? → xóa
- [ ] Có câu nào hù dọa quá mức hoặc kỳ thị không? → viết lại
- [ ] Phù hợp lớp 6–9 (từ ngữ, độ dài)?
