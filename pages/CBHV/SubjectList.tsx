import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Plus, Search, Edit, Ban, X, Clock, Calculator, Book } from 'lucide-react';

const SubjectList = () => {
  const [showModal, setShowModal] = useState(false);
  
  const subjects = [
    { id: 'MH001', name: 'Toán học', sessions: 105, coeff: 2.0, status: 'active' },
    { id: 'MH002', name: 'Ngữ văn', sessions: 105, coeff: 2.0, status: 'active' },
    { id: 'MH003', name: 'Tiếng Anh', sessions: 105, coeff: 1.0, status: 'active' },
    { id: 'MH005', name: 'Hóa học', sessions: 70, coeff: 1.0, status: 'inactive' },
  ];

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

        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
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
                        {subjects.map(subject => (
                            <tr key={subject.id} className="hover:bg-surface-dim/30 group">
                                <td className="py-4 px-6 text-sm font-medium">{subject.id}</td>
                                <td className="py-4 px-6 text-sm font-semibold">{subject.name}</td>
                                <td className="py-4 px-6 text-sm">{subject.sessions}</td>
                                <td className="py-4 px-6 text-sm">{subject.coeff.toFixed(1)}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${subject.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {subject.status === 'active' ? 'Đang áp dụng' : 'Ngừng áp dụng'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors" onClick={() => setShowModal(true)}>
                                            <Edit size={18} />
                                        </button>
                                         <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
                                            <Ban size={18} />
                                        </button>
                                     </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]">
            <div className="bg-surface-light w-full max-w-lg rounded-2xl shadow-xl border border-surface-dim flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-5 border-b border-surface-dim">
                    <h3 className="text-xl font-semibold text-text-main leading-tight">Cấu hình môn học</h3>
                    <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full p-2 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form className="flex flex-col gap-5">
                         <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-main">Tên môn học <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" placeholder="Ví dụ: Toán học" defaultValue="Toán học" />
                                <Book className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main">Mã môn</label>
                                <input className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-gray-500 text-sm cursor-not-allowed" disabled defaultValue="MH001" />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main">Loại môn</label>
                                <select className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm appearance-none focus:ring-2 focus:ring-primary focus:bg-white cursor-pointer">
                                    <option>Cơ bản</option>
                                    <option>Nâng cao</option>
                                </select>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-5">
                             <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main">Số tiết / Năm <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="number" className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" defaultValue={105} />
                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                                </div>
                             </div>
                             <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-text-main">Hệ số điểm <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="number" step="0.5" className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" defaultValue={2} />
                                    <Calculator className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={20} />
                                </div>
                             </div>
                         </div>
                    </form>
                </div>
                <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-surface-dim bg-background-light/50">
                    <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-surface-dim text-text-main font-medium text-sm hover:bg-surface-dim transition-colors">Hủy bỏ</button>
                    <button className="px-6 py-2.5 rounded-xl bg-primary text-text-main font-bold text-sm shadow-sm hover:bg-[#eae605] active:scale-95 transition-all">Lưu thay đổi</button>
                </div>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default SubjectList;