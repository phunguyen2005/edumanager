
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Search, FileUp, FileDown, Save, ChevronDown, Info } from 'lucide-react';

const subjectId = '694d34c8c2d09ec3928e354e'

const TranscriptDetail: React.FC = () => {
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

        const res = await fetch(`http://localhost:3001/api/class/students/${classId}`, {
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
        
        const students = data.data.flat();

        const transformedStudents = students.map((student: any, index: number) => ({
          id: student._id,
          stt: index + 1,
          studentId: student.studentId,
          name: student.fullname,
          avatar: student.avatar,
          m15_1: '',
          midterm: '',
          final: '',
          total: ''
        }));
        console.log('Transformed Students:', students);
        
        setStudents(transformedStudents);
        
        // Get class name from first student
        if (data.data && data.data.length > 0) {
          setClassName(data.data[0].className || className);
        }
      } catch (error) {
        console.error(error instanceof Error ? error.message : 'Đã có lỗi xảy ra. Hãy thử lại!');
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchStudentsByClass();
    }
  }, [classId]);

  const handlePostGrades = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) throw new Error('Unauthorized');


    await Promise.all(
      students.map(student => {
        if (student.m15_1 && student.midterm && student.final) {
        return fetch('http://localhost:3001/api/subject-grade', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            subjectId,
            studentId: student.id,
            hs1: Number(student.m15_1) || 0,
            hs2: Number(student.midterm) || 0,
            hs3: Number(student.final) || 0,
          }),
        })
  }})
    );

    alert('Lưu điểm thành công!');
  } catch (error) {
    console.error(error);
    alert(error instanceof Error ? error.message : 'Đã có lỗi xảy ra!');
  }
};

const handleInputChange = (studentId: string, field: string, value: string) => {
  setStudents(prevStudents =>
    prevStudents.map(student =>
      student.id === studentId ? { ...student, [field]: value } : student
    )
  );
};


  return (
    <Layout breadcrumbs={['Danh sách lớp', `Lớp ${className}`, 'Nhập điểm']}>
      <div className="flex flex-col pb-32">
        {/* Title Section */}
        <div className="px-8 pt-2 pb-6">
          <h1 className="text-[32px] font-bold text-[#1e293b] tracking-tight">Nhập điểm lớp {className}</h1>
          <p className="text-[#94a3b8] text-sm font-medium mt-1">Năm học 2023 - 2024</p>
        </div>

        {/* Toolbar */}
        <div className="px-8 py-2 flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4 flex-1">
            <button className="flex items-center gap-6 px-5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#1e293b] shadow-sm hover:bg-gray-50">
              Môn Toán
              <ChevronDown size={16} className="text-[#94a3b8]" />
            </button>
            <div className="relative flex-1 max-w-[340px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]" size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm học sinh..." 
                className="w-full pl-12 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-xl text-sm font-medium text-[#1e293b] placeholder-[#94a3b8] focus:ring-2 focus:ring-[#2563eb]/20 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#475569] shadow-sm hover:bg-gray-50">
              <FileUp size={16} />
              Nhập từ Excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#475569] shadow-sm hover:bg-gray-50">
              <FileDown size={16} />
              Xuất Excel
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="px-8 overflow-hidden">
          {loading ? (
            <div className="text-center py-8 text-[#94a3b8]">Đang tải dữ liệu...</div>
          ) : students.length === 0 ? (
            <div className="text-center py-8 text-[#94a3b8]">Không có học sinh nào</div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                    <th className="py-4 px-4 text-[11px] font-extrabold text-[#94a3b8] uppercase tracking-wider text-center w-16">STT</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-[#94a3b8] uppercase tracking-wider text-left">Họ và tên</th>
                    <th className="py-4 px-2 text-[11px] font-extrabold text-[#94a3b8] uppercase tracking-wider text-center w-24">15 Phút</th>
                    <th className="py-4 px-2 text-[11px] font-extrabold text-[#2563eb] uppercase tracking-wider text-center w-28 bg-[#f0f7ff]">Giữa kỳ</th>
                    <th className="py-4 px-2 text-[11px] font-extrabold text-[#2563eb] uppercase tracking-wider text-center w-28">Cuối kỳ</th>
                    <th className="py-4 px-6 text-[11px] font-extrabold text-[#94a3b8] uppercase tracking-wider text-center w-28">Tổng kết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-[#94a3b8] font-bold text-center">{student.stt}</td>
                      <td className="py-4 px-6 text-left">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt="" className="size-9 rounded-full bg-gray-100 object-cover" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1e293b] leading-tight">{student.name}</span>
                            <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-tight mt-0.5">ID: {student.studentId}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <input
                          type="text"
                          value={student.m15_1}
                          onChange={(e) => handleInputChange(student.id, 'm15_1', e.target.value)}
                          className="w-16 h-10 text-center bg-white border border-[#e2e8f0] rounded-lg text-sm font-bold text-[#1e293b] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all shadow-sm"
                        />
                      </td>
                      <td className="py-4 px-2 bg-[#f0f7ff]/50">
                        <input
                          type="text"
                          value={student.midterm}
                          onChange={(e) => handleInputChange(student.id, 'midterm', e.target.value)}
                          className="w-20 h-10 text-center bg-white border border-[#2563eb]/20 rounded-lg text-sm font-bold text-[#2563eb] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all shadow-sm"
                        />
                      </td>
                      <td className="py-4 px-2">
                        <input
                          type="text"
                          value={student.final}
                          onChange={(e) => handleInputChange(student.id, 'final', e.target.value)}
                          className="w-20 h-10 text-center bg-white border border-[#e2e8f0] rounded-lg text-sm font-bold text-[#1e293b] focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] outline-none transition-all shadow-sm"
                        />
                      </td>
                      <td className="py-4 px-6 text-sm font-bold text-[#1e293b] text-center">{student.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Floating Footer */}
        <div className="fixed bottom-0 left-[260px] right-0 bg-white border-t border-[#e2e8f0] px-8 py-4 flex items-center justify-between z-30 shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-3 text-[#64748b]">
            <Info size={16} className="text-[#94a3b8]" />
            <span className="text-xs font-semibold tracking-tight">Nhập điểm trong thang 0-10. Tự động lưu mỗi 5 phút.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handlePostGrades} className="px-6 py-2.5 rounded-xl border border-[#e2e8f0] text-sm font-bold text-[#1e293b] hover:bg-gray-50 transition-colors">
              Lưu tạm thời
            </button>
            <button
              onClick={handlePostGrades}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#2563eb] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Save size={18} />
              Lưu và Chốt điểm
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TranscriptDetail;
