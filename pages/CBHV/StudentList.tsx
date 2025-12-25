import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight, RefreshCw, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Student {
  _id: string;
  studentId: string;
  fullname: string;
  dob: string;
  sex: string;
  address: string;
  avatar: string;
  className?: string;
}

interface ClassModel {
  _id: string;
  className: string;
}

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<ClassModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterClass, setFilterClass] = useState('all');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3001/api/student', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.data) {
        setStudents(data.data);
      } else if (Array.isArray(data)) {
        setStudents(data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch('http://localhost:3001/api/class', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.data) setClasses(data.data);
    } catch (error) {
      console.error("Failed to fetch classes", error);
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa học sinh này?')) return;
    try {
      const token = localStorage.getItem('accessToken');
      const res = await fetch(`http://localhost:3001/api/student/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Xóa thành công');
        fetchStudents();
      } else {
        alert('Xóa thất bại');
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi khi xóa');
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  }

  const filteredStudents = students.filter(s => {
    const matchName = (s.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) || (s.studentId || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = filterClass === 'all' || s.className === filterClass || (filterClass === 'none' && !s.className);
    return matchName && matchClass;
  }).sort((a, b) => {
    const idA = a.studentId || '';
    const idB = b.studentId || '';
    return sortOrder === 'asc'
      ? idA.localeCompare(idB)
      : idB.localeCompare(idA);
  });

  return (
    <Layout breadcrumbs={['Trang chủ', 'Học sinh', 'Danh sách']}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-[28px] font-bold text-text-main tracking-tight mb-1">Danh sách học sinh</h2>
            <p className="text-text-secondary text-base">Quản lý thông tin hồ sơ và dữ liệu học tập của học sinh toàn trường.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchStudents}
              className="flex items-center gap-2 bg-white border border-surface-dim hover:bg-surface-dim text-text-secondary px-3 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all"
              title="Tải lại danh sách"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => navigate('/students/transfer')}
              className="flex items-center gap-2 bg-white border border-surface-dim hover:bg-surface-dim text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all"
            >
              Chuyển lớp
            </button>
            <button
              onClick={() => navigate('/students/add')}
              className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              <Plus size={20} />
              Thêm học sinh mới
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
            <input
              className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
              placeholder="Tìm kiếm tên hoặc mã HS..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Lớp</span>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option value="all">Tất cả</option>
                <option value="none">Chưa xếp lớp</option>
                {classes.map(c => (
                  <option key={c._id} value={c.className}>{c.className}</option>
                ))}
              </select>
            </div>
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Sắp xếp Mã HS</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option value="asc">Tăng dần (A-Z)</option>
                <option value="desc">Giảm dần (Z-A)</option>
              </select>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-text-main font-medium transition-colors lg:w-auto w-full">
              <Filter size={20} />
              <span className="text-sm">Bộ lọc khác</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                  <th className="py-4 px-6 w-12 text-center"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Mã HS</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Họ và tên</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Ngày sinh</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Gioi tính</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Lớp</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Địa chỉ</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {loading ? (
                  <tr><td colSpan={8} className="p-8 text-center text-text-secondary">Đang tải dữ liệu...</td></tr>
                ) : filteredStudents.length === 0 ? (
                  <tr><td colSpan={8} className="p-8 text-center text-text-secondary">Không tìm thấy học sinh nào.</td></tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student._id || student.studentId} className="hover:bg-surface-dim/30 transition-colors group">
                      <td className="py-4 px-6 text-center"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></td>
                      <td className="py-4 px-6 text-sm font-medium text-text-main">{student.studentId}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-gray-100 bg-cover flex items-center justify-center overflow-hidden">
                            {student.avatar ? (
                              <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <UserCircle className="text-text-secondary" size={32} />
                            )}
                          </div>
                          <span className="text-sm font-semibold text-text-main">{student.fullname}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-text-main">{formatDate(student.dob)}</td>
                      <td className="py-4 px-6 text-sm text-text-main">{student.sex}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.className
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                          }`}>
                          {student.className || 'Chưa xếp lớp'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-text-secondary truncate max-w-[200px]">{student.address}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => alert('Chức năng sửa đang được phát triển')}
                            className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors">
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(student._id)}
                            className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
            <span className="text-sm text-text-secondary">Hiển thị <span className="font-bold text-text-main">{filteredStudents.length}</span> học sinh</span>
            <div className="flex items-center gap-2">
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main text-sm font-bold shadow-sm">1</button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentList;