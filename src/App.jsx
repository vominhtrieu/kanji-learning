import { useEffect, useState } from "react";
import { Brush, Check, ChevronLeft, ChevronRight, Pencil, Play, RotateCcw, Star } from "lucide-react";
import { kanjiComponents } from "./kanjiComponents.js";

const n5Cards = [
  { kanji: "\u65e5", hanViet: "Nh\u1eadt", meaning: "ng\u00e0y, m\u1eb7t tr\u1eddi" },
  { kanji: "\u4e00", hanViet: "Nh\u1ea5t", meaning: "m\u1ed9t" },
  { kanji: "\u56fd", hanViet: "Qu\u1ed1c", meaning: "\u0111\u1ea5t n\u01b0\u1edbc" },
  { kanji: "\u4eba", hanViet: "Nh\u00e2n", meaning: "ng\u01b0\u1eddi" },
  { kanji: "\u5e74", hanViet: "Ni\u00ean", meaning: "n\u0103m" },
  { kanji: "\u5927", hanViet: "\u0110\u1ea1i", meaning: "to, l\u1edbn" },
  { kanji: "安", hanViet: "An/Yên", meaning: "yên, rẻ, an toàn" },
  { kanji: "\u5341", hanViet: "Th\u1eadp", meaning: "m\u01b0\u1eddi" },
  { kanji: "\u4e8c", hanViet: "Nh\u1ecb", meaning: "hai" },
  { kanji: "\u672c", hanViet: "B\u1ea3n", meaning: "s\u00e1ch, g\u1ed1c" },
  { kanji: "\u4e2d", hanViet: "Trung", meaning: "\u1edf gi\u1eefa, b\u00ean trong" },
  { kanji: "\u9577", hanViet: "Tr\u01b0\u1eddng/Tr\u01b0\u1edfng", meaning: "d\u00e0i, ng\u01b0\u1eddi \u0111\u1ee9ng \u0111\u1ea7u" },
  { kanji: "\u51fa", hanViet: "Xu\u1ea5t", meaning: "ra, \u0111i ra" },
  { kanji: "\u4e09", hanViet: "Tam", meaning: "ba" },
  { kanji: "\u6642", hanViet: "Th\u1eddi", meaning: "th\u1eddi gian, gi\u1edd" },
  { kanji: "\u884c", hanViet: "H\u00e0nh", meaning: "\u0111i, h\u00e0ng/d\u00f2ng" },
  { kanji: "\u898b", hanViet: "Ki\u1ebfn", meaning: "nh\u00ecn, xem" },
  { kanji: "言", hanViet: "Ngôn", meaning: "nói, lời" },
  { kanji: "\u6708", hanViet: "Nguy\u1ec7t", meaning: "th\u00e1ng, m\u1eb7t tr\u0103ng" },
  { kanji: "\u5206", hanViet: "Ph\u00e2n", meaning: "ph\u1ea7n, ph\u00fat" },
  { kanji: "\u5f8c", hanViet: "H\u1eadu", meaning: "sau" },
  { kanji: "\u524d", hanViet: "Ti\u1ec1n", meaning: "tr\u01b0\u1edbc" },
  { kanji: "\u751f", hanViet: "Sinh", meaning: "s\u1ed1ng, sinh ra" },
  { kanji: "\u4e94", hanViet: "Ng\u0169", meaning: "n\u0103m" },
  { kanji: "\u9593", hanViet: "Gian", meaning: "kho\u1ea3ng, gi\u1eefa" },
  { kanji: "\u4e0a", hanViet: "Th\u01b0\u1ee3ng", meaning: "tr\u00ean" },
  { kanji: "\u6771", hanViet: "\u0110\u00f4ng", meaning: "ph\u00eda \u0111\u00f4ng" },
  { kanji: "\u56db", hanViet: "T\u1ee9", meaning: "b\u1ed1n" },
  { kanji: "\u4eca", hanViet: "Kim", meaning: "b\u00e2y gi\u1edd" },
  { kanji: "\u91d1", hanViet: "Kim", meaning: "v\u00e0ng, ti\u1ec1n" },
  { kanji: "\u4e5d", hanViet: "C\u1eedu", meaning: "ch\u00edn" },
  { kanji: "\u5165", hanViet: "Nh\u1eadp", meaning: "v\u00e0o" },
  { kanji: "\u5b66", hanViet: "H\u1ecdc", meaning: "h\u1ecdc" },
  { kanji: "\u9ad8", hanViet: "Cao", meaning: "cao, \u0111\u1eaft" },
  { kanji: "会", hanViet: "Hội", meaning: "gặp, hội họp" },
  { kanji: "\u5186", hanViet: "Vi\u00ean", meaning: "y\u00ean, tr\u00f2n" },
  { kanji: "\u5b50", hanViet: "T\u1eed", meaning: "con, tr\u1ebb em" },
  { kanji: "\u5916", hanViet: "Ngo\u1ea1i", meaning: "b\u00ean ngo\u00e0i" },
  { kanji: "\u516b", hanViet: "B\u00e1t", meaning: "t\u00e1m" },
  { kanji: "\u516d", hanViet: "L\u1ee5c", meaning: "s\u00e1u" },
  { kanji: "\u4e0b", hanViet: "H\u1ea1", meaning: "d\u01b0\u1edbi" },
  { kanji: "\u6765", hanViet: "Lai", meaning: "\u0111\u1ebfn" },
  { kanji: "\u6c17", hanViet: "Kh\u00ed", meaning: "kh\u00ed, tinh th\u1ea7n" },
  { kanji: "\u5c0f", hanViet: "Ti\u1ec3u", meaning: "nh\u1ecf" },
  { kanji: "\u4e03", hanViet: "Th\u1ea5t", meaning: "b\u1ea3y" },
  { kanji: "\u5c71", hanViet: "S\u01a1n", meaning: "n\u00fai" },
  { kanji: "\u8a71", hanViet: "Tho\u1ea1i", meaning: "n\u00f3i chuy\u1ec7n, c\u00e2u chuy\u1ec7n" },
  { kanji: "\u5973", hanViet: "N\u1eef", meaning: "ph\u1ee5 n\u1eef" },
  { kanji: "\u5317", hanViet: "B\u1eafc", meaning: "ph\u00eda b\u1eafc" },
  { kanji: "\u5348", hanViet: "Ng\u1ecd", meaning: "bu\u1ed5i tr\u01b0a" },
  { kanji: "\u767e", hanViet: "B\u00e1ch", meaning: "m\u1ed9t tr\u0103m" },
  { kanji: "口", hanViet: "Khẩu", meaning: "miệng" },
  { kanji: "\u66f8", hanViet: "Th\u01b0", meaning: "vi\u1ebft" },
  { kanji: "\u5148", hanViet: "Ti\u00ean", meaning: "tr\u01b0\u1edbc, ph\u00eda tr\u01b0\u1edbc" },
  { kanji: "\u540d", hanViet: "Danh", meaning: "t\u00ean" },
  { kanji: "耳", hanViet: "Nhĩ", meaning: "tai" },
  { kanji: "\u5ddd", hanViet: "Xuy\u00ean", meaning: "s\u00f4ng" },
  { kanji: "\u5343", hanViet: "Thi\u00ean", meaning: "m\u1ed9t ngh\u00ecn" },
  { kanji: "\u6c34", hanViet: "Th\u1ee7y", meaning: "n\u01b0\u1edbc" },
  { kanji: "\u534a", hanViet: "B\u00e1n", meaning: "m\u1ed9t n\u1eeda" },
  { kanji: "\u7537", hanViet: "Nam", meaning: "\u0111\u00e0n \u00f4ng" },
  { kanji: "\u897f", hanViet: "T\u00e2y", meaning: "ph\u00eda t\u00e2y" },
  { kanji: "\u96fb", hanViet: "\u0110i\u1ec7n", meaning: "\u0111i\u1ec7n" },
  { kanji: "\u6821", hanViet: "Hi\u1ec7u", meaning: "tr\u01b0\u1eddng h\u1ecdc" },
  { kanji: "\u8a9e", hanViet: "Ng\u1eef", meaning: "ng\u00f4n ng\u1eef" },
  { kanji: "\u571f", hanViet: "Th\u1ed5", meaning: "\u0111\u1ea5t, th\u1ee9 b\u1ea3y" },
  { kanji: "\u6728", hanViet: "M\u1ed9c", meaning: "c\u00e2y, g\u1ed7" },
  { kanji: "\u805e", hanViet: "V\u0103n", meaning: "nghe, h\u1ecfi" },
  { kanji: "\u98df", hanViet: "Th\u1ef1c", meaning: "\u0103n" },
  { kanji: "\u8eca", hanViet: "Xa", meaning: "xe" },
  { kanji: "\u4f55", hanViet: "H\u00e0", meaning: "c\u00e1i g\u00ec" },
  { kanji: "\u5357", hanViet: "Nam", meaning: "ph\u00eda nam" },
  { kanji: "\u4e07", hanViet: "V\u1ea1n", meaning: "m\u01b0\u1eddi ngh\u00ecn" },
  { kanji: "\u6bce", hanViet: "M\u1ed7i", meaning: "m\u1ed7i" },
  { kanji: "\u767d", hanViet: "B\u1ea1ch", meaning: "tr\u1eafng" },
  { kanji: "\u5929", hanViet: "Thi\u00ean", meaning: "tr\u1eddi" },
  { kanji: "\u6bcd", hanViet: "M\u1eabu", meaning: "m\u1eb9" },
  { kanji: "\u706b", hanViet: "H\u1ecfa", meaning: "l\u1eeda, th\u1ee9 ba" },
  { kanji: "\u53f3", hanViet: "H\u1eefu", meaning: "b\u00ean ph\u1ea3i" },
  { kanji: "飲", hanViet: "Ẩm", meaning: "uống" },
  { kanji: "\u8aad", hanViet: "\u0110\u1ed9c", meaning: "\u0111\u1ecdc" },
  { kanji: "\u53cb", hanViet: "H\u1eefu", meaning: "b\u1ea1n" },
  { kanji: "\u5de6", hanViet: "T\u1ea3", meaning: "b\u00ean tr\u00e1i" },
  { kanji: "\u4f11", hanViet: "H\u01b0u", meaning: "ngh\u1ec9" },
  { kanji: "\u7236", hanViet: "Ph\u1ee5", meaning: "b\u1ed1" },
  { kanji: "\u96e8", hanViet: "V\u0169", meaning: "m\u01b0a" },
  { kanji: "駅", hanViet: "Dịch", meaning: "nhà ga" },
  { kanji: "花", hanViet: "Hoa", meaning: "hoa" },
  { kanji: "魚", hanViet: "Ngư", meaning: "cá" },
  { kanji: "空", hanViet: "Không", meaning: "trống, bầu trời" },
  { kanji: "古", hanViet: "Cổ", meaning: "cũ" },
  { kanji: "社", hanViet: "Xã", meaning: "công ty, đền thờ" },
  { kanji: "手", hanViet: "Thủ", meaning: "tay" },
  { kanji: "週", hanViet: "Chu", meaning: "tuần" },
  { kanji: "新", hanViet: "Tân", meaning: "mới" },
  { kanji: "少", hanViet: "Thiểu", meaning: "ít" },
  { kanji: "足", hanViet: "Túc", meaning: "chân, đủ" },
  { kanji: "多", hanViet: "Đa", meaning: "nhiều" },
  { kanji: "店", hanViet: "Điếm", meaning: "cửa hàng" },
  { kanji: "道", hanViet: "Đạo", meaning: "đường, đạo" },
  { kanji: "買", hanViet: "Mãi", meaning: "mua" },
  { kanji: "目", hanViet: "Mục", meaning: "mắt, mục" },
  { kanji: "立", hanViet: "Lập", meaning: "đứng, dựng lên" },
];

const n4Cards = [
  { kanji: "会", hanViet: "Hội", meaning: "gặp, hội họp" },
  { kanji: "同", hanViet: "Đồng", meaning: "giống nhau, cùng" },
  { kanji: "事", hanViet: "Sự", meaning: "việc, sự việc" },
  { kanji: "自", hanViet: "Tự", meaning: "tự mình" },
  { kanji: "社", hanViet: "Xã", meaning: "công ty, đền thờ" },
  { kanji: "発", hanViet: "Phát", meaning: "phát ra, khởi hành" },
  { kanji: "者", hanViet: "Giả", meaning: "người" },
  { kanji: "地", hanViet: "Địa", meaning: "đất, mặt đất" },
  { kanji: "業", hanViet: "Nghiệp", meaning: "nghề, công việc" },
  { kanji: "方", hanViet: "Phương", meaning: "phương hướng, người" },
  { kanji: "新", hanViet: "Tân", meaning: "mới" },
  { kanji: "場", hanViet: "Trường", meaning: "nơi, địa điểm" },
  { kanji: "員", hanViet: "Viên", meaning: "thành viên, nhân viên" },
  { kanji: "立", hanViet: "Lập", meaning: "đứng, dựng lên" },
  { kanji: "開", hanViet: "Khai", meaning: "mở" },
  { kanji: "手", hanViet: "Thủ", meaning: "tay" },
  { kanji: "力", hanViet: "Lực", meaning: "sức mạnh" },
  { kanji: "問", hanViet: "Vấn", meaning: "hỏi, vấn đề" },
  { kanji: "代", hanViet: "Đại", meaning: "thay thế, thời đại" },
  { kanji: "明", hanViet: "Minh", meaning: "sáng, rõ" },
  { kanji: "動", hanViet: "Động", meaning: "chuyển động" },
  { kanji: "京", hanViet: "Kinh", meaning: "kinh đô" },
  { kanji: "目", hanViet: "Mục", meaning: "mắt, mục" },
  { kanji: "通", hanViet: "Thông", meaning: "đi qua, thông suốt" },
  { kanji: "言", hanViet: "Ngôn", meaning: "nói, lời" },
  { kanji: "理", hanViet: "Lý", meaning: "lý do, lẽ phải" },
  { kanji: "体", hanViet: "Thể", meaning: "cơ thể" },
  { kanji: "田", hanViet: "Điền", meaning: "ruộng" },
  { kanji: "主", hanViet: "Chủ", meaning: "chính, chủ" },
  { kanji: "題", hanViet: "Đề", meaning: "chủ đề, đề bài" },
  { kanji: "意", hanViet: "Ý", meaning: "ý, tâm ý" },
  { kanji: "不", hanViet: "Bất", meaning: "không, bất-" },
  { kanji: "作", hanViet: "Tác", meaning: "làm, tạo" },
  { kanji: "用", hanViet: "Dụng", meaning: "dùng, việc dùng" },
  { kanji: "度", hanViet: "Độ", meaning: "độ, lần" },
  { kanji: "強", hanViet: "Cường", meaning: "mạnh" },
  { kanji: "公", hanViet: "Công", meaning: "công, công cộng" },
  { kanji: "持", hanViet: "Trì", meaning: "cầm, có" },
  { kanji: "野", hanViet: "Dã", meaning: "đồng, cánh đồng" },
  { kanji: "以", hanViet: "Dĩ", meaning: "bằng, lấy làm" },
  { kanji: "思", hanViet: "Tư", meaning: "nghĩ" },
  { kanji: "家", hanViet: "Gia", meaning: "nhà, gia đình" },
  { kanji: "世", hanViet: "Thế", meaning: "đời, thế giới" },
  { kanji: "多", hanViet: "Đa", meaning: "nhiều" },
  { kanji: "正", hanViet: "Chính", meaning: "đúng, chính" },
  { kanji: "安", hanViet: "An", meaning: "yên, rẻ" },
  { kanji: "院", hanViet: "Viện", meaning: "viện, cơ sở" },
  { kanji: "心", hanViet: "Tâm", meaning: "tim, tâm trí" },
  { kanji: "界", hanViet: "Giới", meaning: "thế giới, ranh giới" },
  { kanji: "教", hanViet: "Giáo", meaning: "dạy, giáo lý" },
  { kanji: "文", hanViet: "Văn", meaning: "văn, câu" },
  { kanji: "元", hanViet: "Nguyên", meaning: "gốc, ban đầu" },
  { kanji: "重", hanViet: "Trọng", meaning: "nặng, quan trọng" },
  { kanji: "近", hanViet: "Cận", meaning: "gần" },
  { kanji: "考", hanViet: "Khảo", meaning: "suy nghĩ, xem xét" },
  { kanji: "画", hanViet: "Họa/Hoạch", meaning: "tranh, nét vẽ, kế hoạch" },
  { kanji: "海", hanViet: "Hải", meaning: "biển" },
  { kanji: "売", hanViet: "Mại", meaning: "bán" },
  { kanji: "知", hanViet: "Tri", meaning: "biết" },
  { kanji: "道", hanViet: "Đạo", meaning: "đường, đạo" },
  { kanji: "集", hanViet: "Tập", meaning: "tập hợp" },
  { kanji: "別", hanViet: "Biệt", meaning: "khác, chia tách" },
  { kanji: "物", hanViet: "Vật", meaning: "vật, đồ vật" },
  { kanji: "使", hanViet: "Sử", meaning: "dùng, sai khiến" },
  { kanji: "品", hanViet: "Phẩm", meaning: "hàng hóa, phẩm chất" },
  { kanji: "計", hanViet: "Kế", meaning: "đo, kế hoạch" },
  { kanji: "死", hanViet: "Tử", meaning: "chết" },
  { kanji: "特", hanViet: "Đặc", meaning: "đặc biệt" },
  { kanji: "私", hanViet: "Tư", meaning: "tôi, riêng tư" },
  { kanji: "始", hanViet: "Thủy", meaning: "bắt đầu" },
  { kanji: "朝", hanViet: "Triều", meaning: "buổi sáng" },
  { kanji: "運", hanViet: "Vận", meaning: "vận chuyển, vận may" },
  { kanji: "終", hanViet: "Chung", meaning: "kết thúc" },
  { kanji: "台", hanViet: "Đài", meaning: "bệ, quầy, máy" },
  { kanji: "広", hanViet: "Quảng", meaning: "rộng" },
  { kanji: "住", hanViet: "Trụ", meaning: "sống, cư trú" },
  { kanji: "無", hanViet: "Vô", meaning: "không có" },
  { kanji: "真", hanViet: "Chân", meaning: "thật" },
  { kanji: "有", hanViet: "Hữu", meaning: "có" },
  { kanji: "口", hanViet: "Khẩu", meaning: "miệng" },
  { kanji: "少", hanViet: "Thiểu", meaning: "ít" },
  { kanji: "町", hanViet: "Đinh", meaning: "thị trấn, phố" },
  { kanji: "料", hanViet: "Liệu", meaning: "phí, vật liệu" },
  { kanji: "工", hanViet: "Công", meaning: "công việc, chế tạo" },
  { kanji: "建", hanViet: "Kiến", meaning: "xây dựng" },
  { kanji: "空", hanViet: "Không", meaning: "trống, bầu trời" },
  { kanji: "急", hanViet: "Cấp", meaning: "gấp, khẩn cấp" },
  { kanji: "止", hanViet: "Chỉ", meaning: "dừng" },
  { kanji: "送", hanViet: "Tống", meaning: "gửi, tiễn" },
  { kanji: "切", hanViet: "Thiết", meaning: "cắt" },
  { kanji: "転", hanViet: "Chuyển", meaning: "xoay, chuyển" },
  { kanji: "研", hanViet: "Nghiên", meaning: "mài, nghiên cứu" },
  { kanji: "足", hanViet: "Túc", meaning: "chân, đủ" },
  { kanji: "究", hanViet: "Cứu", meaning: "nghiên cứu" },
  { kanji: "楽", hanViet: "Lạc/Nhạc", meaning: "vui, âm nhạc" },
  { kanji: "起", hanViet: "Khởi", meaning: "thức dậy, khởi lên" },
  { kanji: "着", hanViet: "Trước", meaning: "mặc, đến nơi" },
  { kanji: "店", hanViet: "Điếm", meaning: "cửa hàng" },
  { kanji: "病", hanViet: "Bệnh", meaning: "bệnh" },
  { kanji: "質", hanViet: "Chất", meaning: "chất, chất lượng" },
  { kanji: "待", hanViet: "Đãi", meaning: "đợi" },
  { kanji: "試", hanViet: "Thí", meaning: "thử, kiểm tra" },
  { kanji: "族", hanViet: "Tộc", meaning: "gia tộc, nhóm" },
  { kanji: "銀", hanViet: "Ngân", meaning: "bạc" },
  { kanji: "早", hanViet: "Tảo", meaning: "sớm, nhanh" },
  { kanji: "映", hanViet: "Ánh", meaning: "phản chiếu, chiếu phim" },
  { kanji: "親", hanViet: "Thân", meaning: "cha mẹ, thân thiết" },
  { kanji: "験", hanViet: "Nghiệm", meaning: "kiểm nghiệm, hiệu quả" },
  { kanji: "英", hanViet: "Anh", meaning: "Anh, ưu tú" },
  { kanji: "医", hanViet: "Y", meaning: "y học, bác sĩ" },
  { kanji: "仕", hanViet: "Sĩ", meaning: "phục vụ, làm việc" },
  { kanji: "去", hanViet: "Khứ", meaning: "đi khỏi, quá khứ" },
  { kanji: "味", hanViet: "Vị", meaning: "vị, hương vị" },
  { kanji: "写", hanViet: "Tả", meaning: "chép, chụp ảnh" },
  { kanji: "字", hanViet: "Tự", meaning: "chữ" },
  { kanji: "答", hanViet: "Đáp", meaning: "trả lời, đáp án" },
  { kanji: "夜", hanViet: "Dạ", meaning: "đêm" },
  { kanji: "音", hanViet: "Âm", meaning: "âm thanh" },
  { kanji: "注", hanViet: "Chú", meaning: "rót, chú ý" },
  { kanji: "帰", hanViet: "Quy", meaning: "trở về" },
  { kanji: "古", hanViet: "Cổ", meaning: "cũ" },
  { kanji: "歌", hanViet: "Ca", meaning: "bài hát, hát" },
  { kanji: "買", hanViet: "Mãi", meaning: "mua" },
  { kanji: "悪", hanViet: "Ác", meaning: "xấu, ác" },
  { kanji: "図", hanViet: "Đồ", meaning: "bản đồ, hình vẽ" },
  { kanji: "週", hanViet: "Chu", meaning: "tuần" },
  { kanji: "室", hanViet: "Thất", meaning: "phòng" },
  { kanji: "歩", hanViet: "Bộ", meaning: "đi bộ, bước" },
  { kanji: "風", hanViet: "Phong", meaning: "gió, phong cách" },
  { kanji: "紙", hanViet: "Chỉ", meaning: "giấy" },
  { kanji: "黒", hanViet: "Hắc", meaning: "đen" },
  { kanji: "花", hanViet: "Hoa", meaning: "hoa" },
  { kanji: "春", hanViet: "Xuân", meaning: "mùa xuân" },
  { kanji: "赤", hanViet: "Xích", meaning: "đỏ" },
  { kanji: "青", hanViet: "Thanh", meaning: "xanh" },
  { kanji: "館", hanViet: "Quán", meaning: "tòa nhà, quán" },
  { kanji: "屋", hanViet: "Ốc", meaning: "nhà, cửa hàng" },
  { kanji: "色", hanViet: "Sắc", meaning: "màu sắc" },
  { kanji: "走", hanViet: "Tẩu", meaning: "chạy" },
  { kanji: "秋", hanViet: "Thu", meaning: "mùa thu" },
  { kanji: "夏", hanViet: "Hạ", meaning: "mùa hè" },
  { kanji: "習", hanViet: "Tập", meaning: "học, luyện tập" },
  { kanji: "駅", hanViet: "Dịch", meaning: "nhà ga" },
  { kanji: "洋", hanViet: "Dương", meaning: "biển, phương Tây" },
  { kanji: "旅", hanViet: "Lữ", meaning: "du lịch" },
  { kanji: "服", hanViet: "Phục", meaning: "quần áo" },
  { kanji: "夕", hanViet: "Tịch", meaning: "chiều tối" },
  { kanji: "借", hanViet: "Tá", meaning: "mượn, thuê" },
  { kanji: "曜", hanViet: "Diệu", meaning: "ngày trong tuần" },
  { kanji: "飲", hanViet: "Ẩm", meaning: "uống" },
  { kanji: "肉", hanViet: "Nhục", meaning: "thịt" },
  { kanji: "貸", hanViet: "Thải", meaning: "cho mượn" },
  { kanji: "堂", hanViet: "Đường", meaning: "sảnh, nhà lớn" },
  { kanji: "鳥", hanViet: "Điểu", meaning: "chim" },
  { kanji: "飯", hanViet: "Phạn", meaning: "cơm, bữa ăn" },
  { kanji: "勉", hanViet: "Miễn", meaning: "cố gắng" },
  { kanji: "冬", hanViet: "Đông", meaning: "mùa đông" },
  { kanji: "昼", hanViet: "Trú", meaning: "ban ngày, buổi trưa" },
  { kanji: "茶", hanViet: "Trà", meaning: "trà" },
  { kanji: "弟", hanViet: "Đệ", meaning: "em trai" },
  { kanji: "牛", hanViet: "Ngưu", meaning: "bò" },
  { kanji: "魚", hanViet: "Ngư", meaning: "cá" },
  { kanji: "兄", hanViet: "Huynh", meaning: "anh trai" },
  { kanji: "犬", hanViet: "Khuyển", meaning: "chó" },
  { kanji: "妹", hanViet: "Muội", meaning: "em gái" },
  { kanji: "姉", hanViet: "Tỉ", meaning: "chị gái" },
  { kanji: "漢", hanViet: "Hán", meaning: "Hán, Trung Quốc" },
  { kanji: "暗", hanViet: "Ám", meaning: "tối" },
  { kanji: "引", hanViet: "Dẫn", meaning: "kéo, giảm giá" },
  { kanji: "遠", hanViet: "Viễn", meaning: "xa" },
  { kanji: "回", hanViet: "Hồi", meaning: "lần, xoay vòng" },
  { kanji: "寒", hanViet: "Hàn", meaning: "lạnh" },
  { kanji: "顔", hanViet: "Nhan", meaning: "khuôn mặt" },
  { kanji: "区", hanViet: "Khu", meaning: "khu, quận" },
  { kanji: "軽", hanViet: "Khinh", meaning: "nhẹ" },
  { kanji: "県", hanViet: "Huyện", meaning: "tỉnh" },
  { kanji: "光", hanViet: "Quang", meaning: "ánh sáng" },
  { kanji: "好", hanViet: "Hảo/Hiếu", meaning: "thích, tốt" },
  { kanji: "合", hanViet: "Hợp", meaning: "hợp, nối lại" },
  { kanji: "菜", hanViet: "Thái", meaning: "rau" },
  { kanji: "産", hanViet: "Sản", meaning: "sinh sản, sản xuất" },
  { kanji: "市", hanViet: "Thị", meaning: "thành phố, chợ" },
  { kanji: "弱", hanViet: "Nhược", meaning: "yếu" },
  { kanji: "首", hanViet: "Thủ", meaning: "cổ, đầu" },
  { kanji: "所", hanViet: "Sở", meaning: "nơi, chỗ" },
  { kanji: "暑", hanViet: "Thử", meaning: "nóng" },
  { kanji: "乗", hanViet: "Thừa", meaning: "lên xe, cưỡi" },
  { kanji: "森", hanViet: "Sâm", meaning: "rừng rậm" },
  { kanji: "進", hanViet: "Tiến", meaning: "tiến lên" },
  { kanji: "声", hanViet: "Thanh", meaning: "giọng nói, tiếng" },
  { kanji: "説", hanViet: "Thuyết", meaning: "giải thích, học thuyết" },
  { kanji: "洗", hanViet: "Tẩy", meaning: "rửa" },
  { kanji: "村", hanViet: "Thôn", meaning: "làng" },
  { kanji: "太", hanViet: "Thái", meaning: "to, dày" },
  { kanji: "短", hanViet: "Đoản", meaning: "ngắn" },
  { kanji: "池", hanViet: "Trì", meaning: "ao, hồ" },
  { kanji: "低", hanViet: "Đê", meaning: "thấp" },
  { kanji: "都", hanViet: "Đô", meaning: "thủ đô, đô thị" },
  { kanji: "頭", hanViet: "Đầu", meaning: "đầu" },
  { kanji: "働", hanViet: "Động", meaning: "làm việc" },
  { kanji: "便", hanViet: "Tiện/Biện", meaning: "tiện lợi, thư tín" },
  { kanji: "民", hanViet: "Dân", meaning: "người dân" },
  { kanji: "門", hanViet: "Môn", meaning: "cổng" },
  { kanji: "薬", hanViet: "Dược", meaning: "thuốc" },
  { kanji: "林", hanViet: "Lâm", meaning: "rừng thưa" },
];

const n4SourceKanji = "悪暗医意以引院員運英映遠屋音歌夏家画海回開界楽館漢寒顔帰起究急牛去強教京業近銀区計兄軽犬研県建験元工広考光好合黒菜作産紙思姉止市仕死使始試私字自事持室質写者借弱首主秋集習終住重春所暑場乗色森心親真進図青正声世赤夕切説洗早走送族村体太待貸台代題短知地池茶着昼注町鳥朝通弟低転田都度答冬頭同動堂働特肉売発飯病品不風服物文別勉便歩方妹味民明門問夜野薬有曜用洋理旅料力林";
const n4SourceSet = new Set([...n4SourceKanji]);
const n5KanjiSet = new Set(n5Cards.map((card) => card.kanji));
const n4OnlyCards = n4Cards.filter((card) => n4SourceSet.has(card.kanji) && !n5KanjiSet.has(card.kanji));

const decks = {
  n5: n5Cards,
  n4: n4OnlyCards,
};

const allCards = [...n5Cards, ...n4OnlyCards];

const LISTS = {
  all: "Tất cả",
  n5: "Kanji N5",
  n4: "Kanji N4",
  favorites: "Yêu thích",
  learned: "Đã thuộc",
  tree: "Cây Kanji",
};

const LIST_ROUTES = {
  all: "/all",
  n5: "/n5",
  n4: "/n4",
  favorites: "/favorites",
  learned: "/learned",
  tree: "/tree",
};

const ROUTE_LISTS = Object.fromEntries(Object.entries(LIST_ROUTES).map(([key, path]) => [path, key]));

const LABELS = {
  list: "Danh sách",
  favorite: "Yêu thích",
  learned: "Đã thuộc",
  empty: "Chưa có thẻ trong danh sách này.",
  showAnswer: "Hiện đáp án",
  hideAnswer: "Ẩn đáp án",
  controls: "Điều khiển flashcard",
  writingMode: "Luyện viết",
  strokeOrder: "Thứ tự nét",
  previous: "Thẻ trước",
  shuffle: "Xáo trộn",
  next: "Thẻ sau",
  revealOrNext: "Hiện nghĩa / thẻ sau",
};

const SHORTCUTS = {
  previous: "←",
  favorite: "F",
  strokeOrder: "S",
  shuffle: "R",
  revealOrNext: "Space",
  learned: "D",
  next: "→",
};

const FAVORITES_KEY = "kanji-n5-favorites";
const LEARNED_KEY = "kanji-n5-learned";
const STROKE_DELAY_SECONDS = 0.31;
const STROKE_DRAW_SECONDS = 0.46;
const STROKE_REPLAY_PAUSE_MS = 5000;

// Các nhóm "Bộ/Thành phần" lấy thành viên từ kanjiComponents (KanjiVG).
// Trường kanji chỉ quyết định thành viên cho các nhóm chủ đề có tên bắt đầu bằng "Nhóm".
// Trường include dành cho ngoại lệ đã được xác nhận thủ công.
const KANJI_TREE_GROUPS = [
  { root: "口", title: "Bộ Khẩu", kanji: "口右古名同問品員兄知始台味答歌堂合" },
  { root: "目", title: "Bộ Mục", kanji: "目見親真着県" },
  { root: "貝", title: "Bộ Bối", kanji: "買員質貸" },
  { root: "頁", title: "Bộ Hiệt", kanji: "題顔頭" },
  { root: "耳", title: "Bộ Nhĩ", kanji: "耳聞取" },
  { root: "走", title: "Bộ Tẩu", kanji: "走起" },
  { root: "日", title: "Bộ Nhật", kanji: "日明時曜間春者音題早映暗暑昼朝書" },
  { root: "白", title: "Bộ Bạch", kanji: "白百習" },
  { root: "月", title: "Bộ Nguyệt", kanji: "月明朝服有青用肉" },
  { root: "木", title: "Bộ Mộc", kanji: "木本休体林森東楽校来村新業集" },
  { root: "人", title: "Bộ Nhân", kanji: "人入休体今会何作使住代他仕働低便借以" },
  { root: "宀", title: "Bộ Miên", kanji: "安字室家寒院館写" },
  { root: "女", title: "Bộ Nữ", kanji: "女好安姉妹始" },
  { root: "子", title: "Bộ Tử", kanji: "子字学好" },
  { root: "心", title: "Bộ Tâm", kanji: "心思悪意急" },
  { root: "田", title: "Bộ Điền", kanji: "田男町思界番画" },
  { root: "力", title: "Bộ Lực", kanji: "力男勉動働" },
  { root: "言", title: "Bộ Ngôn", kanji: "言語読話説計試" },
  { root: "門", title: "Bộ Môn", kanji: "門間聞問開" },
  { root: "水", title: "Bộ Thủy", kanji: "水海池洗注川洋漢" },
  { root: "火", title: "Bộ Hỏa", kanji: "火秋黒魚無鳥" },
  { root: "禾", title: "Bộ Hòa", kanji: "私秋科利乗" },
  { root: "土", title: "Bộ Thổ", kanji: "土地場社寺去赤堂" },
  { root: "金", title: "Bộ Kim", kanji: "金銀銭" },
  { root: "車", title: "Bộ Xa", kanji: "車転運軽" },
  { root: "辶", title: "Bộ Sước", kanji: "近遠通週送道運進" },
  { root: "糸", title: "Bộ Mịch", kanji: "紙線終練続" },
  { root: "手", title: "Bộ Thủ", kanji: "手持授拾打" },
  { root: "食", title: "Bộ Thực", kanji: "食飲飯館" },
  { root: "雨", title: "Bộ Vũ", kanji: "雨電雪" },
  { root: "攵", title: "Bộ Phộc", kanji: "教数政故" },
  { root: "阝", components: "阜邑", title: "Bộ Phụ / Ấp", kanji: "院都部" },
  { root: "刂", title: "Bộ Đao đứng", kanji: "別利帰" },
  { root: "广", title: "Bộ Nghiễm", kanji: "店広度病" },
  { root: "艹", title: "Bộ Thảo", kanji: "花茶菜薬英" },
  { root: "囗", title: "Bộ Vi", kanji: "国回図" },
  { root: "亠", title: "Bộ Đầu", kanji: "京高夜方文六主市" },
  { root: "大", title: "Bộ Đại", kanji: "大天太犬" },
  { root: "山", title: "Bộ Sơn", kanji: "山出" },
  { root: "牛", title: "Bộ Ngưu", kanji: "牛物特" },
  { root: "方", title: "Bộ Phương", kanji: "方旅族" },
  { root: "立", title: "Bộ Lập", kanji: "立音意" },
  { root: "止", title: "Bộ Chỉ", kanji: "止正歩" },
  { root: "母", title: "Bộ Mẫu", kanji: "母毎" },
  { root: "弓", title: "Bộ Cung", kanji: "引弱強弟" },
  { root: "穴", title: "Bộ Huyệt", kanji: "空究" },
  { root: "彳", title: "Bộ Xích", kanji: "行後待" },
  { root: "刀", title: "Bộ Đao", kanji: "分切別" },
  { root: "儿", title: "Bộ Nhân đi", kanji: "先元兄光" },
  { root: "寺", title: "Thành phần Tự", kanji: "寺時持待特" },
  { root: "重", include: "働", title: "Bộ Trọng", kanji: "重動働" },
  { root: "士", title: "Bộ Sĩ", kanji: "士売声" },
  { root: "一", title: "Nhóm chữ số", kanji: "一二三四五六七八九十百千万" },
  { root: "方", title: "Nhóm phương hướng", kanji: "東西南北上下中外左前後" },
  { root: "生", title: "Bộ Sinh", kanji: "生産" },
  { root: "小", title: "Bộ Tiểu", kanji: "小少" },
  { root: "馬", title: "Bộ Mã", kanji: "駅験" },
  { root: "夕", title: "Bộ Tịch", kanji: "夕多夜" },
  { root: "自", title: "Bộ Tự", kanji: "自首" },
  { root: "里", title: "Bộ Lý", kanji: "理野重" },
  { root: "工", title: "Bộ Công", kanji: "工空左試" },
  { root: "匸", title: "Bộ Hệ", kanji: "医区" },
  { root: "夂", title: "Bộ Truy", kanji: "夏冬" },
  { root: "斤", title: "Bộ Cân", kanji: "新所" },
  { root: "矢", title: "Bộ Thỉ", kanji: "知短" },
  { root: "毋", title: "Thành phần Vô", kanji: "母毎海" },
  { root: "父", title: "Nhóm gia đình", kanji: "父母兄姉妹弟" },
  { root: "色", title: "Nhóm màu sắc", kanji: "色白黒赤青" },
  { root: "季", title: "Nhóm thời gian / mùa", kanji: "年春夏秋冬朝昼夜夕" },
  { root: "身", title: "Nhóm cơ thể", kanji: "足首肉目耳口手" },
  { root: "冂", title: "Bộ Quynh", kanji: "円同" },
  { root: "尺", title: "Nhóm kích thước / số lượng", kanji: "長短高低大小多少" },
  { root: "気", title: "Nhóm thời tiết", kanji: "気風雨雪電" },
  { root: "時", title: "Nhóm thời điểm", kanji: "時午半朝昼夜" },
  { root: "友", title: "Nhóm quan hệ", kanji: "友親父母兄姉妹弟" },
  { root: "事", title: "Nhóm công việc / sản xuất", kanji: "事業仕事働料工産用" },
  { root: "発", title: "Nhóm hành động", kanji: "発出入行動起止" },
  { root: "生", title: "Nhóm sinh tử", kanji: "生死" },
  { root: "学", title: "Nhóm học tập / nghiên cứu", kanji: "学教習考研究写" },
  { root: "建", title: "Nhóm nhà cửa / công trình", kanji: "建屋家店室館" },
  { root: "民", title: "Nhóm xã hội", kanji: "民国会社員世区" },
  { root: "川", title: "Nhóm sông nước", kanji: "川水海池洋" },
  { root: "不", title: "Nhóm phủ định", kanji: "不無未" },
];

