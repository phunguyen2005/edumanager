import React from 'react';
import { TranscriptSubject } from '../../types';
import { Layout } from '../../components/Layout';

const MOCK_DATA: TranscriptSubject[] = [
  { id: '1', code: 'T', name: 'Toán học', color: 'bg-blue-100 text-blue-700', oral: [8.0, 9.0], fifteenMin: [8.5, 9.0], onePeriod: [8.5], final: 9.0, total: 8.7 },
  { id: '2', code: 'V', name: 'Ngữ Văn', color: 'bg-purple-100 text-purple-700', oral: [7.5, 8.0], fifteenMin: [7.0], onePeriod: [7.5], final: 8.0, total: 7.7 },
  { id: '3', code: 'TA', name: 'Tiếng Anh', color: 'bg-orange-100 text-orange-700', oral: [9.0, 9.5, 10], fifteenMin: [9.0, 9.5], onePeriod: [9.0], final: 9.5, total: 9.3 },
  { id: '4', code: 'L', name: 'Vật lý', color: 'bg-green-100 text-green-700', oral: [6.0], fifteenMin: [7.0, 7.5], onePeriod: [8.0], final: 7.5, total: 7.4 },
  { id: '5', code: 'H', name: 'Hóa học', color: 'bg-teal-100 text-teal-700', oral: [8.0, 8.0], fifteenMin: [8.5], onePeriod: [8.0], final: 8.5, total: 8.2 },
  { id: '6', code: 'S', name: 'Sinh học', color: 'bg-amber-100 text-amber-700', oral: [9.0], fifteenMin: [9.0, 9.5], onePeriod: [9.0], final: 9.0, total: 9.1 },
  { id: '7', code: 'LS', name: 'Lịch sử', color: 'bg-red-100 text-red-700', oral: [7.0, 7.0], fifteenMin: [6.5], onePeriod: [7.0], final: 7.5, total: 7.1 },
  { id: '8', code: 'ĐL', name: 'Địa lý', color: 'bg-indigo-100 text-indigo-700', oral: [8.0], fifteenMin: [8.0, 8.5], onePeriod: [8.0], final: 8.5, total: 8.2 },
];



const Transcript: React.FC = () => {
  return (
    <Layout breadcrumbs={['Học sinh', 'Bảng điểm']}>
        <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Bảng điểm học kỳ</h2>
            <p className="text-text-secondary text-base">Xem chi tiết điểm số các môn học trong học kỳ hiện tại.</p>
            </div>
            <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-surface-light hover:bg-surface-dim border border-surface-dim text-text-main px-5 py-2.5 rounded-full font-medium text-sm transition-all">
                <span className="material-symbols-outlined !text-[20px]">print</span>
                In bảng điểm
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-[#5066d6] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
                <span className="material-symbols-outlined !text-[20px]">check_circle</span>
                Xác nhận điểm
            </button>
            </div>
        </div>

        {/* Filters */}
        <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1 min-w-[200px] lg:max-w-[300px]">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">search</span>
            <input 
                className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm outline-none" 
                placeholder="Tìm môn học..." 
                type="text"
            />
            </div>
            <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[180px] flex-1 lg:flex-none">
                <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Năm học</span>
                <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>2024 - 2025</option>
                <option>2023 - 2024</option>
                <option>2022 - 2023</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">expand_more</span>
            </div>
            <div className="relative min-w-[180px] flex-1 lg:flex-none">
                <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Học kỳ</span>
                <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer outline-none">
                <option>Học kỳ 1</option>
                <option>Học kỳ 2</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">expand_more</span>
            </div>
            </div>
        </div>

        {/* Table */}
        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[80px]">STT</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[200px]">Môn học</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[180px]">Kiểm tra miệng</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[150px]">15 phút</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px]">1 tiết</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px]">Thi cuối kỳ</th>
                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider min-w-[100px] text-right">Tổng kết</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-surface-dim">
                {MOCK_DATA.map((subject, index) => (
                    <tr key={subject.id} className="hover:bg-surface-dim/30 transition-colors">
                    <td className="py-4 px-6 text-sm text-text-secondary">0{index + 1}</td>
                    <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                        <div className={`size-8 rounded-full flex items-center justify-center font-bold text-xs ${subject.color}`}>
                            {subject.code}
                        </div>
                        <span className="text-[14px] font-medium text-text-main">{subject.name}</span>
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex gap-2">
                        {subject.oral.map((score, i) => (
                            <span key={i} className="px-2 py-1 bg-surface-dim rounded text-sm text-text-main font-medium">{score.toFixed(1)}</span>
                        ))}
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex gap-2">
                        {subject.fifteenMin.map((score, i) => (
                            <span key={i} className="px-2 py-1 bg-surface-dim rounded text-sm text-text-main font-medium">{score.toFixed(1)}</span>
                        ))}
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <div className="flex gap-2">
                        {subject.onePeriod.map((score, i) => (
                            <span key={i} className="px-2 py-1 bg-surface-dim rounded text-sm text-text-main font-medium">{score.toFixed(1)}</span>
                        ))}
                        </div>
                    </td>
                    <td className="py-4 px-6">
                        <span className="text-sm font-bold text-text-main">{subject.final.toFixed(1)}</span>
                    </td>
                    <td className="py-4 px-6 text-right">
                        <span className="text-sm font-bold text-text-main">{subject.total.toFixed(1)}</span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </Layout>
  );
};

export default Transcript;