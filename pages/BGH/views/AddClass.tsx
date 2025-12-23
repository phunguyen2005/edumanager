import React from 'react';
import { ViewState } from '../../../types';

interface Props {
  onChangeView: (view: ViewState) => void;
}

const AddClass: React.FC<Props> = ({ onChangeView }) => {
  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-2">
          Thêm lớp học
        </h2>
        <p className="text-text-secondary text-base">
          Nhập thông tin chi tiết để tạo lớp học mới trong hệ thống.
        </p>
      </div>
      <div className="bg-surface-light rounded-2xl p-6 lg:p-8 shadow-sm border border-surface-dim max-w-4xl">
        <form className="grid grid-cols-12 gap-x-6 gap-y-6">
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-normal text-text-main mb-2" htmlFor="class-code">
              Mã lớp <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-normal"
              id="class-code"
              placeholder="Ví dụ: 10A1"
              required
              type="text"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-normal text-text-main mb-2" htmlFor="class-name">
              Tên lớp <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-normal"
              id="class-name"
              placeholder="Ví dụ: Lớp 10A1 - K56"
              required
              type="text"
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-normal text-text-main mb-2" htmlFor="grade-level">
              Khối <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-normal cursor-pointer"
                id="grade-level"
                defaultValue=""
              >
                <option disabled value="">
                  Chọn khối học
                </option>
                <option value="10">Khối 10</option>
                <option value="11">Khối 11</option>
                <option value="12">Khối 12</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[20px]">
                expand_more
              </span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-normal text-text-main mb-2" htmlFor="student-count">
              Sĩ số
            </label>
            <div className="relative">
              <input
                className="w-full pl-4 pr-12 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-normal"
                id="student-count"
                placeholder="0"
                type="number"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary pointer-events-none">
                Học sinh
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <label className="block text-sm font-normal text-text-main mb-2" htmlFor="homeroom-teacher">
              Giáo viên chủ nhiệm
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
                search
              </span>
              <select
                className="w-full pl-11 pr-10 py-3 bg-surface-dim border-none rounded-xl text-text-main focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm font-normal cursor-pointer"
                id="homeroom-teacher"
                defaultValue=""
              >
                <option disabled value="">
                  Tìm kiếm và chọn giáo viên...
                </option>
                <option value="GV001">Nguyễn Văn Hùng (Toán học)</option>
                <option value="GV002">Trần Thị Bình (Ngữ văn)</option>
                <option value="GV003">Lê Văn Đức (Vật lý)</option>
                <option value="GV004">Phạm Thị Mai (Tiếng Anh)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[20px]">
                expand_more
              </span>
            </div>
          </div>
          <div className="col-span-12 flex items-center justify-end gap-4 mt-4 pt-6 border-t border-surface-dim">
            <button
              onClick={() => onChangeView(ViewState.CLASS_STRUCTURE_LIST)}
              className="px-6 py-2.5 rounded-full border border-surface-dim hover:bg-surface-dim text-text-main text-sm font-medium transition-colors"
              type="button"
            >
              Hủy
            </button>
            <button
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-[#eae605] text-text-main text-sm font-bold shadow-sm transition-all active:scale-95"
              type="submit"
              onClick={(e) => {
                  e.preventDefault();
                  onChangeView(ViewState.CLASS_STRUCTURE_LIST);
              }}
            >
              Lưu lớp học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClass;