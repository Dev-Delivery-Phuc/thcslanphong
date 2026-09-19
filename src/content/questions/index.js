// Ngân hàng câu hỏi có sẵn. Thêm chủ đề mới: tạo file cùng cấu trúc rồi thêm vào TOPIC_SETS.
import nhanBiet from './nhan-biet.js';
import tacHai from './tac-hai.js';
import tuBaoVe from './tu-bao-ve.js';

const withSource = (set) => ({ ...set, source: 'builtin' });

export const TOPIC_SETS = [nhanBiet, tacHai, tuBaoVe].map(withSource);

const MIXED_SET = {
  id: 'tong-hop',
  title: 'Tổng hợp cả bài',
  description: 'Câu hỏi ngẫu nhiên từ cả ba chủ đề.',
  grade: 8,
  source: 'builtin',
  questions: TOPIC_SETS.flatMap((s) => s.questions),
};

export const BUILTIN_SETS = [MIXED_SET, ...TOPIC_SETS];
