import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Search, X, MoveRight, Info, Check, LogOut, User } from 'lucide-react';

interface Student {
  _id: string;
  studentId: string;
  fullname: string;
  dob: string;
  sex: string;
  avatar: string;
  className?: string | null;
}

interface ClassModel {
  _id: string;
  className: string;
  quantity: number;
  actualSize?: number;
}

const TransferClass = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [targetClassId, setTargetClassId] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = { 'Authorization': `Bearer ${token}` };

        // Fetch Students (Cache all for now for client-side search)
        const resStu = await fetch('http://localhost:3001/api/student', { headers });
        const dataStu = await resStu.json();
        if (dataStu.data) setStudents(dataStu.data);

        // Fetch Classes
        const resClass = await fetch('http://localhost:3001/api/class', { headers });
        const dataClass = await resClass.json();

        if (dataClass.data) {
          const initialClasses = dataClass.data;
          // Fetch actual size for each class
          const classesWithSize = await Promise.all(initialClasses.map(async (cls: ClassModel) => {
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
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const lower = searchTerm.toLowerCase();
    const results = students.filter(s =>
      (s.fullname || '').toLowerCase().includes(lower) ||
      (s.studentId || '').toLowerCase().includes(lower)
    );
    setSearchResults(results.slice(0, 5));
  }, [searchTerm, students]);

  const handleSelectStudent = (s: Student) => {
    setSelectedStudent(s);
    setSearchTerm('');
    setSearchResults([]);
  }

  const handleSubmit = async () => {
    if (!selectedStudent) return alert('Vui lòng chọn học sinh');
    if (!targetClassId) return alert('Vui lòng chọn lớp đích');

    if (!window.confirm(`Xác nhận chuyển học sinh ${selectedStudent.fullname} sang lớp mới?`)) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:3001/api/student/changeClass/${selectedStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newClassId: targetClassId,
          reason: reason
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Chuyển lớp thành công!');
        setSelectedStudent(null);
        setTargetClassId('');
        setReason('');
      } else {
        alert(data.message || 'Lỗi chuyển lớp');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  return (
    <Layout breadcrumbs={['Trang chủ', 'Xếp lớp', 'Chuyển lớp']}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Chuyển lớp</h2>
            <p className="text-text-secondary text-base">Tìm kiếm học sinh và thực hiện chuyển lớp học trong học kỳ hiện tại.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Search Box */}
            <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim relative z-20">
              <h3 className="text-base font-bold text-text-main mb-4 uppercase tracking-wide">Tìm kiếm học sinh</h3>
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input
                  className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
                  placeholder="Nhập tên học sinh hoặc mã số học sinh..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/5 rounded-full text-text-secondary transition-colors">
                    <X size={18} />
                  </button>
                )}

                {/* Autocomplete Results */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-surface-dim overflow-hidden max-h-[300px] overflow-y-auto">
                    {searchResults.map(s => (
                      <button
                        key={s._id}
                        onClick={() => handleSelectStudent(s)}
                        className="w-full text-left px-4 py-3 hover:bg-surface-dim border-b border-surface-dim last:border-0 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-text-main text-sm">{s.fullname}</p>
                          <p className="text-xs text-text-secondary">{s.studentId}</p>
                        </div>
                        <PlusIcon />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Student Info Card */}
            {selectedStudent ? (
              <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="size-24 sm:size-32 rounded-2xl bg-gray-200 bg-cover bg-center flex-shrink-0 shadow-inner flex items-center justify-center overflow-hidden">
                    {selectedStudent.avatar ? (
                      <img src={selectedStudent.avatar} className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-text-secondary" />
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-text-main">{selectedStudent.fullname}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded bg-surface-dim text-xs font-mono font-medium text-text-secondary">{selectedStudent.studentId}</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></span>
                        Đã chọn
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-6 pt-6 border-t border-surface-dim">
                      <div>
                        <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Ngày sinh</p>
                        <p className="text-sm font-medium text-text-main">{formatDate(selectedStudent.dob)}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Giới tính</p>
                        <p className="text-sm font-medium text-text-main">{selectedStudent.sex}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Lớp hiện tại</p>
                        <div className="flex items-center gap-1.5">
                          <LogOut size={16} className="text-text-secondary" />
                          <p className="text-base font-bold text-text-main">{selectedStudent.className || 'Chưa xếp lớp'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface-light rounded-2xl p-10 shadow-sm border border-surface-dim flex flex-col items-center justify-center text-center text-text-secondary h-[300px]">
                <Search size={48} className="mb-4 opacity-20" />
                <p>Vui lòng tìm kiếm và chọn một học sinh để thực hiện chuyển lớp</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim sticky top-6">
              <h3 className="text-lg font-bold text-text-main mb-6 flex items-center gap-2">
                <MoveRight className="text-primary" size={24} />
                Thông tin chuyển đến
              </h3>
              <form className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Học kỳ áp dụng</label>
                  <select className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm focus:ring-2 focus:ring-primary focus:bg-white cursor-pointer">
                    <option>Học kỳ hiện tại</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Chọn lớp đích <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      value={targetClassId}
                      onChange={(e) => setTargetClassId(e.target.value)}
                      className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer"
                      disabled={!selectedStudent}
                    >
                      <option disabled value="">Vui lòng chọn lớp</option>
                      {classes.map(c => (
                        <option key={c._id} value={c._id}>{c.className} (Sĩ số: {c.actualSize !== undefined ? c.actualSize : 'Loading...'}/{c.quantity})</option>
                      ))}
                    </select>
                  </div>
                  {targetClassId && (
                    <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
                      <Info size={14} />
                      Đã chọn đích đến.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Lý do chuyển lớp</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white resize-none"
                    placeholder="Nhập lý do chi tiết..."
                  ></textarea>
                </div>

                <div className="pt-4 mt-2 border-t border-surface-dim flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || !selectedStudent || !targetClassId}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-4 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 w-full disabled:opacity-50 disabled:cursor-not-allowed">
                    <Check size={20} />
                    {loading ? 'Đang xử lý...' : 'Xác nhận chuyển lớp'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedStudent(null); setSearchTerm(''); }}
                    className="flex items-center justify-center gap-2 bg-transparent hover:bg-surface-dim text-text-secondary hover:text-text-main px-4 py-3 rounded-xl font-medium text-sm transition-colors w-full">
                    Hủy bỏ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinescap="round" strokeLinejoin="round" className="text-primary"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
)

export default TransferClass;