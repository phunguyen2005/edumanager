import React from 'react';
import { ViewState } from '../../../types';

interface Props {
  onChangeView: (view: ViewState) => void;
}

const ClassStructureMove: React.FC<Props> = ({ onChangeView }) => {
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
          <button onClick={() => onChangeView(ViewState.CLASS_STRUCTURE_LIST)} className="flex items-center gap-2 bg-white text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm border border-surface-dim hover:bg-surface-dim transition-all active:scale-95">
            <span className="material-symbols-outlined !text-[20px]">list</span>
            Danh sách lớp
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95">
            <span className="material-symbols-outlined !text-[20px]">move_up</span>
            Chuyển lớp
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Control Bar */}
        <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Năm học mới
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option>2024-2025</option>
                <option>2025-2026</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
            <div className="relative min-w-[160px] flex-1 lg:flex-none">
              <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
                Khối lớp (Hiện tại)
              </span>
              <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
                <option value="11">Khối 11 (Lên 12)</option>
                <option value="10">Khối 10 (Lên 11)</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
                expand_more
              </span>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto justify-end">
            <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95 w-full lg:w-auto justify-center">
              <span className="material-symbols-outlined !text-[20px]">check</span>
              Thực hiện Nâng lớp
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-surface-light rounded-3xl border border-surface-dim shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-dim bg-[#fafaf5]">
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-12 text-center">
                    <input className="rounded border-gray-300 text-primary focus:ring-primary size-4" type="checkbox" />
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Mã lớp cũ</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Tên lớp cũ</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Sĩ số</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Giáo viên CN cũ</th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider w-[300px]">
                    Lớp đích mới (Năm học tiếp theo)
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-dim">
                {[
                  { id: 'C1105', name: '11B1', count: 40, teacher: 'Lê Văn Cường', next: '12B1', status: 'ready' },
                  { id: 'C1106', name: '11B2', count: 38, teacher: 'Phạm Thị Dung', next: '12B2', status: 'ready' },
                  { id: 'C1107', name: '11B3', count: 42, teacher: 'Nguyễn Thu Hà', next: '12B3', status: 'ready' },
                  { id: 'C1108', name: '11B4', count: 39, teacher: 'Trần Minh Tuấn', next: '', status: 'pending' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-dim/30 transition-colors group">
                    <td className="py-4 px-6 text-center">
                      <input className="rounded border-gray-300 text-primary focus:ring-primary size-4" type="checkbox" />
                    </td>
                    <td className="py-4 px-6 text-[14px] font-normal text-text-main">{row.id}</td>
                    <td className="py-4 px-6 text-[14px] font-semibold text-text-main">{row.name}</td>
                    <td className="py-4 px-6 text-[14px] font-normal text-text-main">{row.count}</td>
                    <td className="py-4 px-6 text-[14px] font-normal text-text-main">{row.teacher}</td>
                    <td className="py-4 px-6">
                      <div className="relative w-full">
                        <select
                          defaultValue={row.next}
                          className="w-full py-2 pl-3 pr-8 bg-white border border-surface-dim rounded-lg text-sm text-text-main focus:ring-1 focus:ring-primary focus:border-primary appearance-none cursor-pointer"
                        >
                          <option value="">Chọn lớp đích...</option>
                          <option value="12B1">12B1 (Mới)</option>
                          <option value="12B2">12B2 (Mới)</option>
                          <option value="12B3">12B3 (Mới)</option>
                          <option value="12B4">12B4 (Mới)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary !text-[18px]">
                          arrow_drop_down
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {row.status === 'ready' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Sẵn sàng
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Chưa chọn
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
            <span className="text-sm text-text-secondary">
              Hiển thị <span className="font-bold text-text-main">1-4</span> trên{' '}
              <span className="font-bold text-text-main">12</span> lớp khối 11
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
              <button className="size-8 flex items-center justify-center rounded-lg border border-surface-dim hover:bg-surface-dim text-text-secondary">
                <span className="material-symbols-outlined !text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassStructureMove;