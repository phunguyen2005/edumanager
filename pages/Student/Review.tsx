import React, { useState } from "react";
import { ReviewRequest } from "../../types";
import { Layout } from "../../components/Layout";

const MOCK_HISTORY: ReviewRequest[] = [
  {
    id: "1",
    subject: "Vật lý",
    examType: "Kiểm tra 15p",
    reason:
      "Em thấy câu 3 trắc nghiệm đáp án của em giống trong sách giáo khoa nhưng bị chấm sai ạ.",
    date: "15/10/2024",
    status: "pending",
  },
  {
    id: "2",
    subject: "Toán học",
    examType: "Giữa kỳ 1",
    reason:
      "Thầy chấm sót phần tự luận câu cuối của em ạ. Em đã làm ở mặt sau tờ giấy thi.",
    date: "20/09/2024",
    status: "approved",
  },
  {
    id: "3",
    subject: "Lịch sử",
    examType: "Kiểm tra miệng",
    reason: "Em xin xem lại điểm vì hôm đó em trả lời đúng 2 câu hỏi phụ.",
    date: "05/09/2024",
    status: "rejected",
  },
];

const Review: React.FC = () => {
  const [history] = useState<ReviewRequest[]>(MOCK_HISTORY);

  return (
    <Layout breadcrumbs={["Học sinh", "Phúc khảo"]}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
        {/* Page Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
              Gửi yêu cầu Phúc khảo
            </h2>
            <p className="text-text-secondary text-base">
              Gửi đơn đề nghị xem lại bài thi hoặc điểm số nếu phát hiện sai
              sót.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-text-main">
                  <span className="material-symbols-outlined">
                    edit_document
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-text-main">
                    Thông tin yêu cầu
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Điền đầy đủ thông tin để gửi tới giáo viên
                  </p>
                </div>
              </div>

              <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main pl-1">
                    Môn học cần phúc khảo{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full py-3 pl-4 pr-10 bg-surface-dim border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none cursor-pointer outline-none">
                      <option disabled selected value="">
                        Chọn môn học và đầu điểm
                      </option>
                      <option value="Toán">Toán học</option>
                      <option value="Vật lý">Vật lý</option>
                      <option value="Hoá học">Hóa học</option>
                      <option value="Ngữ văn">Ngữ văn</option>
                      <option value="Lịch sử">Lịch sử</option>
                      <option value="Địa lí">Địa lí</option>
                      <option value="Sinh học">Sinh học</option>
                      <option value="Tiếng Anh">Tiếng Anh</option>
                      <option value="Giáo dục công dân">GDCD</option>
                      <option value="Công nghệ">Công nghệ</option>
                      <option value="Giáo dục quốc phòng">GDQP</option>
                      <option value="Giáo dục thể chất">GD Thể chất</option>
                      <option value="Tin học">Tin học</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main pl-1">
                    Loại điểm cần phúc khảo{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full py-3 pl-4 pr-10 bg-surface-dim border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all appearance-none cursor-pointer outline-none">
                      <option disabled selected value="">
                        Chọn hệ số
                      </option>
                      <option value="math_mid">Hệ số 1</option>
                      <option value="phys_15">Hệ số 2</option>
                      <option value="chem_final">Hệ số 3</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main pl-1">
                    Lý do phúc khảo <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className="w-full p-4 bg-surface-dim border-none rounded-xl text-sm text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all min-h-[160px] resize-none placeholder-text-secondary outline-none"
                    placeholder="Vui lòng trình bày rõ lý do em cho rằng điểm số có sai sót (VD: Tổng điểm thành phần bị cộng sai, chấm sót câu hỏi...)"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#5066d6] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
                    type="button"
                  >
                    <span className="material-symbols-outlined !text-[20px]">
                      send
                    </span>
                    Gửi yêu cầu
                  </button>
                  <p className="text-xs text-text-secondary text-center mt-3">
                    Yêu cầu sẽ được gửi trực tiếp đến Giáo viên bộ môn.
                  </p>
                </div>
              </form>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex gap-4">
              <span className="material-symbols-outlined text-blue-600 mt-0.5">
                info
              </span>
              <div>
                <h4 className="font-bold text-sm text-blue-900 mb-1">
                  Lưu ý quan trọng
                </h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  Học sinh chỉ được gửi yêu cầu phúc khảo trong vòng{" "}
                  <strong>5 ngày</strong> kể từ khi điểm số được công bố. Vui
                  lòng kiểm tra kỹ trước khi gửi.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm overflow-hidden flex flex-col h-full">
              <div className="px-6 py-5 border-b border-surface-dim bg-background-light flex items-center justify-between">
                <h3 className="font-bold text-lg text-text-main">
                  Lịch sử phúc khảo
                </h3>
                <div className="flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-dim text-text-secondary text-xs font-medium">
                    Năm học 2024-2025
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-dim/30 border-b border-surface-dim">
                      <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[180px]">
                        Môn học / Kỳ
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                        Lý do
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[140px]">
                        Ngày gửi
                      </th>
                      <th className="py-3 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[140px]">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-dim">
                    {history.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-surface-dim/30 transition-colors group"
                      >
                        <td className="py-4 px-6 align-top">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-text-main">
                              {item.subject}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {item.examType}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 align-top">
                          <p className="text-sm text-text-main line-clamp-2 group-hover:line-clamp-none transition-all">
                            {item.reason}
                          </p>
                        </td>
                        <td className="py-4 px-6 align-top">
                          <span className="text-sm text-text-secondary">
                            {item.date}
                          </span>
                        </td>
                        <td className="py-4 px-6 align-top">
                          {item.status === "pending" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5"></span>
                              Chờ xử lý
                            </span>
                          )}
                          {item.status === "approved" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                              <span className="material-symbols-outlined !text-[14px] mr-1">
                                check
                              </span>
                              Đã duyệt
                            </span>
                          )}
                          {item.status === "rejected" && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-surface-dim text-text-secondary border border-gray-200">
                              <span className="material-symbols-outlined !text-[14px] mr-1">
                                close
                              </span>
                              Từ chối
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto px-6 py-4 border-t border-surface-dim bg-background-light">
                <p className="text-xs text-text-secondary text-center">
                  Chỉ hiển thị các yêu cầu trong học kỳ hiện tại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Review;
