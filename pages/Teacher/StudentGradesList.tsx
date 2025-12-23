import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockStudents } from './mockData';
import { Layout } from '../../components/Layout';

const StudentGradesList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout breadcrumbs={['Giáo viên', 'Quản lý điểm']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h2 className="text-2xl font-bold text-text-main">Danh sách học sinh chờ lập bảng điểm</h2>
                <p className="text-text-secondary mt-1 text-base">Xem danh sách và xử lý lập bảng điểm cho học sinh đủ điều kiện.</p>
                </div>
                <div className='flex gap-2'>
                    <button 
                        onClick={() => navigate('/teacher/appeals')}
                        className="bg-white border border-surface-dim hover:bg-surface-dim text-text-main font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all text-sm"
                    >
                        <span className="material-symbols-outlined text-xl">assignment_late</span>
                        Phúc khảo
                    </button>
                    <button className="bg-primary hover:bg-primary-hover text-text-main font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95 text-sm">
                    <span className="material-symbols-outlined text-xl">file_download</span>
                    Xuất danh sách
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
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
                        <option>Lớp 10A2</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <div className="relative min-w-[140px] flex-1">
                    <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Năm học</label>
                    <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                        <option>2023 - 2024</option>
                        <option>2022 - 2023</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none text-lg">expand_more</span>
                </div>
                <button className="flex items-center justify-center gap-2 px-5 py-3 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-sm font-bold text-text-main transition-colors">
                    <span className="material-symbols-outlined text-lg">filter_list</span>
                    <span>Bộ lọc khác</span>
                </button>
                </div>
            </div>

            <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                <div className="p-5 border-b border-surface-dim flex justify-between items-center bg-[#fafaf5]">
                    <h3 className="font-bold text-text-main">Danh sách chờ (Lớp 10A1)</h3>
                    <div className="text-sm font-medium text-text-secondary">
                        Tổng số: <span className="font-bold text-text-main">45</span> học sinh
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-white text-xs font-bold text-text-secondary uppercase border-b border-surface-dim">
                            <th className="px-6 py-4 w-16 text-center">STT</th>
                            <th className="px-6 py-4">Mã HS</th>
                            <th className="px-6 py-4">Họ và tên</th>
                            <th className="px-6 py-4">Lớp</th>
                            <th className="px-6 py-4">Trạng thái điểm</th>
                            <th className="px-6 py-4">Trạng thái HK</th>
                            <th className="px-6 py-4 text-right">Hành động</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim text-sm">
                        {mockStudents.map((student, index) => (
                            <tr key={student.id} className="hover:bg-surface-dim/30 transition-colors group">
                                <td className="px-6 py-4 text-center text-text-secondary font-medium">{index + 1}</td>
                                <td className="px-6 py-4 text-text-main font-bold">{student.code}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                    <div className={`size-8 rounded-full ${student.avatarColor} flex items-center justify-center text-xs font-bold`}>
                                        {student.initials}
                                    </div>
                                    <div className="font-bold text-text-main">{student.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-main font-medium">{student.class}</td>
                                <td className="px-6 py-4">
                                    {student.status === 'sufficient' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                        Đủ điểm các môn
                                    </span>
                                    ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                                        Thiếu điểm Toán
                                    </span>
                                    )
                                }
                                </td>
                                <td className="px-6 py-4">
                                    {student.evaluationStatus === 'evaluated' ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                        Đã đánh giá
                                    </span>
                                    ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-100">
                                        Chưa đánh giá
                                    </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {student.evaluationStatus === 'pending' ? (
                                    <button 
                                        onClick={() => navigate('/teacher/conduct')}
                                        className="text-text-secondary hover:text-text-main font-bold text-sm inline-flex items-center gap-1 transition-colors"
                                    >
                                        Nhắc nhở GVCN
                                    </button>
                                    ) : (
                                    student.status === 'lacking' ? (
                                        <button className="text-text-secondary hover:text-text-main font-bold text-sm inline-flex items-center gap-1 transition-colors">
                                        Xem chi tiết
                                        </button>
                                    ) : (
                                        <button 
                                        onClick={() => navigate('/teacher/transcript')}
                                        className="text-text-main hover:text-primary-hover font-bold text-sm inline-flex items-center gap-1 hover:underline decoration-2"
                                        >
                                        Lập bảng điểm
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                        </button>
                                    )
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t border-surface-dim bg-white">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                        <p className="text-sm text-text-secondary font-medium">
                            Hiển thị <span className="font-bold text-text-main">1</span> đến <span className="font-bold text-text-main">5</span> trong số <span className="font-bold text-text-main">45</span> kết quả
                        </p>
                        </div>
                        <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px gap-1">
                            <button className="relative inline-flex items-center px-2 py-2 rounded-lg border border-surface-dim bg-white text-sm font-medium text-text-secondary hover:bg-surface-dim">
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                            </button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-primary bg-primary/10 text-sm font-bold text-text-main rounded-lg">1</button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-surface-dim bg-white text-sm font-medium text-text-secondary hover:bg-surface-dim rounded-lg">2</button>
                            <button className="relative inline-flex items-center px-4 py-2 border border-surface-dim bg-white text-sm font-medium text-text-secondary hover:bg-surface-dim rounded-lg">3</button>
                            <span className="relative inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-text-secondary">...</span>
                            <button className="relative inline-flex items-center px-2 py-2 rounded-lg border border-surface-dim bg-white text-sm font-medium text-text-secondary hover:bg-surface-dim">
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </button>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default StudentGradesList;