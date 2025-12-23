import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { History, Search, Download, ZoomIn, ZoomOut, CheckCircle, XCircle, Eye } from 'lucide-react';

const RecordDashboard = () => {
  const [view, setView] = useState<'preview' | 'list'>('preview');

  return (
    <Layout breadcrumbs={['Trang chủ', 'Quản lý điểm', 'Lập Học bạ']}>
      <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">Lập Học bạ</h2>
                <p className="text-text-secondary text-base">Tính toán, xem trước và xuất học bạ cho học sinh theo kỳ và năm học.</p>
            </div>
            <div className="flex gap-2">
                 <button onClick={() => setView(view === 'list' ? 'preview' : 'list')} className="bg-surface-light border border-surface-dim hover:bg-surface-dim text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all">
                    {view === 'list' ? 'Xem trước bản in' : 'Danh sách tình trạng'}
                </button>
            </div>
         </div>

         {/* Filter Bar */}
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
                    <select className="w-full py-3 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm cursor-pointer"><option>10A1</option></select>
                </div>
                <div className="md:col-span-3">
                    <button className="w-full bg-primary hover:bg-[#eae605] text-text-main px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95">
                        Áp dụng
                    </button>
                </div>
            </div>
         </div>

         {/* Content Area */}
         {view === 'preview' ? (
             <div className="flex flex-col lg:flex-row gap-6">
                {/* List Sidebar */}
                <div className="w-full lg:w-1/4 flex flex-col gap-4">
                    <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm flex flex-col h-[600px] overflow-hidden">
                        <div className="p-4 border-b border-surface-dim bg-surface-light sticky top-0 z-10">
                            <h3 className="font-semibold text-text-main mb-2">Danh sách học sinh</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                                <input className="w-full pl-9 pr-3 py-2 bg-surface-dim border-none rounded-lg text-text-main placeholder-text-secondary text-sm" placeholder="Tìm tên..." />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2 space-y-1">
                             {['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường'].map((name, i) => (
                                <button key={i} className={`w-full text-left p-3 rounded-xl flex items-center justify-between group transition-colors ${i===0 ? 'bg-surface-dim border-l-4 border-primary' : 'hover:bg-surface-dim'}`}>
                                    <div>
                                        <p className="text-sm font-bold text-text-main">{name}</p>
                                        <p className="text-xs text-text-secondary">MS: HS0012{i+3}</p>
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
                                    <Download size={18} /> Xuất Học bạ
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
                                    <p className="mb-1"><span className="font-semibold">Họ và tên:</span> NGUYỄN VĂN AN</p>
                                    <p className="mb-1"><span className="font-semibold">Ngày sinh:</span> 12/05/2007</p>
                                </div>
                                <div className="text-right">
                                    <p className="mb-1"><span className="font-semibold">Lớp:</span> 10A1</p>
                                    <p className="mb-1"><span className="font-semibold">Năm học:</span> 2023 - 2024</p>
                                </div>
                            </div>
                            <div className="border border-black mb-6">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-black"><th className="border-r border-black p-2 text-left">Môn học</th><th className="p-2 w-16 text-center">Cả năm</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-black"><td className="border-r border-black p-2 font-semibold">Toán học</td><td className="p-2 text-center font-bold">8.7</td></tr>
                                        <tr className="border-b border-black"><td className="border-r border-black p-2 font-semibold">Ngữ văn</td><td className="p-2 text-center font-bold">7.7</td></tr>
                                    </tbody>
                                </table>
                            </div>
                         </div>
                    </div>
                </div>
             </div>
         ) : (
             <div className="bg-surface-light rounded-2xl border border-surface-dim shadow-sm overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-surface-dim/50 border-b border-surface-dim">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Mã HS</th>
                                <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase">Họ và tên</th>
                                <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase text-center">Trạng thái</th>
                                <th className="px-6 py-4 font-semibold text-sm text-text-secondary uppercase text-right">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-dim">
                            <tr className="hover:bg-surface-dim/30">
                                <td className="px-6 py-4 font-medium">HS00123</td>
                                <td className="px-6 py-4 font-semibold">Nguyễn Văn An</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle size={14} /> Đủ điều kiện
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-text-secondary hover:text-primary"><Eye size={18} /></button>
                                </td>
                            </tr>
                             <tr className="hover:bg-surface-dim/30">
                                <td className="px-6 py-4 font-medium">HS00124</td>
                                <td className="px-6 py-4 font-semibold">Trần Thị Bình</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <XCircle size={14} /> Thiếu điểm
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-text-secondary hover:text-primary"><Eye size={18} /></button>
                                </td>
                            </tr>
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