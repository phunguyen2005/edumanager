import React from 'react';
import { Layout } from '../../components/Layout';
import { Search, X, MoveRight, Info, Check, LogOut } from 'lucide-react';

const TransferClass = () => {
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
            <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim">
              <h3 className="text-base font-bold text-text-main mb-4 uppercase tracking-wide">Tìm kiếm học sinh</h3>
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={20} />
                <input 
                  className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm" 
                  placeholder="Nhập tên học sinh hoặc mã số học sinh (VD: HS0192)..." 
                  type="text" 
                  defaultValue="HS0192"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-black/5 rounded-full text-text-secondary transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Student Info Card */}
            <div className="bg-surface-light rounded-2xl p-6 shadow-sm border border-surface-dim">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="size-24 sm:size-32 rounded-2xl bg-gray-200 bg-cover bg-center flex-shrink-0 shadow-inner" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCHx0nI-7id6oVyRENmKEcDyLYz-lNceLBxjZ2abo6S6bjiBAhz1SkBa2vm3P7AVQU9GSkLaFv8VpBpFF2a8KqgqkNsS8UsIIO6PpJTP_-rTHBLPXCglbeb1oM5S1qTvm0fNL0Nc4r41_xPppJy1xhDaczxTeZfLgybDhOgCvopuAW_Tdry41eOrk6mtHJCebh9d3ypnqhxYJW5nuUy1UzqC3vrof3WdktZD5Pdl3fSrCXe1vgS7S_h5PCbVu71v13szvm0SovZUFI")'}}></div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-text-main">Trần Văn Tú</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded bg-surface-dim text-xs font-mono font-medium text-text-secondary">HS0192</span>
                        <span className="w-1 h-1 rounded-full bg-text-secondary"></span>
                        <span className="text-sm text-text-secondary">Niên khóa 2023-2026</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200 whitespace-nowrap">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2"></span>
                      Đang theo học
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-6 pt-6 border-t border-surface-dim">
                    <div>
                      <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Ngày sinh</p>
                      <p className="text-sm font-medium text-text-main">12/05/2007</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Giới tính</p>
                      <p className="text-sm font-medium text-text-main">Nam</p>
                    </div>
                     <div>
                      <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Hạnh kiểm</p>
                      <p className="text-sm font-medium text-text-main">Tốt</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Lớp hiện tại</p>
                      <div className="flex items-center gap-1.5">
                        <LogOut size={16} className="text-text-secondary" />
                        <p className="text-base font-bold text-text-main">10A1</p>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[11px] text-text-secondary uppercase tracking-wider font-bold mb-1">Giáo viên chủ nhiệm</p>
                      <p className="text-sm font-medium text-text-main">Phạm Thị Hương</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <option>Học kỳ 2 - 2023/2024</option>
                    <option>Học kỳ 1 - 2024/2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Chọn lớp đích <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                      <option disabled selected value="">Vui lòng chọn lớp</option>
                      <option value="10A2">10A2 (Sĩ số: 38/40)</option>
                      <option value="10A3">10A3 (Sĩ số: 35/40)</option>
                    </select>
                  </div>
                  <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
                    <Info size={14} />
                    Lớp 10A2 còn 2 chỗ trống.
                  </p>
                </div>
                <div>
                   <label className="block text-sm font-medium text-text-main mb-2">Lý do chuyển lớp</label>
                   <textarea rows={4} className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main text-sm placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white resize-none" placeholder="Nhập lý do chi tiết..."></textarea>
                </div>
                
                <div className="pt-4 mt-2 border-t border-surface-dim flex flex-col gap-3">
                    <button type="button" className="flex items-center justify-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-4 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 w-full">
                        <Check size={20} />
                        Xác nhận chuyển lớp
                    </button>
                    <button type="button" className="flex items-center justify-center gap-2 bg-transparent hover:bg-surface-dim text-text-secondary hover:text-text-main px-4 py-3 rounded-xl font-medium text-sm transition-colors w-full">
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

export default TransferClass;