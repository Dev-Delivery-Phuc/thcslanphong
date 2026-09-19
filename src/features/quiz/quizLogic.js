export const LETTERS = ['A', 'B', 'C', 'D'];

export const DURATION_MS = { solo: 20_000, class: 30_000 };

const COUNT_PRESETS = [5, 10, 15, 20];
const DEFAULT_COUNT = 10;

/** Các lựa chọn số câu hợp lệ cho một bộ có `total` câu: 5/10/15/20 (nếu đủ) + "Tất cả". */
export function countOptions(total) {
  const presets = COUNT_PRESETS.filter((n) => n < total).map((n) => ({ value: n, label: `${n} câu` }));
  return [...presets, { value: total, label: `Tất cả (${total})` }];
}

/** Chuẩn hóa số câu người dùng yêu cầu về một lựa chọn hợp lệ. */
export function normalizeCount(requested, total) {
  const valid = countOptions(total).map((o) => o.value);
  const n = Number(requested);
  if (valid.includes(n)) return n;
  return valid.includes(DEFAULT_COUNT) ? DEFAULT_COUNT : total;
}

function shuffled(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Trộn thứ tự đáp án (AI hay dồn đáp án đúng vào A/B). Câu Đúng/Sai hoặc "Tất cả…" giữ nguyên.
function shuffleOptions(q) {
  if (q.fixed || q.options.length < 3) return q;
  const order = shuffled(q.options.map((_, i) => i));
  return { ...q, options: order.map((i) => q.options[i]), answerIndex: order.indexOf(q.answerIndex) };
}

/** Rút ngẫu nhiên `count` câu từ ngân hàng, trộn cả thứ tự câu lẫn thứ tự đáp án. */
export const pickQuestions = (questions, count) => shuffled(questions).slice(0, count).map(shuffleOptions);

// 100 điểm gốc + tối đa 100 điểm tốc độ + thưởng chuỗi (10/câu, tối đa 50)
export const scoreFor = ({ correct, remainingMs, durationMs, streak }) =>
  correct ? 100 + Math.round((100 * remainingMs) / durationMs) + Math.min(streak * 10, 50) : 0;

export function rankFor(ratio) {
  if (ratio >= 0.9) return { stars: 3, name: 'Lá chắn vàng', line: 'Bạn nắm rất chắc kiến thức. Hãy chia sẻ với bạn bè nhé!' };
  if (ratio >= 0.6) return { stars: 2, name: 'Lá chắn bạc', line: 'Khá lắm! Xem lại vài câu sai là bạn sẽ lên hạng vàng.' };
  if (ratio >= 0.3) return { stars: 1, name: 'Lá chắn đồng', line: 'Bạn đã có nền tảng. Đọc phần giải thích rồi chơi lại nhé.' };
  return { stars: 0, name: 'Tập sự', line: 'Ai cũng bắt đầu từ đây. Đọc kỹ giải thích và thử lại lần nữa!' };
}
