// Bài giảng dạng trình chiếu. Mỗi slide có `type` quyết định cách hiển thị (xem features/lesson/slides.jsx).
// Nội dung diễn đạt lại từ bài tuyên truyền "Phòng, chống ma túy trong học đường" (xem config/site.js → SOURCES).

export const LESSON_SLIDES = [
  {
    id: 'mo-dau',
    type: 'opening',
    nav: 'Mở đầu',
  },
  {
    id: 'tinh-huong',
    type: 'story',
    nav: 'Tình huống khởi động',
    title: 'Chuyện ở cổng trường',
    lines: [
      'Năm giờ chiều, trống tan học vừa dứt.',
      'Một anh lạ mặt đứng gần cổng, chìa ra túi kẹo nhiều màu rất đẹp mắt.',
      '“Kẹo mới đấy, cho em thử miễn phí. Ngon lắm!”',
    ],
    question: 'Nếu là em, em sẽ làm gì?',
    choices: [
      {
        text: 'Cầm lấy, kẹo miễn phí mà',
        good: false,
        reply: 'Cẩn thận! “Miễn phí” chính là cái bẫy quen thuộc nhất.',
      },
      {
        text: 'Từ chối, đi thẳng vào gặp thầy cô hoặc bác bảo vệ',
        good: true,
        reply: 'Rất đúng! Từ chối và báo ngay người lớn là cách tự bảo vệ tốt nhất.',
      },
      {
        text: 'Lấy về chia cho các bạn cùng thử',
        good: false,
        reply: 'Nguy hiểm! Em có thể vô tình đưa cả nhóm bạn vào bẫy.',
      },
    ],
    fact:
      'Kẻ buôn bán ma túy thường dụ học sinh bằng cách cho dùng thử không mất tiền. Khi đã nghiện, người dùng dễ bị chúng lợi dụng làm công cụ: trộm cắp, cướp giật, thậm chí mua bán ma túy.',
  },
  {
    id: 'muc-tieu',
    type: 'goals',
    nav: 'Mục tiêu bài học',
    title: 'Hôm nay chúng ta sẽ',
    goals: [
      { icon: '🔍', text: 'Hiểu ma túy là gì và nhận ra các dạng ngụy trang' },
      { icon: '⚠️', text: 'Biết tác hại của ma túy với bản thân, gia đình và xã hội' },
      { icon: '🛡️', text: 'Biết cách nói KHÔNG, tự bảo vệ mình và giúp đỡ bạn bè' },
    ],
  },
  {
    id: 'ma-tuy-la-gi',
    type: 'concept',
    nav: 'Ma túy là gì?',
    title: 'Ma túy là gì?',
    definition:
      'Ma túy là những chất có nguồn gốc tự nhiên hoặc nhân tạo. Khi vào cơ thể, chúng làm thay đổi tâm trạng, ý thức, trí tuệ và khiến người dùng bị lệ thuộc, gây tổn thương cho bản thân và cộng đồng.',
    note: 'Vì vậy, việc sản xuất, vận chuyển, mua bán, sử dụng ma túy bị pháp luật kiểm soát rất chặt chẽ.',
    chipsTitle: 'Một số loại đang xuất hiện ở Việt Nam',
    chips: ['Heroin', 'Cần sa', 'Ma túy đá', 'Thuốc lắc', 'Viên ma túy tổng hợp', 'Bóng cười (chất gây nghiện mới)'],
  },
  {
    id: 'thu-doan',
    type: 'cards',
    nav: 'Vì sao học sinh bị nhắm tới?',
    title: 'Vì sao học sinh bị nhắm tới?',
    lead: 'Tệ nạn ma túy ngày càng phức tạp, người sử dụng đang trẻ hóa, lan tới cả tuổi vị thành niên và học sinh.',
    cards: [
      { icon: '🎁', title: 'Mời thử miễn phí', text: 'Cho dùng không mất tiền để tạo cơn nghiện, sau đó mới đòi tiền.' },
      { icon: '🍬', title: 'Ngụy trang tinh vi', text: 'Trộn vào kẹo, bánh, trà sữa, “nước vui”, tem giấy, tinh dầu thuốc lá điện tử.' },
      { icon: '🕸️', title: 'Biến thành công cụ', text: 'Khi đã nghiện, học sinh bị lợi dụng để trộm cắp, cướp giật, vận chuyển ma túy.' },
    ],
  },
  {
    id: 'tac-hai-co-the',
    type: 'cards',
    nav: 'Tác hại với cơ thể',
    title: 'Ma túy tàn phá cơ thể thế nào?',
    cards: [
      { icon: '🫁', title: 'Hô hấp', text: 'Ban đầu thở gấp, sau đó ức chế hô hấp; có thể ngưng thở đột ngột và tử vong.' },
      { icon: '❤️', title: 'Tim mạch', text: 'Tăng nhịp tim, tăng huyết áp, đau thắt ngực, có thể gây nhồi máu cơ tim.' },
      { icon: '🧠', title: 'Thần kinh', text: 'Gây lệ thuộc, co giật, xuất huyết não, đột quỵ; ảo thính, ảo thị.' },
      { icon: '🩸', title: 'Gan và máu', text: 'Hoại tử tế bào gan. Dùng chung bơm kim tiêm lây HIV, viêm gan B, C.' },
    ],
  },
  {
    id: 'hau-qua',
    type: 'columns',
    nav: 'Hậu quả lan rộng',
    title: 'Một người nghiện, nhiều người khổ',
    columns: [
      {
        title: 'Bản thân',
        items: [
          'Sức khỏe suy kiệt, có thể tử vong',
          'Học tập sa sút, dễ bỏ học',
          'Thoái hóa nhân cách, dễ vi phạm pháp luật',
          'Mất lòng tin của mọi người',
        ],
      },
      {
        title: 'Gia đình',
        items: [
          'Tiêu tán tiền bạc, tài sản',
          'Người thân lo lắng, sức khỏe giảm sút',
          'Hạnh phúc gia đình có thể tan vỡ',
          'Tốn kém chi phí chăm sóc, chữa bệnh',
        ],
      },
      {
        title: 'Xã hội',
        items: [
          'Gia tăng trộm cắp, lừa đảo, tội phạm',
          'Mất trật tự an toàn xã hội',
          'Giảm sút sức lao động',
          'Ảnh hưởng thuần phong mỹ tục',
        ],
      },
    ],
  },
  {
    id: 'hoc-sinh-lam-gi',
    type: 'cards',
    nav: 'Học sinh cần làm gì?',
    title: 'Học sinh chúng ta cần làm gì?',
    cards: [
      { icon: '🚫', title: 'Tránh xa', text: 'Không sử dụng, vận chuyển, mua bán, tàng trữ ma túy dưới bất kỳ hình thức nào.' },
      { icon: '🤝', title: 'Không rủ rê', text: 'Không xúi giục, lôi kéo người khác vào ma túy và tệ nạn xã hội.' },
      { icon: '📣', title: 'Báo ngay', text: 'Thấy người, nhóm người liên quan đến ma túy: báo thầy cô, cha mẹ hoặc Công an gần nhất.' },
      { icon: '💚', title: 'Không kỳ thị', text: 'Quan tâm, động viên người cai nghiện để họ hòa nhập cộng đồng.' },
      { icon: '📚', title: 'Hiểu và lan tỏa', text: 'Tìm hiểu tác hại qua sách báo, thầy cô và tuyên truyền cho người thân.' },
    ],
  },
  {
    id: 'noi-khong',
    type: 'steps',
    nav: 'Kỹ năng nói KHÔNG',
    title: 'Ba bước nói KHÔNG',
    steps: [
      { title: 'Nói “không” thật rõ', text: 'Nhìn thẳng, giọng dứt khoát. Không ậm ừ, không hẹn “để lần sau”.' },
      { title: 'Nêu lý do ngắn gọn', text: '“Mình không dùng, mình muốn khỏe mạnh.” Không cần giải thích dài.' },
      { title: 'Rời đi và kể lại', text: 'Rủ làm việc khác hoặc đi chỗ khác, rồi kể với người lớn em tin tưởng.' },
    ],
  },
  {
    id: 'cung-co',
    type: 'quiz',
    nav: 'Củng cố: trò chơi',
    title: 'Củng cố bài học',
    lead: 'Chọn bộ câu hỏi và số câu, cả lớp cùng trả lời trên màn chiếu.',
  },
];
