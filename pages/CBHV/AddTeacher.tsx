import React from 'react';
import { Layout } from '../../components/Layout';
import { Save, Calendar, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
  const navigate = useNavigate();

  return (
    <Layout breadcrumbs={['Quản lý giáo viên', 'Thêm mới giáo viên']}>
       <div className="max-w-[1000px] mx-auto flex flex-col gap-8 p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-text-main text-3xl font-black leading-tight tracking-tight">Thêm mới giáo viên</h1>
                <p className="text-text-secondary text-base">Tạo hoặc cập nhật hồ sơ giáo viên vào hệ thống quản lý.</p>
            </div>

            {/* Form Card */}
            <div className="bg-surface-light border border-surface-dim rounded-2xl p-6 md:p-10 shadow-sm">
                <form className="flex flex-col gap-8">
                    {/* Grid Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                         {/* Row 1 */}
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Mã GV <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="VD: GV202401" 
                                className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                            />
                         </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Họ tên <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                placeholder="Nhập họ và tên đầy đủ" 
                                className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                            />
                         </div>

                         {/* Row 2 */}
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Ngày sinh <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="mm/dd/yyyy" 
                                    onFocus={(e) => e.target.type = 'date'}
                                    onBlur={(e) => e.target.type = 'text'}
                                    className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                                />
                                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                            </div>
                         </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Giới tính <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main appearance-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium cursor-pointer">
                                    <option value="" disabled selected>Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                            </div>
                         </div>
                         
                         {/* Row 3 - Full width phone? No, split */}
                         <div className="flex flex-col gap-2 md:col-span-2">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-main">Số điện thoại <span className="text-red-500">*</span></label>
                                    <input 
                                        type="tel" 
                                        placeholder="Nhập số điện thoại" 
                                        className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                                    />
                                </div>
                             </div>
                         </div>

                         {/* Row 4 */}
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Email <span className="text-red-500">*</span></label>
                            <input 
                                type="email" 
                                placeholder="Nhập địa chỉ email" 
                                className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main placeholder:text-text-secondary/70 focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium"
                            />
                         </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-text-main">Chuyên môn <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main appearance-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium cursor-pointer">
                                    <option value="" disabled selected>Chọn chuyên môn</option>
                                    <option value="Toán">Toán học</option>
                                    <option value="Lý">Vật lý</option>
                                    <option value="Hóa">Hóa học</option>
                                    <option value="Văn">Ngữ văn</option>
                                    <option value="Anh">Tiếng Anh</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                            </div>
                         </div>

                         {/* Row 5 */}
                         <div className="flex flex-col gap-2 md:col-span-2">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                 <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-text-main">Bằng cấp</label>
                                    <div className="relative">
                                        <select className="w-full h-12 px-4 rounded-xl bg-surface-dim border-none text-text-main appearance-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-medium cursor-pointer">
                                            <option value="" disabled selected>Chọn bằng cấp cao nhất</option>
                                            <option value="Cử nhân">Cử nhân</option>
                                            <option value="Thạc sĩ">Thạc sĩ</option>
                                            <option value="Tiến sĩ">Tiến sĩ</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={18} />
                                    </div>
                                </div>
                             </div>
                         </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-surface-dim">
                        <button 
                            type="button" 
                            onClick={() => navigate('/teachers')}
                            className="px-8 h-11 rounded-full border border-surface-dim bg-white text-text-main font-bold hover:bg-surface-dim transition-colors text-sm"
                        >
                            Hủy
                        </button>
                        <button 
                            type="button" 
                            className="px-8 h-11 rounded-full bg-primary text-text-main font-bold hover:bg-primary-hover shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                        >
                            <Save size={18} />
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
       </div>
    </Layout>
  )
}

export default AddTeacher;