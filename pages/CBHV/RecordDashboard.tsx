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
    className?: string | null;
}

interface ClassModel {
    _id: string;
    className: string;
}

interface Subject {
    _id: string;
    subjectId: string;
    name: string;
}

interface Grade {
    _id: string;
    subjectId: string;
    hs1: number;
    hs2: number;
    hs3: number;
}

const RecordDashboard = () => {
    const [view, setView] = useState<'preview' | 'list'>('list');
    const [students, setStudents] = useState<Student[]>([]);
    const [classes, setClasses] = useState<ClassModel[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterClass, setFilterClass] = useState('all');

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

                // Fetch Subjects
                const resSub = await fetch('http://localhost:3001/api/subject', { headers });
                const dataSub = await resSub.json();
                if (dataSub.data) setSubjects(dataSub.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSelectStudent = async (student: Student) => {
        setSelectedStudent(student);
        setView('preview');
        // Fetch grades for selected student
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(`http://localhost:3001/api/subject-grade/student/${student.studentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.data) setGrades(data.data);
            else setGrades([]);
        } catch (error) {
            console.error(error);
            setGrades([]);
        }
    }

    const filteredStudents = students.filter(s => {
        const matchName = (s.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) || (s.studentId || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchClass = filterClass === 'all' || (s.className === filterClass);
        return matchName && matchClass;
    });

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
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
                                    value={filterClass}
                                    onChange={(e) => setFilterClass(e.target.value)}
                                    className="w-full py-3 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm cursor-pointer">
                                    <option value="all">Tất cả</option>
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
                                    <h3 className="font-semibold text-text-main mb-2">Danh sách lớp (Demo)</h3>
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
                                        </div>
                                        <div className="text-right">
                                            <p className="mb-1"><span className="font-semibold">Mã HS:</span> {selectedStudent.studentId}</p>
                                            <p className="mb-1"><span className="font-semibold">Năm học:</span> 2023 - 2024</p>
                                        </div>
                                    </div>
                                    <table className="w-full text-xs border-collapse border border-black mb-6">
                                        <thead>
                                            <tr className="border-b border-black">
                                                <th className="border-r border-black p-2 text-left w-10">STT</th>
                                                <th className="border-r border-black p-2 text-left">Môn học</th>
                                                <th className="border-r border-black p-2 w-16 text-center">TB Các Năm</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subjects.map((sub, index) => {
                                                const grade = grades.find(g => g.subjectId === sub.subjectId);
                                                const avg = grade ? ((grade.hs1 + grade.hs2 * 2 + grade.hs3 * 3) / 6).toFixed(1) : '--';
                                                return (
                                                    <tr key={sub._id} className="border-b border-black">
                                                        <td className="border-r border-black p-2 text-center">{index + 1}</td>
                                                        <td className="border-r border-black p-2 font-semibold">{sub.name}</td>
                                                        <td className="border-r border-black p-2 text-center font-bold">{avg}</td>
                                                    </tr>
                                                );
                                            })}
                                            {subjects.length === 0 && (
                                                <tr><td colSpan={3} className="p-2 text-center italic text-text-secondary">Chưa có dữ liệu môn học</td></tr>
                                            )}
                                        </tbody>
                                    </table>

                                    <div className="mt-8 pt-4 border-t border-black">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold mb-2">Tổng kết:</h4>
                                                {(() => {
                                                    let totalScore = 0;
                                                    let subjectCount = 0;
                                                    let isMissingGrade = false;

                                                    subjects.forEach(sub => {
                                                        const grade = grades.find(g => g.subjectId === sub.subjectId);
                                                        if (grade) {
                                                            const avg = (grade.hs1 + grade.hs2 * 2 + grade.hs3 * 3) / 6;
                                                            totalScore += avg;
                                                            subjectCount++;
                                                        } else {
                                                            isMissingGrade = true;
                                                        }
                                                    });

                                                    const gpa = subjectCount > 0 ? (totalScore / subjectCount).toFixed(1) : 'Unknown';
                                                    let classification = '';
                                                    if (gpa === 'Unknown') classification = 'Chưa đủ điểm';
                                                    else {
                                                        const score = parseFloat(gpa as string);
                                                        if (score >= 8.0) classification = 'Giỏi';
                                                        else if (score >= 6.5) classification = 'Khá';
                                                        else if (score >= 5.0) classification = 'Trung bình';
                                                        else classification = 'Yếu';
                                                    }

                                                    return (
                                                        <div className="text-sm">
                                                            <p className="mb-1"><span className="font-semibold">Điểm trung bình (GPA):</span> {gpa}</p>
                                                            <p className="mb-1"><span className="font-semibold">Học lực:</span> {classification}</p>
                                                            <p className="mb-1"><span className="font-semibold">Hạnh kiểm:</span> Tốt</p>
                                                            {isMissingGrade && <p className="text-xs text-red-500 italic mt-2">* Chưa đủ điểm tất cả các môn</p>}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                            <div className="text-center pr-8">
                                                <p className="italic text-xs mb-2">Ngày ..... tháng ..... năm 2024</p>
                                                <p className="font-bold uppercase">Hiệu trưởng</p>
                                                <p className="text-xs italic">(Ký, ghi rõ họ tên, đóng dấu)</p>
                                            </div>
                                        </div>
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
                                        <tr><td colSpan={4} className="p-6 text-center text-text-secondary">Đang tải...</td></tr>
                                    ) : filteredStudents.length === 0 ? (
                                        <tr><td colSpan={4} className="p-6 text-center text-text-secondary">Không tìm thấy học sinh.</td></tr>
                                    ) : (
                                        filteredStudents.map(s => (
                                            <tr key={s._id} className="hover:bg-surface-dim/30">
                                                <td className="px-6 py-4 font-medium">{s.studentId}</td>
                                                <td className="px-6 py-4 font-semibold">{s.fullname}</td>
                                                <td className="px-6 py-4 text-sm text-text-secondary">{formatDate(s.dob)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s.className ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                                        {s.className || 'Chưa xếp lớp'}
                                                    </span>
                                                </td>
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