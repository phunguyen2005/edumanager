import React from 'react';
import { mockAppeals } from './mockData';
import { Layout } from '../../components/Layout';

const GradeAppeals: React.FC = () => {
  return (
    <Layout breadcrumbs={['Giáo viên', 'Phúc khảo']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Duyệt yêu cầu Phúc khảo</h2>
                    <p className="text-text-secondary mt-1 text-base">Xem xét và xử lý các đơn đề nghị xem lại bài thi từ học sinh.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - List and Filters */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex gap-2">
                        <button className="bg-text-main text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-black transition-colors">Chờ xử lý (3)</button>
                        <button className="bg-white border border-surface-dim text-text-secondary px-5 py-2.5 rounded-full text-sm font-bold hover:bg-surface-dim hover:text-text-main transition-colors">Đã duyệt</button>
                        <button className="bg-white border border-surface-dim text-text-secondary px-5 py-2.5 rounded-full text-sm font-bold hover:bg-surface-dim hover:text-text-main transition-colors">Đã từ chối</button>
                    </div>

                    <div className="space-y-4">
                        {mockAppeals.map((appeal) => (
                        <div key={appeal.id} className="bg-surface-light p-6 rounded-2xl border border-surface-dim shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-lg">
                                    {appeal.studentName.charAt(0)}
                                    </div>
                                    <div>
                                    <h4 className="font-bold text-text-main">{appeal.studentName}</h4>
                                    <p className="text-xs font-medium text-text-secondary">Lớp {appeal.class} • MSSV: {appeal.mssv}</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
                                    <span className="size-1.5 rounded-full bg-yellow-600"></span>
                                    Chờ xử lý
                                </span>
                            </div>

                            <div className="bg-[#fafaf5] p-4 rounded-xl mb-4 border border-surface-dim">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-text-main text-sm">{appeal.subject} - {appeal.examType}</span>
                                    <span className="text-xs font-medium text-text-secondary">Gửi ngày: {appeal.date}</span>
                                </div>
                                <p className="text-sm text-text-main italic">"{appeal.content}"</p>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button className="text-text-secondary hover:text-text-main text-sm font-bold px-3 py-2 rounded-lg hover:bg-surface-dim transition-colors">Chi tiết bài thi</button>
                                <button className="px-5 py-2 border border-red-200 bg-red-50 rounded-full text-sm font-bold text-red-600 hover:bg-red-100 transition-colors">Từ chối</button>
                                <button className="px-5 py-2 bg-primary hover:bg-primary-hover text-text-main rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-colors active:scale-95">
                                    <span className="material-symbols-outlined text-lg">check</span>
                                    Duyệt phúc khảo
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="flex flex-col gap-6">
                    <div className="bg-surface-light p-6 rounded-2xl border border-surface-dim shadow-sm">
                        <h3 className="font-bold text-text-main flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-text-main">analytics</span>
                            Thống kê học kỳ 1
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="text-2xl font-black text-blue-600">24</div>
                                <div className="text-xs font-bold text-blue-800 mt-1 uppercase tracking-wide">Tổng yêu cầu</div>
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                                <div className="text-2xl font-black text-green-600">18</div>
                                <div className="text-xs font-bold text-green-800 mt-1 uppercase tracking-wide">Đã duyệt</div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                                <div className="text-2xl font-black text-red-500">3</div>
                                <div className="text-xs font-bold text-red-800 mt-1 uppercase tracking-wide">Từ chối</div>
                            </div>
                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                                <div className="text-2xl font-black text-yellow-600">3</div>
                                <div className="text-xs font-bold text-yellow-800 mt-1 uppercase tracking-wide">Chờ xử lý</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface-light p-6 rounded-2xl border border-surface-dim shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-text-main">Lịch sử xử lý</h3>
                            <button className="text-xs text-text-main font-bold hover:underline">Xem tất cả</button>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex justify-between items-start pb-3 border-b border-surface-dim last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-bold text-text-main">Phạm Văn C</p>
                                        <p className="text-xs font-medium text-text-secondary">Hóa học • 12/10/2024</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-lg border border-green-200">Đã duyệt</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-3">
                        <span className="material-symbols-outlined text-blue-600 flex-shrink-0">info</span>
                        <div>
                            <h4 className="text-sm font-bold text-blue-800">Quy định xử lý</h4>
                            <p className="text-xs font-medium text-blue-700 mt-1 leading-relaxed">
                                Giáo viên cần xử lý yêu cầu phúc khảo trong vòng 3 ngày làm việc kể từ khi nhận được yêu cầu. Vui lòng kiểm tra kỹ bài thi trước khi đưa ra quyết định cuối cùng.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default GradeAppeals;