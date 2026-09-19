// Thông tin nhận diện của trường — sửa tại đây, toàn bộ web tự cập nhật.
export const SITE = {
  name: 'Cổng thông tin phòng, chống ma túy học đường',
  shortName: 'Phòng, chống ma túy học đường',
  school: 'Trường THCS Lân Phong',
  schoolShort: 'THCS Lân Phong',
  location: 'Xã Lân Phong, tỉnh Quảng Ngãi',
  provincePortal: 'http://quangngai.gov.vn',
};

// Đường dây nóng riêng của Trường THCS Lân Phong
export const SCHOOL_HOTLINES = [
  {
    name: 'Cô Hồ Ngọc Điệp',
    phone: '0935 362 946',
    rawPhone: '0935362946',
    role: 'Cán bộ tiếp nhận thông tin, tư vấn tâm lý & hỗ trợ học sinh',
    note: 'Học sinh và phụ huynh có thể gọi điện hoặc nhắn tin bất cứ khi nào cần trợ giúp hoặc chia sẻ tâm sự.',
    avatarIcon: 'user-female',
  },
  {
    name: 'Thầy Trần Tiến Duy',
    phone: '037 989 8198',
    rawPhone: '0379898198',
    role: 'Cán bộ phụ trách an toàn trường học, phòng chống tệ nạn',
    note: 'Tiếp nhận phản ánh về các hành vi dụ dỗ, rủ rê hoặc tình huống nghi vấn nguy cơ ma túy.',
    avatarIcon: 'user-male',
  },
];

// Đường dây nóng cứu trợ quốc gia & khẩn cấp
export const HOTLINES = [
  { number: '111', label: 'Tổng đài quốc gia bảo vệ trẻ em, miễn phí 24/7' },
  { number: '113', label: 'Công an, tiếp nhận tố giác tội phạm ma túy và nguy hiểm tức thời' },
];

// Các trang liên kết, cổng thông tin & hotline page tài liệu chính thức
export const HOTLINE_PAGES = [
  {
    title: 'Cổng thông tin điện tử tỉnh Quảng Ngãi',
    category: 'Cơ quan quản lý nhà nước',
    desc: 'Cổng thông tin chính thức của UBND tỉnh Quảng Ngãi, cập nhật tin tức chỉ đạo, chính sách pháp luật và an ninh trật tự.',
    url: 'http://quangngai.gov.vn',
    icon: 'landmark',
    badge: 'Chính thống',
  },
  {
    title: 'Kênh tài liệu & tư vấn phòng chống ma túy học đường (Kênh 1)',
    category: 'Tài liệu tuyên truyền',
    desc: 'Kho tư liệu trực tuyến, tài liệu truyền thông số và hướng dẫn phòng ngừa ma túy dành cho giáo viên và học sinh.',
    url: 'https://share.google/RtoX2T3Li1jzxskgR',
    icon: 'folder-open',
    badge: 'Tài liệu số',
  },
  {
    title: 'Kênh tài liệu & kỹ năng tự bảo vệ học sinh (Kênh 2)',
    category: 'Cẩm nang kỹ năng',
    desc: 'Tổng hợp tài liệu sinh động, video và cẩm nang kỹ năng nói KHÔNG với các chất gây nghiện và ma túy.',
    url: 'https://share.google/enzqiUiC8uuZrNaho',
    icon: 'shield-heart',
    badge: 'Kỹ năng sống',
  },
  {
    title: 'Cẩm nang nhận biết ma túy thế hệ mới & ứng phó hiểm họa',
    category: 'Hướng dẫn nhận diện',
    desc: 'Hình ảnh, đặc điểm nhận biết các loại ma túy ngụy trang mới (Pod Chill, cỏ Mỹ, nước vui, bánh kẹo lạ) và cách xử trí an toàn.',
    url: 'https://share.google/kaX2f4Soe00cDRNcs',
    icon: 'book-open',
    badge: 'Cảnh báo mới',
  },
];

// Cổng thông tin chính phủ, bộ ngành và tỉnh Quảng Ngãi
export const GOV_PORTALS = [
  {
    title: 'Cổng thông tin điện tử tỉnh Quảng Ngãi',
    agency: 'UBND Tỉnh Quảng Ngãi',
    url: 'http://quangngai.gov.vn',
    icon: 'landmark',
    badge: 'UBND Tỉnh',
    desc: 'Cập nhật chỉ đạo điều hành, tin tức kinh tế - xã hội, thông tin an ninh trật tự trên địa bàn tỉnh Quảng Ngãi.',
  },
  {
    title: 'Báo Chính phủ điện tử (VGP)',
    agency: 'Cổng TTĐT Chính phủ',
    url: 'https://baochinhphu.vn',
    icon: 'newspaper',
    badge: 'Chính phủ',
    desc: 'Thông tin chính sách, nghị định và chỉ thị quốc gia về phòng chống ma túy, tệ nạn xã hội.',
  },
  {
    title: 'Cổng thông tin điện tử Bộ Công an',
    agency: 'Bộ Công an (Cục C04)',
    url: 'https://bocongan.gov.vn',
    icon: 'shield',
    badge: 'Bộ Công an',
    desc: 'Thông báo nhận diện tội phạm ma túy, cảnh báo thủ đoạn ngụy trang mới và tin tức đấu tranh phòng chống ma túy.',
  },
  {
    title: 'Báo Quảng Ngãi Online',
    agency: 'Báo Quảng Ngãi',
    url: 'https://baoquangngai.vn',
    icon: 'rss',
    badge: 'Báo Tỉnh',
    desc: 'Chuyên mục An ninh - Trật tự, phong trào toàn dân bảo vệ an ninh học đường tỉnh Quảng Ngãi.',
  },
  {
    title: 'Cổng thông tin Bộ Giáo dục & Đào tạo',
    agency: 'Bộ GD&ĐT',
    url: 'https://moet.gov.vn',
    icon: 'graduation-cap',
    badge: 'Bộ GD&ĐT',
    desc: 'Các chỉ đạo, văn bản hướng dẫn và chương trình hành động phòng chống tệ nạn học đường.',
  },
];