function withShortcut(label, shortcut) {
  return `${label} (${shortcut})`;
}

function isTypingTarget(target) {
  return target.closest?.("input, textarea, select, [contenteditable='true']");
}

function getListFromPath() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/n5";
  return ROUTE_LISTS[normalizedPath] ?? "n5";
}

function getKanjiVGUrl(kanji) {
  const codePoint = kanji.codePointAt(0).toString(16).padStart(5, "0");
  return `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${codePoint}.svg`;
}

function extractStrokePaths(svgText) {
  const document = new DOMParser().parseFromString(svgText, "image/svg+xml");
  return [...document.querySelectorAll("path[d]")].map((path) => path.getAttribute("d"));
}

function getStoredList(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function saveStoredList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getRandomIndex(currentIndex, listLength) {
  if (listLength < 2) return currentIndex;

  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * listLength);
  }
  return nextIndex;
}

function getTreeGroups(cards) {
  const cardByKanji = new Map(cards.map((card) => [card.kanji, card]));
  const groupedKanji = new Set();

  const groups = KANJI_TREE_GROUPS.map((group) => {
    const seenInGroup = new Set();
    const isTopicGroup = group.title.startsWith("Nhóm ");
    const groupComponents = [...(group.components ?? group.root)];
    const matchingKanji = isTopicGroup
      ? [...group.kanji]
      : [
          ...cards
            .filter((card) => groupComponents.some((component) => kanjiComponents[card.kanji]?.includes(component)))
            .map((card) => card.kanji),
          ...(group.include ? [...group.include] : []),
        ];
    const groupCards = matchingKanji
      .map((kanji) => cardByKanji.get(kanji))
      .filter(Boolean)
      .filter((card) => {
        if (seenInGroup.has(card.kanji)) return false;
        seenInGroup.add(card.kanji);
        groupedKanji.add(card.kanji);
        return true;
      });

    return { root: group.root, title: group.title, cards: groupCards };
  }).filter((group) => group.cards.length > 1);

  const remainingCards = cards.filter((card) => !groupedKanji.has(card.kanji));
  if (remainingCards.length > 0) {
    groups.push({ root: "他", title: "Chưa ghép nhóm", cards: remainingCards });
  }

  return groups;
}

