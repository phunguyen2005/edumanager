import React from 'react';
import { Layout } from '../../components/Layout';
import { Save, User } from 'lucide-react';

const AddStudent = () => {
  return (
    <Layout breadcrumbs={['Quản lý học sinh', 'Thêm/Cập nhật HS']}>
      <div className="max-w-[1000px] mx-auto flex flex-col gap-8 p-4 lg:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-tight">Thêm/Cập nhật HS</h1>
          <p className="text-text-secondary text-base md:text-lg">Nhập thông tin hồ sơ học sinh mới vào hệ thống quản lý.</p>
        </div>
        
        <form className="bg-surface-light border border-surface-dim rounded-[2rem] p-6 md:p-10 shadow-sm">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 border-b border-surface-dim pb-2 mb-2">
              <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                <User size={24} className="text-text-secondary" />
                Thông tin cá nhân
              </h3>
            </div>
            
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="student-id">Mã HS <span className="text-red-500">*</span></label>
              <input id="student-id" type="text" placeholder="Nhập mã HS (VD: HS2024001)" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm" />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="full-name">Họ tên <span className="text-red-500">*</span></label>
              <input id="full-name" type="text" placeholder="Nhập họ và tên đầy đủ" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm" />
            </div>

            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="dob">Ngày sinh <span className="text-red-500">*</span></label>
              <input id="dob" type="date" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm" />
            </div>

             <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="gender">Giới tính <span className="text-red-500">*</span></label>
              <select id="gender" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm appearance-none cursor-pointer">
                  <option value="" disabled selected>Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
              </select>
            </div>
            
             <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="class">Lớp <span className="text-red-500">*</span></label>
              <select id="class" className="w-full h-14 bg-white rounded-xl border border-surface-dim px-4 text-base text-text-main focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm appearance-none cursor-pointer">
                  <option value="" disabled selected>Chọn lớp</option>
                  <option value="10A1">10A1</option>
                  <option value="11B1">11B1</option>
              </select>
            </div>

            <div className="col-span-12 flex flex-col gap-2">
              <label className="text-text-main text-sm font-normal" htmlFor="address">Địa chỉ liên hệ</label>
              <textarea id="address" rows={3} placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..." className="w-full bg-white rounded-xl border border-surface-dim px-4 py-3 text-base text-text-main placeholder:text-text-secondary/70 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all shadow-sm resize-none"></textarea>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-4 mt-10 pt-6 border-t border-surface-dim">
             <button type="button" className="w-full md:w-auto px-8 h-12 rounded-full border border-text-main/10 text-text-main font-semibold bg-white hover:bg-surface-dim transition-colors">
                Hủy
            </button>
            <button type="submit" className="w-full md:w-auto px-8 h-12 rounded-full bg-primary text-text-main font-bold hover:bg-[#eae605] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                <Save size={20} />
                Lưu
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddStudent;