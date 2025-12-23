import React from 'react';
import { mockClasses } from './mockData';
import { Layout } from '../../components/Layout';

const ClassList: React.FC = () => {
    const homeroomClasses = mockClasses.filter(c => c.type === 'homeroom');
    const teachingClasses = mockClasses.filter(c => c.type === 'teaching');

  return (
    <Layout breadcrumbs={['Giáo viên', 'Danh sách lớp học']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h2 className="text-2xl font-bold text-text-main">Danh sách lớp học</h2>
                <p className="text-text-secondary mt-1 text-base">Quản lý thông tin hồ sơ và dữ liệu học tập của học sinh toàn trường.</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-text-main font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm transition-all active:scale-95 text-sm">
                <span className="material-symbols-outlined text-xl">add</span>
                Thêm lớp học mới
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-surface-light p-4 rounded-2xl shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">search</span>
                    <input
                        className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                        placeholder="Tìm kiếm tên hoặc mã Lớp..."
                        type="text"
                    />
                </div>
                <div className="flex gap-3 w-full lg:w-auto flex-wrap">
                    <div className="relative min-w-[140px] flex-1">
                        <label className="absolute -top-2 left-3 px-1 bg-surface-light text-[10px] font-bold text-text-secondary uppercase tracking-wider">Lớp</label>
                        <select className="w-full px-4 py-3 bg-surface-light border border-surface-dim rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary text-text-main cursor-pointer appearance-none">
                            <option>Tất cả</option>
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

            {/* Homeroom Section */}
            <section>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 pl-1">Danh sách lớp chủ nhiệm</h3>
                <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#fafaf5] text-xs font-bold text-text-secondary uppercase border-b border-surface-dim">
                                    <th className="px-6 py-4 w-10"></th>
                                    <th className="px-6 py-4">Mã Lớp</th>
                                    <th className="px-6 py-4">Tên Lớp</th>
                                    <th className="px-6 py-4">GVCN</th>
                                    <th className="px-6 py-4 text-center">Khối</th>
                                    <th className="px-6 py-4">Môn</th>
                                    <th className="px-6 py-4 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-dim text-sm">
                                {homeroomClasses.map((cls) => (
                                    <tr key={cls.id} className="hover:bg-surface-dim/30 transition-colors">
                                        <td className="px-6 py-4"><div className="w-4 h-4 rounded-full border-2 border-surface-dim"></div></td>
                                        <td className="px-6 py-4 text-text-main font-bold">{cls.code}</td>
                                        <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-xs font-bold">{cls.name}</span></td>
                                        <td className="px-6 py-4 text-text-main font-medium">{cls.dob}</td>
                                        <td className="px-6 py-4 text-center"><span className="bg-surface-dim text-text-secondary px-2 py-1 rounded text-xs font-bold">{cls.grade}</span></td>
                                        <td className="px-6 py-4 text-text-main font-medium">{cls.subject}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-main hover:text-primary-hover hover:underline text-sm font-bold">Xem lớp</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Teaching Section */}
            <section>
                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 pl-1">Danh sách lớp giảng dạy</h3>
                <div className="bg-surface-light rounded-3xl shadow-sm border border-surface-dim overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-surface-dim text-sm">
                                {teachingClasses.map((cls) => (
                                    <tr key={cls.id} className="hover:bg-surface-dim/30 transition-colors">
                                        <td className="px-6 py-4 w-10"><div className="w-4 h-4 rounded-full border-2 border-surface-dim"></div></td>
                                        <td className="px-6 py-4 text-text-main font-bold">{cls.code}</td>
                                        <td className="px-6 py-4"><span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-bold">{cls.name}</span></td>
                                        <td className="px-6 py-4 text-text-main font-medium">{cls.dob}</td>
                                        <td className="px-6 py-4 text-center"><span className="bg-surface-dim text-text-secondary px-2 py-1 rounded text-xs font-bold">{cls.grade}</span></td>
                                        <td className="px-6 py-4 text-text-main font-medium">{cls.subject}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-text-main hover:text-primary-hover hover:underline text-sm font-bold">Xem lớp</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-surface-dim flex justify-between items-center text-sm">
                        <span className="text-text-secondary">Hiển thị <span className="font-bold text-text-main">1-5</span> trên <span className="font-bold text-text-main">124</span> học sinh</span>
                        <div className="flex gap-2">
                            <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main font-bold shadow-sm">1</button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main font-medium">2</button>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main font-medium">3</button>
                            <span className="size-8 flex items-center justify-center text-text-secondary">...</span>
                            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary"><span className="material-symbols-outlined text-lg">chevron_right</span></button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Layout>
  );
};

export default ClassList;