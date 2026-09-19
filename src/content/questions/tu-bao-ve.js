// Chủ đề 3: Học sinh cần làm gì — trách nhiệm và kỹ năng tự bảo vệ
const TF = ['Đúng', 'Sai'];

export default {
  id: 'tu-bao-ve',
  title: 'Kỹ năng tự bảo vệ',
  description: 'Việc học sinh cần làm, cách từ chối và xử lý tình huống.',
  grade: 8,
  questions: [
    {
      question: 'Việc nào sau đây học sinh tuyệt đối không được làm?',
      options: [
        'Sử dụng, vận chuyển, mua bán, tàng trữ trái phép chất ma túy',
        'Tham gia tuyên truyền phòng, chống ma túy ở trường',
        'Tìm hiểu tác hại của ma túy qua sách báo',
        'Động viên người đang cai nghiện',
      ],
      answerIndex: 0,
      explanation:
        'Đây là những hành vi bị pháp luật nghiêm cấm và có thể bị xử lý hình sự. Các việc còn lại đều là hành động tích cực.',
    },
    {
      question: 'Khi phát hiện người hoặc nhóm người có liên quan đến ma túy, em nên làm gì?',
      options: [
        'Báo ngay cho thầy cô, cha mẹ hoặc cơ quan Công an gần nhất',
        'Tự tìm cách ngăn chặn một mình',
        'Đăng lên mạng xã hội để cảnh báo',
        'Làm như không biết gì',
      ],
      answerIndex: 0,
      explanation:
        'Báo cho người lớn và Công an giúp xử lý kịp thời mà vẫn giữ an toàn cho em. Tự can thiệp có thể khiến em gặp nguy hiểm.',
    },
    {
      question: 'Đúng hay sai: “Rủ bạn thử chất lạ một lần cho biết thì không sao.”',
      options: TF,
      answerIndex: 1,
      fixed: true,
      explanation:
        'Sai. Học sinh không được xúi giục, lôi kéo người khác vào ma túy và các tệ nạn xã hội. Một lời rủ rê có thể đẩy bạn vào con đường nghiện ngập.',
    },
    {
      question: 'Thái độ đúng với người đang hoặc đã cai nghiện là gì?',
      options: [
        'Quan tâm, động viên, giúp họ hòa nhập cộng đồng',
        'Xa lánh, không nói chuyện',
        'Chế giễu để họ xấu hổ mà bỏ',
        'Kể cho mọi người biết để đề phòng',
      ],
      answerIndex: 0,
      explanation:
        'Sự quan tâm giúp người cai nghiện có động lực làm lại cuộc đời. Kỳ thị, xa lánh khiến họ dễ tái nghiện.',
    },
    {
      question: 'Cách nào giúp học sinh chủ động phòng tránh ma túy?',
      options: [
        'Tìm hiểu tác hại qua sách báo, thầy cô và tuyên truyền cho người thân',
        'Tò mò thử để hiểu rõ hơn',
        'Tin mọi lời quảng cáo trên mạng',
        'Tránh nói chuyện này với gia đình',
      ],
      answerIndex: 0,
      explanation:
        'Hiểu đúng giúp em nhận ra nguy cơ và ứng phó kịp thời, đồng thời có thể vận động mọi người cùng phòng tránh.',
    },
    {
      question:
        'Ở tiệc sinh nhật, một người bạn mời em uống thử “nước vui” và nói “một chút thôi, không sao đâu”. Em nên làm gì?',
      options: [
        'Từ chối dứt khoát, rời đi và kể với người lớn em tin tưởng',
        'Uống một ngụm cho bạn vui',
        'Cầm về nhà để xem thử sau',
        'Im lặng cho qua để không mất lòng bạn',
      ],
      answerIndex: 0,
      explanation:
        'Đồ uống, bánh kẹo không rõ nguồn gốc ở các buổi tiệc có thể bị trộn ma túy tổng hợp. Từ chối rõ ràng và rời đi là cách an toàn nhất.',
    },
    {
      question: 'Khi bị rủ rê thử chất gây nghiện, cách từ chối hiệu quả nhất là gì?',
      options: [
        'Nói “không” rõ ràng, nêu lý do ngắn gọn rồi rủ làm việc khác hoặc rời đi',
        'Viện lý do vòng vo để hẹn lần sau',
        'Gật đầu cho qua chuyện',
        'Cười trừ và đứng im',
      ],
      answerIndex: 0,
      explanation:
        'Lời từ chối càng rõ ràng càng khó bị ép. Nếu người kia tiếp tục ép, hãy rời đi; bạn tốt sẽ tôn trọng lựa chọn của em.',
    },
    {
      question: 'Em nghi ngờ bạn thân đang dùng ma túy. Cách làm đúng là gì?',
      options: [
        'Chia sẻ với thầy cô, cha mẹ hoặc người lớn tin cậy để cùng giúp bạn',
        'Giữ bí mật tuyệt đối để bạn không giận',
        'Tự đi theo dõi để bắt quả tang',
        'Kể cho cả lớp biết',
      ],
      answerIndex: 0,
      explanation:
        'Giúp bạn không có nghĩa là giữ bí mật. Người lớn biết tìm hỗ trợ phù hợp; tự theo dõi có thể khiến em gặp nguy hiểm, còn kể cho cả lớp làm bạn tổn thương.',
    },
    {
      question: 'Một người lạ nhờ em mang hộ một gói hàng nhỏ vào trường và hứa trả tiền. Em nên làm gì?',
      options: [
        'Từ chối và báo ngay cho thầy cô hoặc bác bảo vệ',
        'Nhận vì được trả tiền',
        'Mở gói hàng ra xem trước rồi quyết định',
        'Nhờ bạn khác mang hộ',
      ],
      answerIndex: 0,
      explanation:
        'Đối tượng xấu có thể lợi dụng học sinh để vận chuyển ma túy. Người mang hộ, dù không biết bên trong có gì, vẫn có thể gặp rắc rối lớn với pháp luật.',
    },
    {
      question: 'Khi thấy áp lực học tập hoặc buồn chán, lựa chọn nào giúp em khỏe mạnh hơn?',
      options: [
        'Chơi thể thao, tham gia câu lạc bộ và chia sẻ với người thân',
        'Thử chất kích thích để quên đi',
        'Thức trắng đêm chơi game',
        'Tự nhốt mình, không nói với ai',
      ],
      answerIndex: 0,
      explanation:
        'Vận động, sở thích lành mạnh và có người để tâm sự giúp giải tỏa căng thẳng. Nhiều người sa vào ma túy bắt đầu từ việc tìm cách “trốn” cảm xúc tiêu cực.',
    },
    {
      question: 'Đúng hay sai: “111 là Tổng đài quốc gia bảo vệ trẻ em, gọi miễn phí.”',
      options: TF,
      answerIndex: 0,
      fixed: true,
      explanation:
        'Đúng. Khi em hoặc bạn bè bị ép buộc, đe dọa, hãy gọi 111 (miễn phí). Nếu đang gặp nguy hiểm tức thời, gọi 113 để báo Công an.',
    },
  ],
};
