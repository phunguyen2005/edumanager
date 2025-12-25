import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSubjectGrades } from './mockData';
import { Layout } from '../../components/Layout';

const TranscriptDetail: React.FC = () => {
    const navigate = useNavigate();
    const [grades, setGrades] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSubjectGrades = async () => {
            try {
                setLoading(true);
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) throw new Error('Unauthorized');

                const res = await fetch('http://localhost:3001/api/subject-grade', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || 'Fetch thất bại');
                }

                const data = await res.json();
                console.log('Fetch subject grades:', data);
                setGrades(data.data || []);
            } catch (error) {
                console.error(error instanceof Error ? error.message : 'Đã có lỗi xảy ra. Hãy thử lại!');
                setGrades(mockSubjectGrades);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectGrades();
    }, []);

  return (
    <Layout breadcrumbs={['Giáo viên', 'Quản lý điểm', 'Bảng điểm chi tiết']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-main">Bảng điểm tổng hợp</h2>
                    <p className="text-text-secondary mt-1 text-base">Xem chi tiết và quản lý điểm số của học sinh theo từng môn học.</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-text-main font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95 text-sm">
                    <span className="material-symbols-outlined text-xl">download</span>
                    Xuất báo cáo
                </button>
            </div>

            {/* Filters */}
            <div className="bg-surface-light p-4 rounded-2xl shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">search</span>
                <input
                    className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                    placeholder="Tìm kiếm tên học sinh hoặc mã học sinh..."
                    type="text"
                />
                </div>
                <div className="flex gap-3 w-full lg:w-auto flex-wrap">
                <div className="relative min-w-[140px] flex-1">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Lớp</label>
                    <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                    <option>Lớp 10A1</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <div className="relative min-w-[140px] flex-1">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Năm học</label>
                    <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                    <option>2023 - 2024</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-3 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-sm font-bold text-text-main transition-colors">
                    <span className="material-symbols-outlined text-lg">filter_list</span>
                    <span>Bộ lọc khác</span>
                </button>
                </div>
            </div>

            {/* Student Info Header */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <div className="size-16 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-3xl">person</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-text-main">Nguyễn Văn An</h3>
                        <p className="text-text-secondary font-medium text-sm mt-1">Mã HS: HS2023001 • Lớp: 10A1</p>
                    </div>
                </div>
                <div className="text-right bg-white/50 px-6 py-2 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-text-secondary mb-1 uppercase tracking-wide">Điểm trung bình</p>
                    <div className="text-4xl font-black text-blue-600"></div>
                </div>
            </div>

            {/* Grades Table */}
            <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                <div className="p-5 border-b border-surface-dim flex justify-between items-center bg-[#fafaf5]">
                    <h3 className="font-bold text-text-main">Chi tiết điểm các môn</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-text-secondary bg-surface-dim px-3 py-1 rounded-lg">Học kỳ I</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white text-xs font-bold text-text-secondary uppercase border-b border-surface-dim">
                                <th className="px-6 py-4 w-16 text-center">STT</th>
                                <th className="px-6 py-4">Môn học</th>
                                <th className="px-6 py-4 text-center">Miệng</th>
                                <th className="px-6 py-4 text-center">15 phút</th>
                                <th className="px-6 py-4 text-center">1 tiết</th>
                                <th className="px-6 py-4 text-center">Thi HK</th>
                                <th className="px-6 py-4 text-center">TBM</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim text-sm">

                            {/* {mockSubjectGrades.map((grade, idx) => (
                                <tr key={grade.id} className="hover:bg-surface-dim/30 transition-colors">
                                    <td className="px-6 py-4 text-center text-text-secondary font-medium">{idx + 1}</td>
                                    <td className="px-6 py-4 font-bold text-text-main">{grade.subject}</td>
                                    <td className="px-6 py-4 text-center text-text-main">{grade.oral}</td>
                                    <td className="px-6 py-4 text-center text-text-main">{grade.min15}</td>
                                    <td className="px-6 py-4 text-center text-text-main">{grade.period1}</td>
                                    <td className="px-6 py-4 text-center font-bold text-text-main">{grade.semester}</td>
                                    <td className="px-6 py-4 text-center font-black text-blue-600 bg-blue-50/50">{grade.average}</td> */}

                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-8 text-center text-text-secondary">
                                        Đang tải dữ liệu...
                                    </td>
                                </tr>
                            ) : grades.length > 0 ? (
                                grades.map((grade, idx) => (
                                    <tr key={grade._id || idx} className="hover:bg-surface-dim/30 transition-colors">
                                        <td className="px-6 py-4 text-center text-text-secondary font-medium">{idx + 1}</td>
                                        <td className="px-6 py-4 font-bold text-text-main">{grade.subjectName}</td>
                                        <td className="px-6 py-4 text-center text-text-main">-</td>
                                        <td className="px-6 py-4 text-center text-text-main">{grade.m15_1}</td>
                                        <td className="px-6 py-4 text-center text-text-main">-</td>
                                        <td className="px-6 py-4 text-center font-bold text-text-main">{grade.midterm}</td>
                                        <td className="px-6 py-4 text-center font-black text-blue-600 bg-blue-50/50">{grade.final}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                                Đạt
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="px-6 py-8 text-center text-text-secondary">
                                        Không có dữ liệu điểm
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-surface-dim bg-white flex justify-end gap-3">
                    <button onClick={() => navigate('/teacher/classes')} className="px-6 py-2.5 bg-white border border-surface-dim rounded-full text-sm font-bold hover:bg-surface-dim text-text-main transition-colors">
                        Hủy bỏ
                    </button>
                    <button onClick={() => navigate('/teacher/classes')} className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-text-main font-bold rounded-full text-sm shadow-sm transition-colors transform active:scale-95">
                        Xác nhận điểm
                    </button>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default TranscriptDetail;