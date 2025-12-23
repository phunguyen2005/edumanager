import React from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Filter, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();

  const students = [
    { id: 'HS2023001', name: 'Nguyễn Văn An', dob: '12/05/2007', class: '10A1', address: '123 Đường Láng, Đống Đa, Hà Nội', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl5uW_Cqh7u8mDvRgPV5Ys4QWol2yfdY07Ssg71lQ0lRNze4sUETukoQ-QzLRCG2fWS9b1vuHJpEw56-puxI8dd15OA_UnzAJ6YCw68zfnjQlG7VcNQnijm8zYeihZe_0kUX_kqbvhKYQUnaoqifI4XTO9ymywcMjbUuVjxzI4qVYchI9kSjRRnoF1v2wQRhjJSAsmq8-8Cy6zcHIIyU7Qn8oRf_QCE-JyZv6Oa997LIOOksQTGd6izPOFgDWqv_PpyBBSF5N4CTs' },
    { id: 'HS2023002', name: 'Trần Thị Bình', dob: '04/08/2007', class: '10A1', address: '45 Nguyễn Trãi, Thanh Xuân, Hà Nội', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh1u-bvl2BhUpov_BBXH4NstErn9F52118WsJ7Rptu_vrqZ7MbG_mFiyKH_KSMcEdwl1Ww8bkVxZ5_rWYRFZnpscpnyTkfVe_Yhd8lpdGp5sSAlyGSmwpcJ14zwjMY9AfYvLF0KMM5EDC52uGuuw3NzGomplt4ZqNqKMVOM57ySfWOp8Y6lRWKZaqzqSpRgmZFzIuvo0wvk81tg9HZJLXZToGfefv1dcDO1yAT3OuPn1Q67GASZXcAuSBcaLJF9jjzm-lT8GsGmGU' },
    { id: 'HS2023015', name: 'Lê Văn Cường', dob: '22/11/2006', class: '11B2', address: '88 Cầu Giấy, Cầu Giấy, Hà Nội', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcBnZ0pM2EKuclrF9mg_0QFZXVTjLX15vnmNHB5jsvBrnGo_8SMPF5vkbjvKvsU1JexpODyciKXUuCv03w6N0oDOaK8fwdDYeEmuhcgCXFLjvg2oELc9tdykr1iU2ZuTbngzCBh85X0mm4Z2_RmihNEJqAU8YIuSzJdUkh00hYisIZK7KakqF93eHNvNkCkJwA9pqvthyFI4K3CQnIHEzhcjhGGjal8Coacfz4GRbcZEqdP2WGLB43Kha4X2BK-b0_u6zVEM3FpjA' },
    { id: 'HS2023022', name: 'Phạm Thị Dung', dob: '15/02/2006', class: '11B2', address: 'Khu tập thể Thanh Xuân Bắc', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFnr40A77Gup57_ZgpTXGyYByxPwUDdzcEKadp2-Xmvz-6B8_R_d16wg1qZh84FbusRAbxlGjHxyTWrJetokYoEvTLmqGYb4vc83CDWiCWbmcELSdqnOJIojgGRjt1a190spT2K-WrV51Fs3IQxfpmh10GI2aHeTT5OENKPZgHNdr-XX95aT58AeRpwzLtHblxAVNjkK2c2xfvGs3SN9bEo1DaoPrXFXvKYYailk-p272YGbXT3m_xPK82jbK8qnNSviV9cBGEta4' },
    { id: 'HS2023045', name: 'Hoàng Văn Em', dob: '30/09/2007', class: '10A2', address: 'Ngõ 102 Trường Chinh, Hà Nội', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqcIBt1S_f0uPce4ZsG8p0SbTMRnxt18xFlW57uXIAAUKd7Vkq5PPg4xEa_sXx7T8N6DiZR259MCJMgn7WqsUzrlJn-0tJWiP998yImvEXJ6fbYc09dSq5uVR4IogrcZY4h59HANP8_jnNa6cI9--Xe3CNzDxlS0HqfPpreeHi1CgOgzfPmU7oBfYymzfVlcBqeVMLkM_OUXOAMc9fyY3woNkiwrrtNnAZM-woNt3pyohWYm5nWWbbsp6SPSmJajkik520J1OHt7g' },
  ];

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
            />
          </div>
          <div className="flex flex-wrap gap-3">
             <div className="relative min-w-[160px] flex-1 lg:flex-none">
                <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">Lớp</span>
                <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                    <option>Tất cả</option>
                    <option>10A1</option>
                    <option>10A2</option>
                </select>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-dim hover:bg-[#e8e8d8] rounded-xl text-text-main font-medium transition-colors lg:w-auto w-full">
              <Filter size={20} />
              <span className="text-sm">Bộ lọc khác</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                  <th className="py-4 px-6 w-12 text-center"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Mã HS</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Họ và tên</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Ngày sinh</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Lớp</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Địa chỉ</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-surface-dim/30 transition-colors group">
                    <td className="py-4 px-6 text-center"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></td>
                    <td className="py-4 px-6 text-sm font-medium text-text-main">{student.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-gray-100 bg-cover" style={{backgroundImage: `url("${student.avatar}")`}}></div>
                        <span className="text-sm font-semibold text-text-main">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-text-main">{student.dob}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${student.class.startsWith('10') ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        {student.class}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-text-secondary truncate max-w-[200px]">{student.address}</td>
                    <td className="py-4 px-6 text-right">
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
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
            <span className="text-sm text-text-secondary">Hiển thị <span className="font-bold text-text-main">1-5</span> trên <span className="font-bold text-text-main">124</span> học sinh</span>
            <div className="flex items-center gap-2">
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary disabled:opacity-50">
                <ChevronLeft size={18} />
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main text-sm font-bold shadow-sm">1</button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">2</button>
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">3</button>
              <span className="text-text-secondary text-sm px-1">...</span>
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