// Chủ đề 1: Nhận biết ma túy và thủ đoạn lôi kéo
const TF = ['Đúng', 'Sai'];

export default {
  id: 'nhan-biet',
  title: 'Nhận biết ma túy',
  description: 'Ma túy là gì, các loại thường gặp và thủ đoạn lôi kéo học sinh.',
  grade: 7,
  questions: [
    {
      question: 'Theo định nghĩa của Liên Hợp Quốc, ma túy là gì?',
      options: [
        'Chất tự nhiên hoặc nhân tạo, khi vào cơ thể làm thay đổi tâm trạng, ý thức và gây lệ thuộc',
        'Một loại thuốc bổ giúp tăng cường trí nhớ',
        'Tất cả các loại thuốc chữa bệnh bán ở hiệu thuốc',
        'Chất chỉ gây hại khi dùng với số lượng rất lớn',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy làm thay đổi tâm trạng, ý thức và khiến người dùng lệ thuộc, gây tổn thương cho bản thân và cộng đồng. Vì vậy pháp luật kiểm soát rất chặt việc sản xuất, mua bán, sử dụng.',
    },
    {
      question: 'Ma túy có nguồn gốc từ đâu?',
      options: [
        'Có loại từ tự nhiên, có loại do con người tổng hợp',
        'Chỉ được chiết xuất từ cây cỏ',
        'Chỉ được điều chế trong phòng thí nghiệm',
        'Chỉ có ở nước ngoài, Việt Nam không có',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy có thể có nguồn gốc tự nhiên (từ thực vật) hoặc nhân tạo (tổng hợp). Ma túy tổng hợp ngày càng nhiều và được ngụy trang rất tinh vi.',
    },
    {
      question: 'Nhóm nào dưới đây gồm toàn các chất ma túy?',
      options: [
        'Heroin, cần sa, ma túy đá, thuốc lắc',
        'Vitamin C, canxi, sắt, kẽm',
        'Trà xanh, cà phê, sữa, nước cam',
        'Muối, đường, bột ngọt, nước mắm',
      ],
      answerIndex: 0,
      explanation:
        'Heroin, cần sa, ma túy đá, thuốc lắc đều là ma túy đang xuất hiện ở Việt Nam, bên cạnh viên ma túy tổng hợp và các chất gây nghiện mới.',
    },
    {
      question: 'Kẻ buôn bán ma túy thường dụ dỗ học sinh bằng cách nào?',
      options: [
        'Cho dùng thử miễn phí, khi đã nghiện thì lợi dụng làm công cụ kiếm tiền',
        'Tặng học bổng đi du học',
        'Mời vào câu lạc bộ thể thao của trường',
        'Nhờ giảng bài hộ',
      ],
      answerIndex: 0,
      explanation:
        'Chúng cho dùng không mất tiền để tạo cơn nghiện. Khi đã nghiện, người dùng dễ bị đẩy vào trộm cắp, cướp giật, thậm chí mua bán ma túy.',
    },
    {
      question: 'Đúng hay sai: “Người sử dụng ma túy đang có xu hướng trẻ hóa, lan tới cả tuổi vị thành niên và học sinh.”',
      options: TF,
      answerIndex: 0,
      fixed: true,
      explanation:
        'Đúng. Đây là điều đáng báo động, nên học sinh THCS càng cần hiểu rõ để tự bảo vệ mình.',
    },
    {
      question: 'Ngày Quốc tế phòng, chống ma túy là ngày nào trong năm?',
      options: ['26/6', '1/12', '31/5', '20/11'],
      answerIndex: 0,
      explanation:
        'Ngày 26/6 hằng năm là Ngày Quốc tế phòng, chống ma túy. Ở Việt Nam, tháng 6 là Tháng hành động phòng, chống ma túy. (1/12 là Ngày Thế giới phòng, chống AIDS; 31/5 là Ngày Thế giới không thuốc lá.)',
    },
    {
      question: 'Kẻ xấu thường ngụy trang ma túy dưới dạng nào để dụ học sinh?',
      options: [
        'Kẹo, bánh hoặc trà sữa có màu sắc bắt mắt',
        'Tem giấy nhỏ in hình hoạt hình',
        'Tinh dầu thuốc lá điện tử',
        'Tất cả các dạng trên',
      ],
      answerIndex: 3,
      fixed: true,
      explanation:
        'Các dạng này đều từng bị phát hiện chứa ma túy tổng hợp. Không nhận đồ ăn, đồ uống, tinh dầu từ người lạ hoặc khi không rõ nguồn gốc, dù trông vô hại đến đâu.',
    },
    {
      question: 'Đúng hay sai: “Thử ma túy một lần thì không thể bị nghiện.”',
      options: TF,
      answerIndex: 1,
      fixed: true,
      explanation:
        'Sai. Nhiều loại ma túy, nhất là ma túy tổng hợp, gây lệ thuộc rất nhanh; ngay lần đầu cũng có thể ngộ độc hoặc loạn thần. “Thử một lần thôi” là câu kẻ xấu hay dùng để lôi kéo.',
    },
    {
      question: 'Đúng hay sai: “Thuốc lá điện tử chỉ có mùi thơm, không gây nghiện.”',
      options: TF,
      answerIndex: 1,
      fixed: true,
      explanation:
        'Sai. Phần lớn tinh dầu thuốc lá điện tử chứa nicotine, một chất gây nghiện; đã có nhiều trường hợp tinh dầu bị trộn ma túy tổng hợp.',
    },
  ],
};