// Các bài báo, tin tức tuyên truyền và cảnh báo ma túy học đường
export const PRESS_ARTICLES = [
  {
    id: 'canh-bao-ma-tuy-nguy-trang',
    title: 'Cảnh báo khẩn cấp: Ma túy “nước vui”, Pod Chill núp bóng bánh kẹo tấn công học đường',
    date: '2025-03-12',
    source: 'Báo Chính Phủ & Cục C04 Bộ Công an',
    category: 'Cảnh báo học đường',
    badgeColor: 'coral',
    summary:
      'Các loại ma túy mới được ngụy trang tinh vi dưới dạng trà sữa, nước dâu, xoài, bánh kẹo và tinh dầu thuốc lá điện tử nhằm lôi kéo học sinh cấp 2, cấp 3 sử dụng thử.',
    url: 'https://baochinhphu.vn',
    highlights: [
      'Không nhận thức ăn, nước uống từ người lạ ở cổng trường.',
      'Tuyệt đối không sử dụng Pod Chill, tinh dầu lạ dưới mọi hình thức.',
      'Báo ngay cho giáo viên quản nhiệm khi phát hiện đồ vật có biểu hiện nghi vấn.',
    ],
  },
  {
    id: 'quang-ngai-phong-chong-ma-tuy',
    title: 'Quảng Ngãi: Tăng cường phòng chống ma túy, bảo vệ thanh thiếu niên học đường',
    date: '2025-02-28',
    source: 'Cổng Thông Tin Điện Tử Tỉnh Quảng Ngãi',
    category: 'Chỉ đạo địa phương',
    badgeColor: 'mint',
    summary:
      'UBND tỉnh Quảng Ngãi ban hành kế hoạch phối hợp giữa ngành Công an và Giáo dục nhằm kiểm tra, thanh lọc các tụ điểm có nguy cơ quanh khu vực trường học.',
    url: 'http://quangngai.gov.vn',
    highlights: [
      'Kiểm soát chặt các hàng quán nước giải khát quanh cổng trường.',
      'Tổ chức chuyên đề giáo dục kỹ năng sống và tư vấn tâm lý học đường.',
      'Xây dựng mô hình trường học an toàn, không có tệ nạn xã hội.',
    ],
  },
  {
    id: 'luat-phong-chong-ma-tuy',
    title: 'Luật Phòng, chống ma túy: Trách nhiệm của gia đình, nhà trường và học sinh',
    date: '2025-01-15',
    source: 'Cổng Thông Tin Bộ Tư Pháp',
    category: 'Pháp luật',
    badgeColor: 'sun',
    summary:
      'Quy định rõ ràng về các hành vi bị nghiêm cấm, chế tài xử lý nghiêm khắc đối với việc lôi kéo, cưỡng ép hoặc tàng trữ chất ma túy trong học sinh sinh viên.',
    url: 'https://moet.gov.vn',
    highlights: [
      'Tàng trữ, sử dụng dù số lượng nhỏ vẫn vi phạm pháp luật nghiêm trọng.',
      'Người bao che, không tố giác hành vi ma túy cũng chịu trách nhiệm liên đới.',
      'Nhà trường có trách nhiệm bảo vệ và giữ bí mật cho người tố giác.',
    ],
  },
  {
    id: 'ky-nang-tu-choi-hoc-sinh',
    title: 'Kỹ năng từ chối: Bí quyết bảo vệ bản thân trước áp lực bạn bè rủ rê',
    date: '2024-11-20',
    source: 'Cẩm Nang Tâm Lý Học Đường',
    category: 'Kỹ năng sống',
    badgeColor: 'violet',
    summary:
      'Hướng dẫn học sinh THCS cách từ chối khéo léo nhưng dứt khoát khi bị bạn bè kích bác, rủ rê thử các chất gây nghiện nguy hiểm.',
    url: 'https://share.google/kaX2f4Soe00cDRNcs',
    highlights: [
      'Áp dụng quy tắc 3 bước: Nói Không dứt khoát → Đưa lý do ngắn → Rời đi.',
      'Tìm kiếm sự trợ giúp từ thầy cô và người lớn tin cậy.',
      'Nhớ số hotline của trường THCS Lân Phong: Cô Điệp & Thầy Duy.',
    ],
  },
];

// Nguồn bài giảng
export const SOURCES = [
  {
    title: 'Bài tuyên truyền “Phòng, chống ma túy trong học đường”',
    publisher: 'Trường THCS Yên Nghĩa, Hà Nội',
    url: 'https://thcsyennghia.edu.vn/Tin-tuc-Su-kien/bai-tuyen-truyen-phong-chong-ma-tuy-trong-hoc-duong-742.html',
  },
  {
    title: 'Bài tuyên truyền phòng chống ma túy trong học đường',
    publisher: 'Trường THCS Phú Đông',
    url: 'http://thcsphudong.edu.vn/hoat-dong-giao-duc/hoat-dong-chung/bai-tuyen-truyen-phong-chong-ma-tuy-trong-hoc-duong.html',
  },
];
