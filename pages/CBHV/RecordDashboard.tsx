import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { History, Search, Download, ZoomIn, ZoomOut, CheckCircle, XCircle, Eye, ArrowLeft, Printer } from 'lucide-react';

interface Student {
    _id: string;
    studentId: string;
    fullname: string;
    dob: string;
    sex: string;
    address: string;
    className?: string; // from API
}

interface ClassModel {
    _id: string;
    className: string;
}

const RecordDashboard = () => {
    const [view, setView] = useState<'preview' | 'list'>('list');
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<ClassModel[]>([]);
    const [grades, setGrades] = useState<any[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('accessToken');
                const headers = { 'Authorization': `Bearer ${token}` };

                // Fetch Students
                const resStu = await fetch('http://localhost:3001/api/student', { headers });
                const dataStu = await resStu.json();
                if (dataStu.data) setStudents(dataStu.data);

                // Fetch Classes (for filter)
                const resClass = await fetch('http://localhost:3001/api/class', { headers });
                const dataClass = await resClass.json();
                if (dataClass.data) setClasses(dataClass.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Fetch Grades when student selected
    useEffect(() => {
        if (selectedStudent) {
            const fetchGrades = async () => {
                try {
                    const token = localStorage.getItem('accessToken');
                    const res = await fetch(`http://localhost:3001/api/subject-grade/student/${selectedStudent.studentId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await res.json();
                    if (data.data) {
                        setGrades(data.data);
                    } else {
                        setGrades([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch grades", error);
                    setGrades([]);
                }
            }
            fetchGrades();
        }
    }, [selectedStudent]);

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        setView('preview');
    }

    const [selectedClass, setSelectedClass] = useState('');

    // ... (Data fetching remains same)

    const filteredStudents = students.filter(s => {
        const matchesSearch = (s.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.studentId || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass ? s.className === selectedClass : true;
        return matchesSearch && matchesClass;
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    }

    const calculateAverage = (g: any) => {
        if (g.hs1 === undefined || g.hs2 === undefined || g.hs3 === undefined) return '--';
        const avg = (g.hs1 + g.hs2 * 2 + g.hs3 * 3) / 6;
        return avg.toFixed(1);
    }

    return (
        <Layout breadcrumbs={['Trang chủ', 'Quản lý điểm', 'Lập Học bạ']}>
            <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Lập Học bạ</h2>
                        <p className="text-text-secondary text-base">Tính toán, xem trước và xuất học bạ cho học sinh theo kỳ và năm học.</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => setView('list')} className={`border border-surface-dim px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all ${view === 'list' ? 'bg-surface-dim text-text-main' : 'bg-surface-light hover:bg-surface-dim'}`}>
                            Danh sách
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                {view === 'list' && (
                    <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-text-main mb-2">Năm học</label>
                                <select className="w-full py-3 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm cursor-pointer"><option>2023 - 2024</option></select>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-text-main mb-2">Học kỳ</label>
                                <select className="w-full py-3 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm cursor-pointer"><option>Cả năm</option></select>
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-text-main mb-2">Lớp học</label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full py-3 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm cursor-pointer"
                                >
                                    <option value="">Tất cả</option>
                                    {classes.map(c => <option key={c._id} value={c.className}>{c.className}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                    <input
                                        className="w-full pl-9 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary text-sm"
                                        placeholder="Tìm tên HS..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Content Area */}
                {view === 'preview' && selectedStudent ? (
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* List Sidebar */}
                        <div className="w-full lg:w-1/4 flex flex-col gap-4">
                            <button onClick={() => setView('list')} className="flex items-center gap-2 text-text-secondary hover:text-text-main font-medium mb-2">
                                <ArrowLeft size={18} /> Quay lại danh sách
                            </button>
                            <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm flex flex-col h-[600px] overflow-hidden">
                                <div className="p-4 border-b border-surface-dim bg-surface-light sticky top-0 z-10">
                                    <h3 className="font-semibold text-text-main mb-2">Danh sách lớp</h3>
                                </div>
                                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                    {filteredStudents.slice(0, 10).map((s, i) => (
                                        <button
                                            key={s._id}
                                            onClick={() => setSelectedStudent(s)}
                                            className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-colors ${selectedStudent._id === s._id ? 'bg-surface-dim border-l-4 border-primary' : 'hover:bg-surface-dim'}`}>
                                            <div>
                                                <p className="text-sm font-bold text-text-main">{s.fullname}</p>
                                                <p className="text-xs text-text-secondary">MS: {s.studentId}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex-1">
                            <div className="bg-surface-dim/50 rounded-2xl p-4 lg:p-8 border border-surface-dim flex flex-col items-center gap-6">
                                <div className="w-full flex justify-between items-center bg-surface-light p-3 rounded-xl border border-surface-dim shadow-sm">
                                    <div className="flex items-center gap-2"><span className="text-sm font-medium text-text-main">Xem trước bản in (A4)</span></div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-surface-dim rounded-lg"><ZoomOut size={20} /></button>
                                        <button className="p-2 hover:bg-surface-dim rounded-lg"><ZoomIn size={20} /></button>
                                        <button className="flex items-center gap-2 bg-text-main text-white px-4 py-2 rounded-lg font-bold text-sm ml-2">
                                            <Printer size={18} /> Xuất Học bạ
                                        </button>
                                    </div>
                                </div>
                                {/* Paper */}
                                <div className="bg-white w-full max-w-[700px] p-12 text-black shadow-lg min-h-[800px]">
                                    <div className="text-center mb-6">
                                        <h4 className="uppercase font-bold text-lg mb-1">Cộng hòa xã hội chủ nghĩa việt nam</h4>
                                        <p className="text-xs underline underline-offset-2 font-medium mb-4">Độc lập - Tự do - Hạnh phúc</p>
                                        <h1 className="text-2xl font-bold uppercase mt-6 mb-2">Học Bạ Trung Học Phổ Thông</h1>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                        <div>
                                            <p className="mb-1"><span className="font-semibold">Họ và tên:</span> {selectedStudent.fullname.toUpperCase()}</p>
                                            <p className="mb-1"><span className="font-semibold">Ngày sinh:</span> {formatDate(selectedStudent.dob)}</p>
                                            <p className="mb-1"><span className="font-semibold">Lớp:</span> {selectedStudent.className || '--'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="mb-1"><span className="font-semibold">Mã HS:</span> {selectedStudent.studentId}</p>
                                            <p className="mb-1"><span className="font-semibold">Năm học:</span> 2023 - 2024</p>
                                        </div>
                                    </div>
                                    <div className="border border-black mb-6">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="border-b border-black"><th className="border-r border-black p-2 text-left">Môn học</th><th className="p-2 w-16 text-center">Cả năm</th></tr>
                                            </thead>
                                            <tbody>
                                                {grades.length > 0 ? grades.map((g, i) => (
                                                    <tr key={g._id || i} className="border-b border-black last:border-0">
                                                        <td className="border-r border-black p-2 font-semibold">{g.subjectName}</td>
                                                        <td className="p-2 text-center font-bold">{calculateAverage(g)}</td>
                                                    </tr>
                                                )) : (
                                                    <tr><td colSpan={2} className="p-4 text-center italic text-text-secondary">Chưa có dữ liệu điểm môn học nào.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-surface-dim/50 border-b border-surface-dim">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Mã HS</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Họ và tên</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Ngày sinh</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Lớp</th>
                                        <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase text-right">Hành động</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-dim">
                                    {loading ? (
                                        <tr><td colSpan={5} className="p-6 text-center text-text-secondary">Đang tải...</td></tr>
                                    ) : filteredStudents.length === 0 ? (
                                        <tr><td colSpan={5} className="p-6 text-center text-text-secondary">Không tìm thấy học sinh.</td></tr>
                                    ) : (
                                        filteredStudents.map(s => (
                                            <tr key={s._id} className="hover:bg-surface-dim/30">
                                                <td className="px-6 py-4 font-medium">{s.studentId}</td>
                                                <td className="px-6 py-4 font-semibold">{s.fullname}</td>
                                                <td className="px-6 py-4 text-sm text-text-secondary">{formatDate(s.dob)}</td>
                                                <td className="px-6 py-4 text-sm text-text-secondary font-semibold">{s.className || '--'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleSelectStudent(s)}
                                                        className="p-2 text-text-secondary hover:text-primary"
                                                        title="Xem học bạ"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default RecordDashboard;