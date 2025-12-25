import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Edit, Ban, X, Clock, Calculator, Book, Hash } from 'lucide-react';

interface Subject {
    _id: string;
    subjectId: string;
    name: string;
    // Các field sau BE chưa có, để optional
    sessions?: number;
    coeff?: number;
    status?: string;
    createdAt?: string;
}

const SubjectList = () => {
    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        subjectId: '',
        name: '',
        sessions: 45, // Default
        coeff: 1, // Default
        type: 'Cơ bản'
    });

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/api/subject', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await res.json();
            // Kiểm tra cấu trúc response, giả định result.data là array
            if (result.data) {
                setSubjects(result.data);
            } else if (Array.isArray(result)) {
                setSubjects(result);
            } else {
                console.log("Cấu trúc response không xác định:", result);
                if (result.subjects) setSubjects(result.subjects); // Dự phòng logic
            }
        } catch (err) {
            console.error("Lỗi tải danh sách môn học:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleCreateSubject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch('http://localhost:3001/api/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    subjectId: formData.subjectId,
                    name: formData.name
                    // BE hiện tại chưa nhận sessions, coeff nên không gửi để tránh lỗi strict validation nếu có
                })
            });
            const result = await res.json();
            if (res.ok) {
                alert('Thêm môn học thành công!');
                setShowModal(false);
                fetchSubjects(); // Reload list
                setFormData({ subjectId: '', name: '', sessions: 45, coeff: 1, type: 'Cơ bản' }); // Reset
            } else {
                alert(result.message || 'Thêm thất bại (Mã môn có thể đã tồn tại)');
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi kết nối server');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Bạn có chắc muốn xóa môn học này?')) return;
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`http://localhost:3001/api/subject/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                alert('Xóa môn học thành công');
                fetchSubjects();
            } else {
                alert('Xóa thất bại');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi xóa');
        }
    }

    return (
        <Layout breadcrumbs={['Trang chủ', 'Môn học', 'Danh sách']}>
            <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Danh sách môn học</h2>
                        <p className="text-text-secondary text-base">Quản lý danh sách, số tiết và hệ số của các môn học.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit"
                    >
                        <Plus size={20} />
                        Thêm môn học mới
                    </button>
                </div>

                <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col min-h-[400px]">
                    <div className="p-4 border-b border-surface-dim bg-surface-dim/20 flex gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                            <input className="w-full pl-11 pr-4 py-2 bg-white border border-surface-dim rounded-xl text-text-main placeholder-text-secondary text-sm" placeholder="Tìm kiếm môn học..." />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#fafaf5] border-b border-surface-dim">
                                <tr>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Mã môn</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Tên môn</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Số tiết</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Hệ số</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Trạng thái</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-dim">
                                {loading ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Đang tải dữ liệu...</td></tr>
                                ) : subjects.length === 0 ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Chưa có môn học nào.</td></tr>
                                ) : (
                                    subjects.map(subject => (
                                        <tr key={subject._id || subject.subjectId} className="hover:bg-surface-dim/30 group">
                                            <td className="py-4 px-6 text-sm font-medium">{subject.subjectId}</td>
                                            <td className="py-4 px-6 text-sm font-semibold">{subject.name}</td>
                                            {/* Các field fake do BE chưa có */}
                                            <td className="py-4 px-6 text-sm italic text-text-secondary">--</td>
                                            <td className="py-4 px-6 text-sm italic text-text-secondary">--</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700`}>
                                                    Hoạt động
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => alert('Chức năng sửa đang được phát triển')}
                                                        className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(subject._id)}
                                                        className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                                        <Ban size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
                    <div className="bg-surface-light w-full max-w-lg rounded-2xl shadow-xl border border-surface-dim flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-dim">
                            <h3 className="text-xl font-semibold text-text-main leading-tight">Thêm môn học mới</h3>
                            <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full p-2 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form className="flex flex-col gap-5" onSubmit={handleCreateSubject}>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-medium text-text-main">Tên môn học <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                                            placeholder="Ví dụ: Toán học"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <Book className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-text-main">Mã môn <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <input
                                                className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm focus:ring-2 focus:ring-primary focus:bg-white"
                                                placeholder="VD: TOAN"
                                                value={formData.subjectId}
                                                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                                                required
                                            />
                                            <Hash className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-text-main">Loại môn</label>
                                        <select
                                            className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm appearance-none focus:ring-2 focus:ring-primary focus:bg-white cursor-pointer"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option>Cơ bản</option>
                                            <option>Nâng cao</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-text-main">Số tiết / Năm</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                                                value={formData.sessions}
                                                onChange={(e) => setFormData({ ...formData, sessions: Number(e.target.value) })}
                                            />
                                            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-medium text-text-main">Hệ số điểm</label>
                                        <div className="relative">
                                            <input
                                                type="number" step="0.5"
                                                className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                                                value={formData.coeff}
                                                onChange={(e) => setFormData({ ...formData, coeff: Number(e.target.value) })}
                                            />
                                            <Calculator className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-orange-500 italic mt-0">* Lưu ý: Hiện tại hệ thống chỉ lưu Tên và Mã môn.</p>

                                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-dim">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-surface-dim text-text-main font-medium text-sm hover:bg-surface-dim transition-colors">Hủy bỏ</button>
                                    <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-text-main font-bold text-sm shadow-sm hover:bg-[#eae605] active:scale-95 transition-all">Lưu thay đổi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default SubjectList;