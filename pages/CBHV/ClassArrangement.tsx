import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Save, Plus, Grid, List, Lock, Search, UserCheck, Users } from 'lucide-react';

interface Student {
    _id: string;
    studentId: string;
    fullname: string;
    dob: string;
    sex: string;
}

interface ClassModel {
    _id: string;
    className: string;
    grade: number;
    quantity: number; // Capacity
    homeroomTeacher: string; // Teacher ID
    actualSize?: number; // Fetched separately
}

interface Teacher {
    _id: string;
    teacherId: string;
    fullname?: string;
    name?: string;
}

const ClassArrangement = () => {
    const navigate = useNavigate();
    const [waitingStudents, setWaitingStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<ClassModel[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const headers = { 'Authorization': `Bearer ${token}` };

            // 1. Fetch Waiting List
            const resWait = await fetch('http://localhost:3001/api/student/waiting', { headers });
            const dataWait = await resWait.json();

            // 2. Fetch All Students (to map waiting list details)
            const resStudents = await fetch('http://localhost:3001/api/student', { headers });
            const dataStudents = await resStudents.json();
            const allStudents = dataStudents.data || [];

            if (dataWait.data && Array.isArray(dataWait.data)) {
                const waitingIds = dataWait.data.map((e: any) => e.studentId);
                const waitingList = allStudents.filter((s: Student) => waitingIds.includes(s.studentId));
                setWaitingStudents(waitingList);
            } else {
                setWaitingStudents([]);
            }

            // 3. Fetch Classes
            const resClasses = await fetch('http://localhost:3001/api/class', { headers });
            const dataClasses = await resClasses.json();
            if (dataClasses.data) {
                let initialClasses = (dataClasses.data as ClassModel[]).sort((a, b) => a.className.localeCompare(b.className));

                // 3b. Fetch Actual Size for each class
                const classesWithSize = await Promise.all(initialClasses.map(async (cls) => {
                    try {
                        const resCount = await fetch(`http://localhost:3001/api/class/${cls._id}/students`, { headers });
                        const dataCount = await resCount.json();
                        return { ...cls, actualSize: dataCount.data ? dataCount.data.length : 0 };
                    } catch (e) {
                        return { ...cls, actualSize: 0 };
                    }
                }));

                setClasses(classesWithSize);
            }

            // 4. Fetch Teachers
            try {
                const resTeachers = await fetch('http://localhost:3001/api/teacher', { headers });
                const dataTeachers = await resTeachers.json();
                if (dataTeachers.data) setTeachers(dataTeachers.data);
            } catch (err) {
                console.warn("Could not fetch teachers", err);
            }

        } catch (error) {
            console.error("Lỗi tải dữ liệu xếp lớp", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toggleSelect = (studentId: string) => {
        if (selectedIds.includes(studentId)) {
            setSelectedIds(selectedIds.filter(id => id !== studentId));
        } else {
            setSelectedIds([...selectedIds, studentId]);
        }
    }

    const selectAll = () => {
        if (selectedIds.length === filteredWaiting.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredWaiting.map(s => s.studentId));
        }
    }

    const handleAddToClass = async (classId: string, className: string) => {
        if (selectedIds.length === 0) {
            alert('Vui lòng chọn học sinh từ danh sách chờ trước.');
            return;
        }
        if (!window.confirm(`Xếp ${selectedIds.length} học sinh vào lớp ${className}?`)) return;

        try {
            const token = localStorage.getItem('accessToken');
            await Promise.all(selectedIds.map(sid =>
                fetch(`http://localhost:3001/api/class/addStudent/${classId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ studentId: sid }) // Sending Student ID String (e.g. HS001)
                })
            ));

            alert('Xếp lớp thành công!');
            setSelectedIds([]);
            setTimeout(() => fetchData(), 1000); // Wait 1s for DB consistency
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi xếp lớp');
        }
    }

    const getTeacherName = (id: string) => {
        if (!id) return 'Chưa phân công';
        const teacher = teachers.find(t => String(t._id) === String(id) || String(t.teacherId) === String(id));
        return teacher ? (teacher.fullname || teacher.name || id) : id;
    }

    const filteredWaiting = waitingStudents.filter(s =>
        (s.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.studentId || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout breadcrumbs={['Trang chủ', 'Xếp lớp', 'Khối 10']}>
            <div className="max-w-[1440px] mx-auto p-4 lg:p-6 flex flex-col gap-6 h-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
                    <div>
                        <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Xếp lớp học sinh</h2>
                        <p className="text-text-secondary text-base">Phân bổ học sinh vào các lớp đảm bảo sĩ số.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={fetchData} className="px-5 py-2.5 rounded-full border border-surface-dim text-text-main font-medium text-sm hover:bg-surface-dim transition-colors">
                            Làm mới
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
                    {/* Left Panel: Waiting List */}
                    <div className="lg:col-span-5 flex flex-col h-full bg-surface-light border border-surface-dim rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-surface-dim bg-surface-dim/20 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <h3 className="text-[18px] font-semibold text-text-main">Chờ xếp lớp <span className="text-text-secondary text-sm font-normal ml-1">({waitingStudents.length})</span></h3>
                                <button
                                    onClick={selectAll}
                                    className="text-xs font-medium text-primary-hover hover:underline bg-text-main text-white px-2 py-1 rounded">
                                    {selectedIds.length === filteredWaiting.length && filteredWaiting.length > 0 ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                                </button>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                <input
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-surface-dim rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
                                    placeholder="Tìm tên hoặc mã học sinh..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-white">
                            {loading ? (
                                <div className="p-4 text-center text-sm text-text-secondary">Đang tải...</div>
                            ) : filteredWaiting.length === 0 ? (
                                <div className="p-4 text-center text-sm text-text-secondary">Không có học sinh nào chờ xếp lớp.</div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-surface-dim/30 sticky top-0 z-10 backdrop-blur-sm text-xs font-semibold text-text-secondary uppercase tracking-wider">
                                        <tr>
                                            <th className="p-3 w-10 text-center border-b border-surface-dim"></th>
                                            <th className="p-3 border-b border-surface-dim">Mã HS</th>
                                            <th className="p-3 border-b border-surface-dim">Họ tên</th>
                                            <th className="p-3 border-b border-surface-dim">Giới tính</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-surface-dim text-sm text-text-main">
                                        {filteredWaiting.map(s => (
                                            <tr
                                                key={s._id || s.studentId}
                                                onClick={() => toggleSelect(s.studentId)}
                                                className={`hover:bg-primary/5 group cursor-pointer transition-colors ${selectedIds.includes(s.studentId) ? 'bg-primary/10' : ''}`}>
                                                <td className="p-3 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.includes(s.studentId)}
                                                        onChange={() => toggleSelect(s.studentId)}
                                                        className="rounded border-gray-300 text-primary focus:ring-primary size-4 pointer-events-none"
                                                    />
                                                </td>
                                                <td className="p-3 font-mono text-xs text-text-secondary">{s.studentId}</td>
                                                <td className="p-3 font-medium">{s.fullname}</td>
                                                <td className="p-3">{s.sex}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="p-2 border-t border-surface-dim bg-gray-50 text-xs text-center text-text-secondary">
                            Đang chọn: <span className="font-bold text-primary">{selectedIds.length}</span> học sinh
                        </div>
                    </div>

                    {/* Right Panel: Class List */}
                    <div className="lg:col-span-7 flex flex-col h-full bg-surface-light border border-surface-dim rounded-2xl shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-surface-dim flex items-center justify-between">
                            <h3 className="text-[18px] font-semibold text-text-main">Danh sách lớp học</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`size-8 flex items-center justify-center rounded-lg ${viewMode === 'grid' ? 'bg-surface-dim text-text-main' : 'hover:bg-surface-dim text-text-secondary'}`}
                                >
                                    <Grid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`size-8 flex items-center justify-center rounded-lg ${viewMode === 'list' ? 'bg-surface-dim text-text-main' : 'hover:bg-surface-dim text-text-secondary'}`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf5]">
                            {loading && <div className="text-center">Đang tải danh sách lớp...</div>}
                            {!loading && classes.length === 0 && <div className="text-center text-text-secondary">Chưa có lớp học nào.</div>}

                            {/* Grid View */}
                            {viewMode === 'grid' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {classes.map(cls => (
                                        <div key={cls._id || cls.className} className="flex flex-col bg-white border border-surface-dim rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary transition-all group relative">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4
                                                    onClick={() => navigate(`/classes/${cls._id}`)}
                                                    className="text-[18px] font-bold text-text-main cursor-pointer hover:text-primary transition-colors hover:underline"
                                                    title="Xem chi tiết lớp"
                                                >
                                                    {cls.className}
                                                </h4>
                                                <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded">Khối {cls.grade}</span>
                                            </div>
                                            <div className="mt-1">
                                                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                                                    <span className="text-text-secondary">Sĩ số</span>
                                                    <span className={`${(cls.actualSize || 0) >= cls.quantity ? 'text-red-500' : 'text-text-main'}`}>
                                                        {cls.actualSize !== undefined ? `${cls.actualSize}/${cls.quantity}` : `Error/${cls.quantity}`}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-text-secondary font-medium">GVCN: {getTeacherName(cls.homeroomTeacher)}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-surface-dim border-dashed">
                                                <button
                                                    onClick={() => handleAddToClass(cls._id, cls.className)}
                                                    disabled={selectedIds.length === 0 || (cls.actualSize || 0) >= cls.quantity}
                                                    className="w-full py-2 rounded-lg border-2 border-dashed border-surface-dim bg-surface-dim/30 flex items-center justify-center text-text-secondary text-xs font-semibold group-hover:border-primary group-hover:bg-primary/10 group-hover:text-text-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                    <UserCheck size={16} className="mr-1" />
                                                    {selectedIds.length > 0 ? `Thêm ${selectedIds.length} HS` : 'Chọn HS để thêm'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* List View */}
                            {viewMode === 'list' && (
                                <div className="bg-white rounded-xl border border-surface-dim overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-surface-dim/30 text-xs font-semibold text-text-secondary uppercase">
                                            <tr>
                                                <th className="p-3 border-b border-surface-dim">Lớp</th>
                                                <th className="p-3 border-b border-surface-dim">Khối</th>
                                                <th className="p-3 border-b border-surface-dim">Sĩ số</th>
                                                <th className="p-3 border-b border-surface-dim">GVCN</th>
                                                <th className="p-3 border-b border-surface-dim text-right">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-surface-dim">
                                            {classes.map(cls => (
                                                <tr key={cls._id} className="hover:bg-primary/5 transition-colors">
                                                    <td
                                                        onClick={() => navigate(`/classes/${cls._id}`)}
                                                        className="p-3 font-bold text-text-main cursor-pointer hover:text-primary hover:underline"
                                                    >
                                                        {cls.className}
                                                    </td>
                                                    <td className="p-3 text-sm">{cls.grade}</td>
                                                    <td className="p-3 text-sm font-semibold">{cls.actualSize}/{cls.quantity}</td>
                                                    <td className="p-3 text-sm">{getTeacherName(cls.homeroomTeacher)}</td>
                                                    <td className="p-3 text-right">
                                                        <button
                                                            onClick={() => handleAddToClass(cls._id, cls.className)}
                                                            disabled={selectedIds.length === 0 || (cls.actualSize || 0) >= cls.quantity}
                                                            className="px-3 py-1.5 rounded-lg border border-surface-dim bg-white shadow-sm text-xs font-bold hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                                                            {selectedIds.length > 0 ? `Thêm ${selectedIds.length} HS` : 'Thêm'}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ClassArrangement;