import React from 'react';
import { Layout } from '../../components/Layout';

const Ranking: React.FC = () => {
  return (
    <Layout breadcrumbs={['Học sinh', 'Xếp loại']}>
      <div className="max-w-[1280px] mx-auto p-4 lg:p-8 flex flex-col gap-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Xếp loại Học lực & Hạnh kiểm</h2>
            <p className="text-text-secondary text-base">Tổng hợp kết quả rèn luyện và học tập của bạn.</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-surface-light rounded-2xl p-5 shadow-sm border border-surface-dim flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <div className="relative min-w-[240px]">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-2 uppercase tracking-wider">Năm học</span>
              <select className="w-full pt-6 pb-2 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-semibold focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>2023 - 2024</option>
                <option>2022 - 2023</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">expand_more</span>
            </div>
            <div className="relative min-w-[240px]">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-2 uppercase tracking-wider">Kỳ học</span>
              <select className="w-full pt-6 pb-2 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-semibold focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>Học kỳ I</option>
                <option>Học kỳ II</option>
                <option>Cả năm</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">expand_more</span>
            </div>
          </div>
          <div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-[#5066d6] text-white px-8 py-3 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
              Xem báo cáo
            </button>
          </div>
        </div>

        {/* Main Ranking Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Academic Card */}
          <div className="bg-surface-light rounded-2xl p-6 md:p-8 border border-surface-dim shadow-sm flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden group hover:border-text-secondary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="size-20 rounded-full bg-[#f4f4e6] flex items-center justify-center text-text-main shadow-inner">
              <span className="material-symbols-outlined !text-[40px] fill text-primary-600">school</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-text-secondary font-bold uppercase tracking-wider text-xs">Xếp loại Học lực</p>
              <h3 className="text-4xl font-bold text-text-main">Giỏi</h3>
            </div>
            <div className="bg-surface-dim px-5 py-2 rounded-full text-sm font-semibold text-text-main flex items-center gap-2">
              <span>Điểm trung bình:</span>
              <span className="text-lg">8.6</span>
            </div>
          </div>

          {/* Conduct Card */}
          <div className="bg-surface-light rounded-2xl p-6 md:p-8 border border-surface-dim shadow-sm flex flex-col items-center justify-center text-center gap-6 relative overflow-hidden group hover:border-text-secondary/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="size-20 rounded-full bg-[#f4f4e6] flex items-center justify-center text-green-600 shadow-inner">
              <span className="material-symbols-outlined !text-[40px] fill">verified</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-text-secondary font-bold uppercase tracking-wider text-xs">Xếp loại Hạnh kiểm</p>
              <h3 className="text-4xl font-bold text-text-main text-green-700">Tốt</h3>
            </div>
            <div className="bg-surface-dim px-5 py-2 rounded-full text-sm font-semibold text-green-800 flex items-center gap-2">
              <span className="material-symbols-outlined !text-[18px]">check_circle</span>
              <span>Đạt chuẩn rèn luyện</span>
            </div>
          </div>
        </div>

        {/* Teacher Comment */}
        <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-dim bg-surface-dim/30">
            <h3 className="text-lg font-semibold text-text-main">Nhận xét từ Giáo viên chủ nhiệm</h3>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex items-center gap-4 md:flex-col md:w-48 flex-shrink-0">
                <div 
                  className="size-16 rounded-full bg-gray-200 bg-center bg-cover border-2 border-surface-dim" 
                  style={{ backgroundImage: 'url("https://picsum.photos/64/64?random=3")' }}
                ></div>
                <div className="flex flex-col md:text-center">
                  <span className="font-bold text-text-main">Nguyễn Thị Mai</span>
                  <span className="text-xs text-text-secondary mt-0.5">Giáo viên Chủ nhiệm 10A1</span>
                </div>
              </div>
              <div className="flex-1 bg-surface-dim/30 rounded-2xl p-6 border border-surface-dim relative">
                <span className="material-symbols-outlined absolute top-4 left-4 text-text-secondary/20 !text-[48px]">format_quote</span>
                <div className="relative z-10 pl-4 pt-2">
                  <p className="text-text-main leading-7 text-[15px]">
                    "Em An là một học sinh chăm ngoan, có ý thức kỷ luật tốt. Trong học kỳ vừa qua, em đã thể hiện sự tiến bộ rõ rệt trong các môn Khoa học tự nhiên, đặc biệt là môn Toán. Tuy nhiên, em cần chủ động hơn trong các hoạt động ngoại khóa và cải thiện kỹ năng làm việc nhóm trong các môn Xã hội. Chúc em tiếp tục phát huy và đạt thành tích cao hơn trong kỳ tới."
                  </p>
                  <div className="mt-4 flex items-center justify-end gap-2 text-xs text-text-secondary">
                    <span className="material-symbols-outlined !text-[14px]">calendar_today</span>
                    <span>Cập nhật: 15/01/2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ranking;