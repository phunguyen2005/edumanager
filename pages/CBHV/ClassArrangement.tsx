import React from 'react';
import { Layout } from '../../components/Layout';
import { Save, Plus, Grid, List, Lock, Search } from 'lucide-react';

const ClassArrangement = () => {
  return (
    <Layout breadcrumbs={['Trang chủ', 'Xếp lớp', 'Khối 10']}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-6 flex flex-col gap-6 h-full">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
            <div>
                <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Xếp lớp khối 10</h2>
                <p className="text-text-secondary text-base">Phân bổ học sinh vào các lớp đảm bảo sĩ số tối đa 45 học sinh.</p>
            </div>
            <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 rounded-full border border-surface-dim text-text-main font-medium text-sm hover:bg-surface-dim transition-colors">
                    Hủy bỏ
                </button>
                <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-6 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
                    <Save size={20} />
                    Lưu thay đổi
                </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
            {/* Left Panel: Waiting List */}
            <div className="lg:col-span-5 flex flex-col h-full bg-surface-light border border-surface-dim rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-surface-dim bg-surface-dim/20 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[18px] font-semibold text-text-main">Chờ xếp lớp <span className="text-text-secondary text-sm font-normal ml-1">(12)</span></h3>
                        <button className="text-xs font-medium text-primary-hover hover:underline bg-text-main text-white px-2 py-1 rounded">Thêm vào lớp</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <select className="w-full text-xs font-medium border-none rounded-lg bg-white shadow-sm py-2 pl-3 pr-8 ring-1 ring-surface-dim focus:ring-primary"><option>2024 - 2025</option></select>
                        <select className="w-full text-xs font-medium border-none rounded-lg bg-white shadow-sm py-2 pl-3 pr-8 ring-1 ring-surface-dim focus:ring-primary"><option>Khối 10</option></select>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                        <input className="w-full pl-9 pr-4 py-2 bg-white border border-surface-dim rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm" placeholder="Tìm tên hoặc mã học sinh..." />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto bg-white">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-dim/30 sticky top-0 z-10 backdrop-blur-sm text-xs font-semibold text-text-secondary uppercase tracking-wider">
                            <tr>
                                <th className="p-3 w-10 text-center border-b border-surface-dim"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></th>
                                <th className="p-3 border-b border-surface-dim">Mã HS</th>
                                <th className="p-3 border-b border-surface-dim">Họ tên</th>
                                <th className="p-3 border-b border-surface-dim">Giới tính</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim text-sm text-text-main">
                             <tr className="hover:bg-primary/5 group cursor-pointer transition-colors">
                                <td className="p-3 text-center"><input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></td>
                                <td className="p-3 font-mono text-xs text-text-secondary">2024001</td>
                                <td className="p-3 font-medium">Lê Thị Vân Anh</td>
                                <td className="p-3">Nữ</td>
                            </tr>
                             <tr className="hover:bg-primary/5 group cursor-pointer transition-colors bg-surface-dim/10">
                                <td className="p-3 text-center"><input type="checkbox" checked className="rounded border-gray-300 text-primary focus:ring-primary size-4" /></td>
                                <td className="p-3 font-mono text-xs text-text-secondary">2024112</td>
                                <td className="p-3 font-medium">Nguyễn Tiến Dũng</td>
                                <td className="p-3">Nam</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Right Panel: Class Grid */}
            <div className="lg:col-span-7 flex flex-col h-full bg-surface-light border border-surface-dim rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-surface-dim flex items-center justify-between">
                    <h3 className="text-[18px] font-semibold text-text-main">Danh sách lớp học hiện có</h3>
                    <div className="flex gap-2">
                        <button className="size-8 flex items-center justify-center rounded-lg bg-surface-dim text-text-main"><Grid size={20} /></button>
                        <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary transition-colors"><List size={20} /></button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf5]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {/* Class Card 1 */}
                        <div className="flex flex-col bg-white border border-surface-dim rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary transition-all group">
                            <div className="flex justify-between items-start mb-2"><h4 className="text-[18px] font-bold text-text-main">10A1</h4></div>
                            <div className="mt-1">
                                <div className="flex justify-between items-center text-xs font-semibold mb-1"><span className="text-text-secondary">Sĩ số</span><span className="text-status-green">30/45</span></div>
                                <p className="text-[11px] text-status-green font-medium">Còn trống 15 chỗ</p>
                            </div>
                             <div className="mt-4 pt-4 border-t border-surface-dim border-dashed">
                                <button className="w-full py-2 rounded-lg border-2 border-dashed border-surface-dim bg-surface-dim/30 flex items-center justify-center text-text-secondary text-xs font-semibold group-hover:border-primary group-hover:bg-primary/10 group-hover:text-text-main transition-colors">
                                    <Plus size={16} className="mr-1" /> Thêm học sinh
                                </button>
                            </div>
                        </div>

                         {/* Class Card Full */}
                        <div className="flex flex-col bg-gray-50 border border-gray-200 rounded-xl p-5 opacity-70 cursor-not-allowed">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[18px] font-bold text-gray-500">10A3</h4>
                                <Lock size={18} className="text-gray-400" />
                            </div>
                            <div className="mt-1">
                                <div className="flex justify-between items-center text-xs font-semibold mb-1"><span className="text-gray-500">Sĩ số</span><span className="text-status-red">45/45</span></div>
                                <p className="text-[11px] text-status-red font-medium">Lớp đã đủ sĩ số</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </Layout>
  );
};

export default ClassArrangement;