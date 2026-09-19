// Chủ đề 2: Tác hại của ma túy với cơ thể, bản thân, gia đình, xã hội
const TF = ['Đúng', 'Sai'];

export default {
  id: 'tac-hai',
  title: 'Tác hại của ma túy',
  description: 'Ma túy tàn phá cơ thể và kéo theo hậu quả cho gia đình, xã hội.',
  grade: 8,
  questions: [
    {
      question: 'Ma túy có thể gây nguy hiểm gì cho hệ hô hấp?',
      options: [
        'Lúc đầu thở gấp, sau đó ức chế hô hấp, có thể ngưng thở và tử vong',
        'Giúp phổi khỏe, thở sâu hơn',
        'Không ảnh hưởng gì đến hô hấp',
        'Chỉ gây ho nhẹ rồi tự khỏi',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy kích thích làm thở nhanh trong thời gian ngắn, sau đó ức chế hô hấp. Nhiều trường hợp ngưng thở rất đột ngột, không cấp cứu kịp sẽ tử vong.',
    },
    {
      question: 'Ma túy tác động lên tim mạch như thế nào?',
      options: [
        'Tăng nhịp tim, tăng huyết áp, có thể gây đau thắt ngực, nhồi máu cơ tim',
        'Giúp tim đập đều và khỏe hơn',
        'Giúp hạ huyết áp an toàn',
        'Chỉ ảnh hưởng khi đã về già',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy làm tim đập nhanh, co thắt mạch vành gây đau thắt ngực, nặng hơn là nhồi máu cơ tim; còn gây rối loạn nhịp tim đe dọa tính mạng.',
    },
    {
      question: 'Tai biến nào có thể xảy ra với hệ thần kinh khi dùng ma túy?',
      options: [
        'Co giật, xuất huyết não, đột quỵ',
        'Thông minh hơn, nhớ bài lâu hơn',
        'Ngủ ngon, hết căng thẳng mãi mãi',
        'Tập trung tốt hơn khi đi thi',
      ],
      answerIndex: 0,
      explanation:
        'Cảm giác hưng phấn ban đầu chỉ là tạm thời; sau đó là lệ thuộc và nguy cơ co giật, xuất huyết não, đột quỵ.',
    },
    {
      question: 'Ma túy gây hại trực tiếp và mạnh nhất cho bộ phận nào của cơ thể?',
      options: ['Não bộ và hệ thần kinh', 'Tóc và móng tay', 'Xương bàn chân', 'Men răng'],
      answerIndex: 0,
      explanation:
        'Ma túy làm rối loạn cách não truyền tín hiệu, ảnh hưởng trí nhớ, cảm xúc, khả năng tập trung. Não tuổi học trò vẫn đang phát triển nên càng dễ bị tổn thương.',
    },
    {
      question: 'Ngoài tim, phổi và não, ma túy còn có thể gây hại nghiêm trọng cho cơ quan nào?',
      options: ['Gan', 'Tóc', 'Móng tay', 'Không cơ quan nào khác'],
      answerIndex: 0,
      explanation:
        'Ma túy có thể gây hoại tử tế bào gan. Người dùng còn có thể bị ảo thính, ảo thị: nghe và thấy những thứ không có thật.',
    },
    {
      question: 'Dùng chung bơm kim tiêm làm tăng nguy cơ lây nhiễm bệnh nào?',
      options: ['HIV và viêm gan B, C', 'Cận thị', 'Sâu răng', 'Cảm lạnh thông thường'],
      answerIndex: 0,
      explanation:
        'HIV và virus viêm gan B, C lây qua đường máu. Tiêm chích ma túy là một trong những con đường lây nhiễm HIV phổ biến nhất ở Việt Nam.',
    },
    {
      question: '“Bóng cười” (khí N₂O) có thể gây hại gì khi hít vào?',
      options: [
        'Thiếu oxy, tổn thương thần kinh, thậm chí tử vong',
        'Giúp tỉnh táo khi ôn thi',
        'Hoàn toàn vô hại vì chỉ là khí',
        'Giúp phổi khỏe hơn',
      ],
      answerIndex: 0,
      explanation:
        'Hít khí N₂O có thể làm thiếu oxy, gây choáng, ngất. Lạm dụng có thể tổn thương thần kinh, gây tê bì, yếu tay chân; trường hợp nặng có thể tử vong.',
    },
    {
      question: 'Với bản thân một học sinh, nghiện ma túy thường dẫn tới điều gì?',
      options: [
        'Học tập sa sút, dễ bỏ học, mâu thuẫn với thầy cô, bạn bè, gia đình',
        'Được bạn bè nể phục hơn',
        'Học giỏi hơn nhờ tỉnh táo',
        'Tự tin và có nhiều bạn tốt hơn',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy làm mất khả năng học tập, khiến người nghiện mất lòng tin của mọi người, dễ bị lợi dụng và ảnh hưởng cả tương lai.',
    },
    {
      question: 'Đúng hay sai: “Ma túy có thể làm thoái hóa nhân cách, khiến người nghiện dễ vi phạm pháp luật.”',
      options: TF,
      answerIndex: 0,
      fixed: true,
      explanation:
        'Đúng. Ma túy gây rối loạn hành vi, lối sống buông thả; để có tiền mua ma túy, nhiều người đã trộm cắp, lừa đảo hoặc phạm tội nghiêm trọng hơn.',
    },
    {
      question: 'Gia đình có người nghiện ma túy thường phải chịu hậu quả nào?',
      options: [
        'Kiệt quệ tiền bạc, người thân lo lắng, hạnh phúc có thể tan vỡ',
        'Kinh tế gia đình khá lên',
        'Không ảnh hưởng vì chỉ một người dùng',
        'Các thành viên gắn bó hơn',
      ],
      answerIndex: 0,
      explanation:
        'Người nghiện có thể tiêu hết tiền của, đồ đạc trong nhà; người thân mất ăn mất ngủ; gia đình tốn kém chữa bệnh và dễ rạn nứt.',
    },
    {
      question: 'Đối với xã hội, ma túy gây ra hậu quả gì?',
      options: [
        'Gia tăng trộm cắp, lừa đảo, làm mất trật tự an toàn xã hội',
        'Tạo thêm nhiều việc làm',
        'Giúp giảm chi phí y tế',
        'Làm đẹp thêm thuần phong mỹ tục',
      ],
      answerIndex: 0,
      explanation:
        'Ma túy kéo theo tội phạm và tệ nạn, làm giảm sức lao động và tốn kém ngân sách để phòng ngừa, khắc phục hậu quả.',
    },
    {
      question: 'Đúng hay sai: “Người nghiện ma túy cần được điều trị, giúp đỡ và không nên bị kỳ thị.”',
      options: TF,
      answerIndex: 0,
      fixed: true,
      explanation:
        'Đúng. Nghiện ma túy là bệnh mạn tính, dễ tái phát, cần điều trị lâu dài. Sự động viên của gia đình, bạn bè giúp họ có thêm động lực; kỳ thị khiến họ dễ quay lại con đường cũ.',
    },
  ],
};
