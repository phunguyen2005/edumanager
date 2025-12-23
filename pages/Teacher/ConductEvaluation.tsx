import React, { useState } from 'react';
import { Layout } from '../../components/Layout';

const ConductEvaluation: React.FC = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(['Lễ phép', 'Hòa đồng']);

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const quickTags = ['Lễ phép', 'Đi học đúng giờ', 'Hòa đồng', 'Tham gia phong trào', 'Trang phục chỉnh tề'];

  return (
    <Layout breadcrumbs={['Giáo viên', 'Đánh giá hạnh kiểm']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-6 animate-fade-in pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Đánh giá hạnh kiểm</h2>
                    <p className="text-text-secondary mt-1 text-base">Ghi nhận đánh giá và xếp loại hạnh kiểm cho học sinh học kỳ I.</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-text-main font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95 text-sm">
                    <span className="material-symbols-outlined text-xl">save</span>
                    Lưu đánh giá
                </button>
            </div>

            {/* Top Filters */}
            <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-surface-dim grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Năm học</label>
                    <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                        <option>2023 - 2024</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Lớp</label>
                    <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                        <option>10A1</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Học sinh</label>
                    <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">search</span>
                    <input
                        className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                        placeholder="Tìm kiếm tên hoặc mã học sinh..."
                        type="text"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Profile Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-surface-light rounded-2xl shadow-sm border border-surface-dim overflow-hidden">
                        <div className="bg-[#fafaf5] p-6 flex flex-col items-center border-b border-surface-dim">
                            <div className="size-24 rounded-full bg-surface-dim p-1 mb-3 border border-surface-dim">
                                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">NA</div>
                            </div>
                            <h3 className="font-bold text-lg text-text-main">Nguyễn Văn A</h3>
                            <p className="text-sm text-text-secondary font-medium">Mã HS: L1201104022</p>
                            <span className="mt-2 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">Lớp 10A1</span>
                        </div>
                        <div className="p-5 space-y-4 text-sm">
                            <div className="flex justify-between py-2 border-b border-surface-dim">
                                <span className="text-text-secondary">Ngày sinh</span>
                                <span className="font-bold text-text-main">12/05/2007</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-surface-dim">
                                <span className="text-text-secondary">GV Chủ nhiệm</span>
                                <span className="font-bold text-text-main">Trần Thị B</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-surface-dim">
                                <span className="text-text-secondary">Điểm TB học kỳ</span>
                                <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">8.5</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-text-secondary">Vi phạm đã ghi nhận</span>
                                <span className="font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Evaluation Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-surface-dim">
                        <h3 className="font-bold text-text-main flex items-center gap-2 mb-6 text-lg">
                            <span className="bg-yellow-100 text-yellow-700 p-1.5 rounded-lg material-symbols-outlined text-xl">star</span>
                            Xếp loại hạnh kiểm
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="relative">
                                <label className="block text-sm font-bold text-text-main mb-2">Hạnh kiểm dự kiến</label>
                                <select className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white text-text-main cursor-pointer appearance-none">
                                    <option>Tốt</option>
                                    <option>Khá</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-[42px] text-text-secondary pointer-events-none text-lg">expand_more</span>
                                <p className="text-[11px] text-text-secondary mt-1.5 font-medium">Xếp loại dựa trên tổng hợp vi phạm và đóng góp.</p>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-bold text-text-main mb-2">Mức độ rèn luyện</label>
                                <select className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white text-text-main cursor-pointer appearance-none">
                                    <option>Bình thường</option>
                                    <option>Tích cực</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-[42px] text-text-secondary pointer-events-none text-lg">expand_more</span>
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="block text-sm font-bold text-text-main mb-3">Ghi nhận nhanh (Tags)</label>
                            <div className="flex flex-wrap gap-2">
                                {quickTags.map(tag => (
                                    <button 
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${selectedTags.includes(tag) ? 'bg-primary text-text-main border-primary shadow-sm' : 'bg-white border-surface-dim text-text-secondary hover:bg-surface-dim'}`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-light p-6 rounded-2xl shadow-sm border border-surface-dim">
                        <h3 className="font-bold text-text-main flex items-center gap-2 mb-4 text-lg">
                            <span className="bg-blue-100 text-blue-700 p-1.5 rounded-lg material-symbols-outlined text-xl">edit_note</span>
                            Nhận xét của giáo viên
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-text-main mb-2">Nội dung nhận xét</label>
                                <textarea 
                                    className="w-full p-4 bg-surface-dim border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white text-text-main min-h-[120px] placeholder:text-text-secondary/60"
                                    placeholder="Nhập nhận xét chi tiết về ưu điểm, khuyết điểm và sự tiến bộ của học sinh..."
                                ></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Mẫu câu nhanh:</label>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1.5 bg-surface-dim text-xs font-bold text-text-secondary hover:text-text-main hover:bg-[#e8e8d8] rounded-lg transition-colors">+ Có ý thức kỷ luật tốt</button>
                                    <button className="px-3 py-1.5 bg-surface-dim text-xs font-bold text-text-secondary hover:text-text-main hover:bg-[#e8e8d8] rounded-lg transition-colors">+ Cần chú ý trang phục</button>
                                    <button className="px-3 py-1.5 bg-surface-dim text-xs font-bold text-text-secondary hover:text-text-main hover:bg-[#e8e8d8] rounded-lg transition-colors">+ Tích cực phát biểu</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-surface-dim mt-4">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" />
                                    <span className="text-sm font-medium text-text-main group-hover:text-primary-hover transition-colors">Gửi thông báo về cho phụ huynh</span>
                                </label>
                                <span className="text-xs text-text-secondary italic font-medium">Lần cập nhật cuối: 10 phút trước</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Sticky Footer Action */}
            <div className="fixed bottom-0 right-0 left-0 lg:left-[280px] p-4 bg-white/80 backdrop-blur-md border-t border-surface-dim flex justify-end gap-3 z-20">
                <button className="px-6 py-3 bg-white border border-surface-dim rounded-full text-sm font-bold hover:bg-surface-dim text-text-main transition-colors">
                    Hủy bỏ
                </button>
                <button className="px-6 py-3 bg-primary hover:bg-primary-hover text-text-main font-bold rounded-full text-sm shadow-md transition-all active:scale-95 flex items-center gap-2">
                    Lưu & Tiếp tục
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </div>
        </div>
    </Layout>
  );
};

export default ConductEvaluation;