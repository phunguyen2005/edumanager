import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockStudents } from './mockData';
import { Layout } from '../../components/Layout';

const StudentGradesList: React.FC = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const [students, setStudents] = useState<any[]>([]);
  const [className, setClassName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudentsByClass = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Unauthorized');

        const res = await fetch(`http://localhost:3001/api/student/class/${classId}`, {
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
        console.log('Fetch students by class:', data);
        
        setStudents(data.data || []);
        
        // Get class name from first student or use classId
        if (data.data && data.data.length > 0) {
          setClassName(data.data[0].className || className);
        } else {
          setClassName(className);
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : 'Đã có lỗi xảy ra. Hãy thử lại!');
        setStudents(mockStudents); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchStudentsByClass();
    }
  }, [classId]);

  return (
    <Layout breadcrumbs={['Giáo viên', 'Quản lý điểm']}>
        <div className="p-4 lg:p-8 max-w-[1440px] mx-auto space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h2 className="text-2xl font-bold text-text-main">Danh sách học sinh - Lớp {className}</h2>
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

            {loading ? (
              <div className="text-center py-8 text-text-secondary">Đang tải dữ liệu...</div>
            ) : (
            <>
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
                        <option>{className}</option>
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
                    <h3 className="font-bold text-text-main">Danh sách học sinh (Lớp {className})</h3>
                    <div className="text-sm font-medium text-text-secondary">
                        Tổng số: <span className="font-bold text-text-main">{students.length}</span> học sinh
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
                        {students.length > 0 ? (
                          students.map((student, index) => (
                            <tr key={student._id || index} className="hover:bg-surface-dim/30 transition-colors group">
                                <td className="px-6 py-4 text-center text-text-secondary font-medium">{index + 1}</td>
                                <td className="px-6 py-4 text-text-main font-bold">{student.studentId}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                        {student.fullname?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="font-bold text-text-main">{student.fullname}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-text-main font-medium">{student.className}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                        Đủ điểm các môn
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                                        Đã đánh giá
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => navigate(`/teacher/transcript/${student.studentId}`)}
                                        className="text-text-main hover:text-primary-hover font-bold text-sm inline-flex items-center gap-1 hover:underline decoration-2"
                                    >
                                        Lập bảng điểm
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-6 py-8 text-center text-text-secondary">
                              Không có học sinh nào
                            </td>
                          </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t border-surface-dim bg-white">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                        <p className="text-sm text-text-secondary font-medium">
                            Hiển thị <span className="font-bold text-text-main">1</span> đến <span className="font-bold text-text-main">{Math.min(5, students.length)}</span> trong số <span className="font-bold text-text-main">{students.length}</span> kết quả
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
            </>
            )}
        </div>
    </Layout>
  );
};

export default StudentGradesList;