function KanjiTree({ cards, onStudyGroup }) {
  const groups = getTreeGroups(cards);
  const [groupViews, setGroupViews] = useState({});

  const setGroupView = (groupTitle, view) => {
    setGroupViews((currentGroups) => ({
      ...currentGroups,
      [groupTitle]: view,
    }));
  };

  return (
    <section className="tree-page" aria-label="Cây Kanji">
      <header className="tree-header">
        <h1>Cây Kanji</h1>
        <span>{cards.length} chữ N5 + N4 theo phần viết giống nhau</span>
        <a href="https://kanjivg.tagaini.net/" target="_blank" rel="noreferrer">
          Dữ liệu cấu tạo: KanjiVG
        </a>
      </header>
      <div className="tree-root">Cấu tạo chữ</div>
      <div className="tree-branches">
        {groups.map((group) => (
          <section className="tree-branch" key={group.title}>
            <div className="tree-branch-head">
              <div className="tree-branch-title">
                <strong>{group.root}</strong>
                <h2>{group.title}</h2>
              </div>
              <div className="tree-branch-actions">
                <button
                  className="tree-study-button"
                  type="button"
                  aria-label={`Học nhóm ${group.title}`}
                  onClick={() => onStudyGroup(group)}
                >
                  <Play aria-hidden="true" fill="currentColor" />
                  Học nhóm
                </button>
                <div className="tree-view-toggle" role="group" aria-label={`Chế độ hiển thị nhóm ${group.title}`}>
                  {[
                    ["kanji", "Kanji"],
                    ["details", "Nghĩa"],
                    ["all", "Tất cả"],
                  ].map(([view, label]) => (
                    <button
                      className={(groupViews[group.title] ?? "kanji") === view ? "tree-view-option-active" : ""}
                      type="button"
                      key={view}
                      aria-pressed={(groupViews[group.title] ?? "kanji") === view}
                      onClick={() => setGroupView(group.title, view)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="tree-kanji-list">
              {group.cards.map((card) => {
                const view = groupViews[group.title] ?? "kanji";
                return (
                  <span
                    className={`tree-kanji-chip ${view === "details" ? "tree-kanji-chip-details" : ""}`}
                    key={card.kanji}
                    title={`${card.hanViet} - ${card.meaning}`}
                  >
                    {view !== "details" ? <strong>{card.kanji}</strong> : null}
                    {view !== "kanji" ? (
                      <>
                        <span>{card.hanViet}</span>
                        <small>{card.meaning}</small>
                      </>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [activeList, setActiveList] = useState(() => getListFromPath());
  const [treeStudyGroup, setTreeStudyGroup] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [isStrokePanelVisible, setIsStrokePanelVisible] = useState(false);
  const [strokePaths, setStrokePaths] = useState([]);
  const [strokeStatus, setStrokeStatus] = useState("idle");
  const [strokeReplayKey, setStrokeReplayKey] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState(() => getStoredList(FAVORITES_KEY));
  const [learnedIds, setLearnedIds] = useState(() => getStoredList(LEARNED_KEY));

  const favoriteSet = new Set(favoriteIds);
  const learnedSet = new Set(learnedIds);
  const isTreeList = activeList === "tree";
  const isTreePage = isTreeList && !treeStudyGroup;
  const sourceCards = isTreeList
    ? treeStudyGroup?.cards ?? []
    : activeList === "all"
      ? allCards
      : decks[activeList] ?? allCards;
  const visibleCards = sourceCards.filter((card) => {
    if (activeList === "learned") return learnedSet.has(card.kanji);
    if (learnedSet.has(card.kanji)) return false;
    if (activeList === "favorites") return favoriteSet.has(card.kanji);
    return true;
  });
  const card = visibleCards[currentIndex];
  const isFavorite = card ? favoriteSet.has(card.kanji) : false;
  const isLearned = card ? learnedSet.has(card.kanji) : false;

  useEffect(() => {
    saveStoredList(FAVORITES_KEY, favoriteIds);
  }, [favoriteIds]);

  useEffect(() => {
    saveStoredList(LEARNED_KEY, learnedIds);
  }, [learnedIds]);

  useEffect(() => {
    const normalizedPath = window.location.pathname.replace(/\/+$/, "") || "/";
    if (!ROUTE_LISTS[normalizedPath]) {
      window.history.replaceState(null, "", LIST_ROUTES[activeList] ?? LIST_ROUTES.n5);
    }
  }, [activeList]);

  useEffect(() => {
    const handlePopState = () => {
      setActiveList(getListFromPath());
      setTreeStudyGroup(null);
      setCurrentIndex(0);
      setIsAnswerVisible(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(visibleCards.length - 1, 0)));
    setIsAnswerVisible(false);
  }, [activeList, favoriteIds, learnedIds, visibleCards.length]);

  useEffect(() => {
    if (!card || !isStrokePanelVisible) {
      setStrokeStatus("idle");
      return;
    }

    const controller = new AbortController();

    async function loadStrokePaths() {
      setStrokeStatus("loading");
      setStrokePaths([]);

      try {
        const response = await fetch(getKanjiVGUrl(card.kanji), { signal: controller.signal });
        if (!response.ok) throw new Error("KanjiVG file not found");

        const svgText = await response.text();
        const paths = extractStrokePaths(svgText);
        if (paths.length === 0) throw new Error("No stroke paths found");

        setStrokePaths(paths);
        setStrokeReplayKey((key) => key + 1);
        setStrokeStatus("ready");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStrokeStatus("error");
        }
      }
    }

    loadStrokePaths();
    return () => controller.abort();
  }, [card, isStrokePanelVisible]);

  useEffect(() => {
    if (!isStrokePanelVisible || strokeStatus !== "ready") return undefined;

    const fullAnimationMs =
      Math.max(strokePaths.length - 1, 0) * STROKE_DELAY_SECONDS * 1000 + STROKE_DRAW_SECONDS * 1000;
    const replayIntervalMs = fullAnimationMs + STROKE_REPLAY_PAUSE_MS;

    const replayTimer = window.setInterval(() => {
      setStrokeReplayKey((key) => key + 1);
    }, replayIntervalMs);

    return () => window.clearInterval(replayTimer);
  }, [isStrokePanelVisible, strokeStatus, strokePaths.length]);

  const showPrevious = () => {
    if (visibleCards.length === 0) return;
    setCurrentIndex((index) => (index - 1 + visibleCards.length) % visibleCards.length);
    setIsAnswerVisible(false);
  };

  const showNext = () => {
    if (visibleCards.length === 0) return;
    setCurrentIndex((index) => (index + 1) % visibleCards.length);
    setIsAnswerVisible(false);
  };

  const shuffleCard = () => {
    if (visibleCards.length === 0) return;
    setCurrentIndex((index) => getRandomIndex(index, visibleCards.length));
    setIsAnswerVisible(false);
  };

  const toggleAnswer = () => {
    if (!card) return;
    setIsAnswerVisible((visible) => !visible);
  };

  const revealOrNext = () => {
    if (!card) return;

    if (!isAnswerVisible) {
      setIsAnswerVisible(true);
      return;
    }

    showNext();
  };

  const toggleWritingMode = () => {
    setIsWritingMode((enabled) => !enabled);
    setIsAnswerVisible(false);
  };

  const toggleStrokePanel = () => {
    if (!card) return;

    setIsStrokePanelVisible((visible) => {
      if (visible) return false;
      setStrokeReplayKey((key) => key + 1);
      return true;
    });
  };

  const preventButtonFocus = (event) => {
    event.preventDefault();
  };

  const changeList = (value) => {
    const nextPath = LIST_ROUTES[value] ?? LIST_ROUTES.n5;
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
    setActiveList(value);
    setTreeStudyGroup(null);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
  };

  const startTreeGroupStudy = (group) => {
    setTreeStudyGroup(group);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setIsStrokePanelVisible(false);
  };

  const returnToTree = () => {
    setTreeStudyGroup(null);
    setCurrentIndex(0);
    setIsAnswerVisible(false);
    setIsStrokePanelVisible(false);
  };

  const toggleFavorite = () => {
    if (!card) return;

    setFavoriteIds((ids) => {
      if (ids.includes(card.kanji)) return ids.filter((id) => id !== card.kanji);
      return [...ids, card.kanji];
    });
  };

  const toggleLearned = () => {
    if (!card) return;

    setLearnedIds((ids) => {
      if (ids.includes(card.kanji)) return ids.filter((id) => id !== card.kanji);
      return [...ids, card.kanji];
    });
    setIsAnswerVisible(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        document.activeElement?.blur?.();
        return;
      }

      if (isTypingTarget(event.target)) return;
      if (isTreePage) return;
      if (visibleCards.length === 0) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrentIndex((index) => (index - 1 + visibleCards.length) % visibleCards.length);
        setIsAnswerVisible(false);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrentIndex((index) => (index + 1) % visibleCards.length);
        setIsAnswerVisible(false);
      }
      if (event.key.toLowerCase() === "r") {
        event.preventDefault();
        setCurrentIndex((index) => getRandomIndex(index, visibleCards.length));
        setIsAnswerVisible(false);
      }
      if (event.key.toLowerCase() === "f" && card && !isLearned) {
        event.preventDefault();
        toggleFavorite();
      }
      if (event.key.toLowerCase() === "s" && card) {
        event.preventDefault();
        toggleStrokePanel();
      }
      if (event.key.toLowerCase() === "d" && card) {
        event.preventDefault();
        toggleLearned();
      }
      if (event.key === " " && !event.target.closest?.("button")) {
        event.preventDefault();
        revealOrNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [card, isAnswerVisible, isLearned, isTreePage, visibleCards.length]);

  return (
    <main className={isTreePage ? "app app-tree" : "app"} aria-live="polite">
      <div className="study-panel">
        <div className="toolbar">
          <nav className="list-navbar" aria-label={LABELS.list}>
            {Object.entries(LISTS).map(([value, label]) => (
              <a
                key={value}
                className={activeList === value ? "list-nav-item list-nav-item-active" : "list-nav-item"}
                href={LIST_ROUTES[value]}
                tabIndex={-1}
                onMouseDown={preventButtonFocus}
                onClick={(event) => {
                  event.preventDefault();
                  changeList(value);
                }}
                aria-current={activeList === value ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {treeStudyGroup ? (
          <header className="tree-study-header">
            <button type="button" onClick={returnToTree}>
              <ChevronLeft aria-hidden="true" />
              Cây Kanji
            </button>
            <div>
              <strong>{treeStudyGroup.root}</strong>
              <span>
                {treeStudyGroup.title} · {visibleCards.length}/{treeStudyGroup.cards.length} chữ
              </span>
            </div>
          </header>
        ) : null}

        {isTreePage ? (
          <KanjiTree cards={allCards} onStudyGroup={startTreeGroupStudy} />
        ) : card ? (
          <button
            className="flashcard"
            type="button"
            tabIndex={-1}
            onMouseDown={preventButtonFocus}
            aria-label={isAnswerVisible ? LABELS.hideAnswer : LABELS.showAnswer}
            aria-pressed={isAnswerVisible}
            onClick={toggleAnswer}
          >
            <span className="flashcard-progress" aria-label={`Thẻ ${currentIndex + 1} trên ${visibleCards.length}`}>
              {currentIndex + 1} / {visibleCards.length}
            </span>
            <div className={`kanji-slot ${isStrokePanelVisible ? "kanji-slot-stroke" : ""}`}>
              <div className={`kanji ${isWritingMode && !isAnswerVisible ? "kanji-hidden" : ""}`} aria-hidden={isWritingMode && !isAnswerVisible}>
              {isStrokePanelVisible ? (
                <div className="inline-stroke" aria-live="polite">
                  {strokeStatus === "loading" ? (
                    <span className="stroke-message">Đang tải nét...</span>
                  ) : null}
                  {strokeStatus === "error" ? (
                    <span className="stroke-message">Chưa có dữ liệu nét.</span>
                  ) : null}
                  {strokeStatus === "ready" ? (
                    <svg key={strokeReplayKey} className="stroke-svg" viewBox="0 0 109 109" role="img" aria-label={`Thứ tự nét ${card.kanji}`}>
                      <path className="stroke-guide" d="M54.5 4 V105 M4 54.5 H105 M16 16 L93 93 M93 16 L16 93" />
                      {strokePaths.map((path, index) => (
                        <path key={`ghost-${index}`} className="stroke-ghost" d={path} pathLength="1" />
                      ))}
                      {strokePaths.map((path, index) => (
                        <path
                          key={`stroke-${index}`}
                          className="stroke-step"
                          d={path}
                          pathLength="1"
                          style={{
                            animationDelay: `${index * STROKE_DELAY_SECONDS}s`,
                          }}
                        />
                      ))}
                    </svg>
                  ) : null}
                </div>
              ) : isWritingMode && !isAnswerVisible ? (
                "?"
              ) : (
                card.kanji
              )}
              </div>
            </div>
            <div className={`details ${isAnswerVisible || isWritingMode ? "details-visible" : ""}`} aria-hidden={!isAnswerVisible && !isWritingMode}>
              {isAnswerVisible || isWritingMode ? (
                <>
                  <p className="han-viet">{card.hanViet}</p>
                  <p className="meaning">{card.meaning}</p>
                </>
              ) : null}
            </div>
          </button>
        ) : (
          <div className="empty-state" role="status">
            <p>{LISTS[activeList]}</p>
            <span>{LABELS.empty}</span>
          </div>
        )}
      </div>

      {!isTreePage ? (
      <nav className="controls" aria-label={LABELS.controls}>
        <button
          type="button"
          aria-label={withShortcut(LABELS.previous, SHORTCUTS.previous)}
          title={withShortcut(LABELS.previous, SHORTCUTS.previous)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          onClick={showPrevious}
          disabled={!card}
        >
          <ChevronLeft className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          className={isFavorite ? "control-active" : ""}
          type="button"
          aria-label={withShortcut(LABELS.favorite, SHORTCUTS.favorite)}
          title={withShortcut(LABELS.favorite, SHORTCUTS.favorite)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          aria-pressed={isFavorite}
          onClick={toggleFavorite}
          disabled={!card || isLearned}
        >
          <Star className="control-icon" aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} strokeWidth={2.4} />
        </button>
        <button
          className={isWritingMode ? "control-active" : ""}
          type="button"
          aria-label={LABELS.writingMode}
          title={LABELS.writingMode}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          aria-pressed={isWritingMode}
          onClick={toggleWritingMode}
          disabled={!card}
        >
          <Pencil className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          className={isStrokePanelVisible ? "control-active" : ""}
          type="button"
          aria-label={withShortcut(LABELS.strokeOrder, SHORTCUTS.strokeOrder)}
          title={withShortcut(LABELS.strokeOrder, SHORTCUTS.strokeOrder)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          aria-pressed={isStrokePanelVisible}
          onClick={toggleStrokePanel}
          disabled={!card}
        >
          <Brush className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label={withShortcut(LABELS.shuffle, SHORTCUTS.shuffle)}
          title={withShortcut(LABELS.shuffle, SHORTCUTS.shuffle)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          onClick={shuffleCard}
          disabled={!card}
        >
          <RotateCcw className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label={withShortcut(LABELS.revealOrNext, SHORTCUTS.revealOrNext)}
          title={withShortcut(LABELS.revealOrNext, SHORTCUTS.revealOrNext)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          onClick={revealOrNext}
          disabled={!card}
        >
          <Play className="control-icon control-icon-play" aria-hidden="true" fill="currentColor" strokeWidth={2.4} />
        </button>
        <button
          className={isLearned ? "control-active" : ""}
          type="button"
          aria-label={withShortcut(LABELS.learned, SHORTCUTS.learned)}
          title={withShortcut(LABELS.learned, SHORTCUTS.learned)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          aria-pressed={isLearned}
          onClick={toggleLearned}
          disabled={!card}
        >
          <Check className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
        <button
          type="button"
          aria-label={withShortcut(LABELS.next, SHORTCUTS.next)}
          title={withShortcut(LABELS.next, SHORTCUTS.next)}
          tabIndex={-1}
          onMouseDown={preventButtonFocus}
          onClick={showNext}
          disabled={!card}
        >
          <ChevronRight className="control-icon" aria-hidden="true" strokeWidth={2.4} />
        </button>
      </nav>
      ) : null}
    </main>
  );
}
