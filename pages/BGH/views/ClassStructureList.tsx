import React from 'react';
import { ViewState } from '../../../types';

interface Props {
    onChangeView: (view: ViewState) => void;
}

const ClassStructureList: React.FC<Props> = ({ onChangeView }) => {
  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
            Quản lý cấu trúc lớp học
          </h2>
          <p className="text-text-secondary text-base">
            Quy hoạch danh sách lớp, chuyển lớp và phân công phòng học cho niên khóa mới.
          </p>
        </div>
        <div className="flex items-center gap-3">
             <button onClick={() => onChangeView(ViewState.CLASS_STRUCTURE_MOVE)} className="flex items-center gap-2 bg-white text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm border border-surface-dim hover:bg-surface-dim transition-all active:scale-95">
                <span className="material-symbols-outlined !text-[20px]">move_up</span>
                Chuyển lớp
            </button>
            <button onClick={() => onChangeView(ViewState.ADD_CLASS)} className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit">
                <span className="material-symbols-outlined !text-[20px]">add</span>
                Tạo lớp khối 10 mới
            </button>
        </div>
      </div>

      <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
            search
          </span>
          <input
            className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
            placeholder="Tìm kiếm lớp học theo tên hoặc mã..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[160px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Khối lớp
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>Tất cả</option>
              <option>Khối 10</option>
              <option>Khối 11</option>
              <option>Khối 12</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-dim bg-[#fafaf5]">
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-12 text-center">
                  <input className="rounded border-gray-300 text-primary focus:ring-primary size-4" type="checkbox" />
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Mã lớp</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Tên lớp</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Khối</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Sĩ số</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Giáo viên chủ nhiệm
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Phân công phòng học
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-dim">
              {[
                  { code: 'C1001', name: '10A1', grade: 10, count: 45, teacher: 'Nguyễn Văn An', room: 'A101' },
                  { code: 'C1002', name: '10A2', grade: 10, count: 44, teacher: 'Trần Thị Bích', room: 'A102' },
                  { code: 'C1105', name: '11B1', grade: 11, count: 40, teacher: 'Lê Văn Cường', room: 'B201' },
                  { code: 'C1106', name: '11B2', grade: 11, count: 38, teacher: 'Phạm Thị Dung', room: 'B202' },
                  { code: 'C1201', name: '12C1', grade: 12, count: 42, teacher: 'Hoàng Văn Em', room: 'C301' },
              ].map((cls, idx) => (
                <tr key={idx} className="hover:bg-surface-dim/30 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    <input className="rounded border-gray-300 text-primary focus:ring-primary size-4" type="checkbox" />
                  </td>
                  <td className="py-4 px-6 text-[14px] font-medium text-text-main">{cls.code}</td>
                  <td className="py-4 px-6 text-[14px] font-semibold text-text-main">{cls.name}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{cls.grade}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{cls.count}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{cls.teacher}</td>
                  <td className="py-4 px-6">
                    <div className="relative w-full max-w-[140px]">
                      <select defaultValue={cls.room} className="w-full py-1.5 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer">
                        <option value="">Chưa chọn</option>
                        <option value="A101">P. A101</option>
                        <option value="A102">P. A102</option>
                        <option value="A103">P. A103</option>
                        <option value="B201">P. B201</option>
                        <option value="B202">P. B202</option>
                        <option value="C301">P. C301</option>
                        <option value="C302">P. C302</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">
                        arrow_drop_down
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-text-secondary hover:text-text-main hover:bg-surface-dim rounded-full transition-colors" title="Sửa thông tin">
                        <span className="material-symbols-outlined !text-[20px]">edit</span>
                      </button>
                      <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Xóa lớp">
                        <span className="material-symbols-outlined !text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
          <span className="text-sm text-text-secondary">
            Hiển thị <span className="font-bold text-text-main">1-5</span> trên{' '}
            <span className="font-bold text-text-main">36</span> lớp học
          </span>
          <div className="flex items-center gap-2">
            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary disabled:opacity-50">
              <span className="material-symbols-outlined !text-[18px]">chevron_left</span>
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg bg-primary text-text-main text-sm font-bold shadow-sm">
              1
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">
              2
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-main text-sm">
              3
            </button>
            <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
              <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassStructureList;