import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Teacher {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    dob: string;
    sex: string;
    address: string;
    // Missing backend fields for UI, will use placeholders
}

const TeacherList = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/api/teacher', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.data) {
                setTeachers(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    const filteredTeachers = teachers.filter(t =>
        (t.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout breadcrumbs={['Trang chủ', 'Giáo viên', 'Danh sách']}>
            <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl lg:text-[28px] font-bold text-text-main tracking-tight mb-1">Danh sách giáo viên</h2>
                        <p className="text-text-secondary text-base">Quản lý hồ sơ và thông tin liên hệ của giáo viên.</p>
                    </div>
                    <button
                        onClick={() => navigate('/teachers/add')}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit"
                    >
                        <Plus size={20} />
                        Thêm giáo viên mới
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                        <input
                            className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                            placeholder="Tìm kiếm tên hoặc email GV..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                                    <th className="py-4 px-6 w-12 text-center"><input type="checkbox" className="rounded-full border-gray-300 text-primary focus:ring-primary size-5" /></th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Họ và tên</th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Email</th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">SĐT</th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Ngày sinh</th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">Địa chỉ</th>
                                    <th className="py-4 px-6 text-[11px] font-extrabold text-text-secondary uppercase tracking-wider text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-dim">
                                {loading ? (
                                    <tr><td colSpan={7} className="p-8 text-center text-text-secondary">Đang tải...</td></tr>
                                ) : filteredTeachers.length === 0 ? (
                                    <tr><td colSpan={7} className="p-8 text-center text-text-secondary">Không tìm thấy giáo viên nào.</td></tr>
                                ) : (
                                    filteredTeachers.map((teacher) => (
                                        <tr key={teacher._id} className="hover:bg-surface-dim/30 transition-colors group">
                                            <td className="py-5 px-6 text-center"><input type="checkbox" className="rounded-full border-gray-300 text-primary focus:ring-primary size-5" /></td>
                                            <td className="py-5 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary overflow-hidden">
                                                        <User size={24} />
                                                    </div>
                                                    <span className="text-sm font-bold text-text-main">{teacher.fullname}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 text-sm font-medium text-text-main">{teacher.email}</td>
                                            <td className="py-5 px-6 text-sm text-text-secondary font-medium">{teacher.phone}</td>
                                            <td className="py-5 px-6 text-sm text-text-secondary">{new Date(teacher.dob).toLocaleDateString('vi-VN')}</td>
                                            <td className="py-5 px-6 text-sm text-text-secondary truncate max-w-[200px]">{teacher.address}</td>
                                            <td className="py-5 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination placeholder */}
                    <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
                        <span className="text-sm text-text-secondary">Hiển thị <span className="font-bold text-text-main">{filteredTeachers.length}</span> giáo viên</span>
                        {/* ... pagination UI ... */}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default TeacherList;