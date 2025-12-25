import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { ArrowLeft, Search, Trash2, UserX } from 'lucide-react';

interface Student {
    _id: string;
    studentId: string;
    fullname: string;
    dob: string;
    sex: string;
    phone: string;
    address: string;
}

interface ClassModel {
    _id: string;
    className: string;
    grade: number;
    quantity: number;
    homeroomTeacher: string;
}

const ClassDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [classInfo, setClassInfo] = useState<ClassModel | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const fetchData = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            // Fetch Class Info
            const resClass = await fetch(`http://localhost:3001/api/class/${id}`, { headers });
            const dataClass = await resClass.json();
            if (dataClass.data) setClassInfo(dataClass.data);

            // Fetch Students in Class
            const resStudents = await fetch(`http://localhost:3001/api/class/${id}/students`, { headers });
            const dataStudents = await resStudents.json();
            if (dataStudents.data) setStudents(dataStudents.data);

        } catch (error) {
            console.error("Lỗi khi tải thông tin lớp học:", error);
            alert('Không thể tải thông tin lớp học');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleRemoveStudent = async (studentId: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa học sinh này khỏi lớp?')) return;
        await removeStudentApi(studentId);
        fetchData();
    };

    const handleBatchRemove = async () => {
        if (selectedIds.length === 0) return;
        if (!window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} học sinh đã chọn khỏi lớp?`)) return;

        for (const sid of selectedIds) {
            await removeStudentApi(sid);
        }
        alert(`Đã xóa ${selectedIds.length} học sinh.`);
        setSelectedIds([]);
        fetchData();
    }

    const removeStudentApi = async (studentId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            await fetch(`http://localhost:3001/api/class/removeStudent/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ studentId })
            });
        } catch (error) {
            console.error(error);
        }
    }

    const toggleSelect = (studentId: string) => {
        if (selectedIds.includes(studentId)) {
            setSelectedIds(selectedIds.filter(id => id !== studentId));
        } else {
            setSelectedIds([...selectedIds, studentId]);
        }
    }

    const selectAll = () => {
        if (selectedIds.length === filteredStudents.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredStudents.map(s => s._id));
        }
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    }

    const filteredStudents = students.filter(s =>
        (s.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.studentId || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout breadcrumbs={['Trang chủ', 'Xếp lớp', classInfo ? `Lớp ${classInfo.className}` : 'Chi tiết lớp']}>
            <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/classes')} className="p-2 hover:bg-surface-dim rounded-full transition-colors text-text-secondary hover:text-text-main">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-text-main tracking-tight">Chi tiết lớp học</h2>
                        {classInfo && <p className="text-text-secondary">Quản lý danh sách học sinh lớp <span className="font-semibold text-primary">{classInfo.className}</span></p>}
                    </div>
                </div>

                <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col min-h-[500px]">

                    {/* Header & Stats */}
                    <div className="p-6 border-b border-surface-dim flex flex-col md:flex-row justify-between items-end gap-4 bg-surface-dim/20">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Tên lớp</p>
                                <p className="text-xl font-bold text-text-main">{classInfo?.className || '--'}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-text-secondary uppercase mb-1">Sĩ số hiện tại</p>
                                <p className="text-xl font-bold text-text-main flex items-center gap-2">
                                    {students.length} / {classInfo?.quantity || '--'}
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${students.length >= (classInfo?.quantity || 0) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {students.length >= (classInfo?.quantity || 0) ? 'Đầy' : 'Còn trống'}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative w-full md:w-auto min-w-[300px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                                <input
                                    className="w-full pl-11 pr-4 py-2.5 bg-white border border-surface-dim rounded-xl text-text-main placeholder-text-secondary text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Tìm kiếm học sinh trong lớp..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {selectedIds.length > 0 && (
                                <button
                                    onClick={handleBatchRemove}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    <Trash2 size={18} />
                                    Xóa ({selectedIds.length})
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#fafaf5] border-b border-surface-dim">
                                <tr>
                                    <th className="py-4 px-6 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                                            onChange={selectAll}
                                            className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                                        />
                                    </th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Mã HS</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Họ và tên</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Ngày sinh</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase">Giới tính</th>
                                    <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-surface-dim">
                                {loading ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Đang tải dữ liệu...</td></tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr><td colSpan={6} className="p-8 text-center text-text-secondary">Lớp học chưa có học sinh nào.</td></tr>
                                ) : (
                                    filteredStudents.map((student, index) => (
                                        <tr
                                            key={student._id || index}
                                            className={`hover:bg-surface-dim/30 group transition-colors ${selectedIds.includes(student._id) ? 'bg-orange-50' : ''}`}
                                            onClick={(e) => {
                                                if ((e.target as HTMLElement).closest('input[type="checkbox"]')) return;
                                                toggleSelect(student._id);
                                            }}
                                        >
                                            <td className="py-4 px-6 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(student._id)}
                                                    onChange={() => toggleSelect(student._id)}
                                                    className="rounded border-gray-300 text-primary focus:ring-primary size-4 cursor-pointer"
                                                />
                                            </td>
                                            <td className="py-4 px-6 text-sm font-medium font-mono text-text-secondary">{student.studentId}</td>
                                            <td className="py-4 px-6 text-sm font-semibold text-text-main">{student.fullname}</td>
                                            <td className="py-4 px-6 text-sm text-text-secondary">{formatDate(student.dob)}</td>
                                            <td className="py-4 px-6 text-sm text-text-secondary">{student.sex}</td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveStudent(student._id);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Xóa khỏi lớp, trở về danh sách chờ"
                                                >
                                                    <UserX size={16} />
                                                    Xóa khỏi lớp
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ClassDetail;
