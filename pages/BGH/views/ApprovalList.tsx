import React from 'react';
import { ViewState } from '../../../types';

interface Props {
  onChangeView: (view: ViewState) => void;
}

const ApprovalList: React.FC<Props> = ({ onChangeView }) => {
  return (
    <div className="max-w-[1440px] mx-auto p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-[24px] font-semibold text-text-main tracking-tight mb-1">
            Phê duyệt Bảng điểm và Học bạ
          </h2>
          <p className="text-text-secondary text-base">
            Duyệt, ký tên điện tử và khóa dữ liệu điểm số/học bạ từ Cán bộ học vụ.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-[#eae605] text-text-main px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all active:scale-95 w-fit">
          <span className="material-symbols-outlined !text-[20px]">lock_clock</span>
          Phê duyệt & Khóa dữ liệu năm học
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="bg-[#fcfcea] border border-[#e8e8d0] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="size-10 rounded-full bg-[#f0f0c9] flex items-center justify-center text-text-main flex-shrink-0">
                <span className="material-symbols-outlined fill text-yellow-700">emoji_events</span>
              </div>
              <div>
                <h3 className="font-bold text-text-main">Danh sách khen thưởng (Top 10 khối)</h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  Lập danh sách khen thưởng dựa trên dữ liệu điểm đã duyệt.
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-surface-dim hover:bg-surface-dim text-text-main rounded-xl text-sm font-medium transition-colors whitespace-nowrap">
              Lập & Duyệt danh sách
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface-light rounded-2xl p-4 shadow-sm border border-surface-dim flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
        <div className="relative flex-1 min-w-[200px]">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary !text-[20px]">
            search
          </span>
          <input
            className="w-full pl-11 pr-4 py-3 bg-surface-dim border-none rounded-xl text-text-main placeholder-text-secondary focus:ring-2 focus:ring-primary focus:bg-white transition-all text-sm"
            placeholder="Tìm kiếm theo lớp học..."
            type="text"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[140px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Năm học
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>2023 - 2024</option>
              <option>2022 - 2023</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
              expand_more
            </span>
          </div>
          <div className="relative min-w-[140px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Học kỳ
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>Học kỳ II</option>
              <option>Học kỳ I</option>
              <option>Cả năm</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-main !text-[20px]">
              expand_more
            </span>
          </div>
          <div className="relative min-w-[160px] flex-1 lg:flex-none">
            <span className="text-[10px] font-bold text-text-secondary absolute left-4 top-1.5 uppercase tracking-wider">
              Trạng thái
            </span>
            <select className="w-full pt-5 pb-1.5 px-4 bg-surface-dim border-none rounded-xl text-text-main text-sm font-medium focus:ring-2 focus:ring-primary focus:bg-white appearance-none cursor-pointer">
              <option>Tất cả</option>
              <option>Chờ duyệt</option>
              <option>Đã duyệt</option>
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
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Lớp</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Năm học</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Học kỳ</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Loại hồ sơ
                </th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider">Trạng thái</th>
                <th className="py-4 px-6 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-dim">
              {[
                { class: '12A1', year: '2023 - 2024', sem: 'Học kỳ II', type: 'Bảng điểm tổng hợp', status: 'pending' },
                { class: '12A2', year: '2023 - 2024', sem: 'Học kỳ II', type: 'Học bạ điện tử', status: 'pending' },
                { class: '11B1', year: '2023 - 2024', sem: 'Học kỳ II', type: 'Bảng điểm tổng hợp', status: 'approved' },
                { class: '11B2', year: '2023 - 2024', sem: 'Học kỳ II', type: 'Học bạ điện tử', status: 'approved' },
                { class: '10C1', year: '2023 - 2024', sem: 'Học kỳ II', type: 'Bảng điểm tổng hợp', status: 'approved' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-surface-dim/30 transition-colors group">
                  <td className="py-4 px-6 text-center">
                    <input className="rounded border-gray-300 text-primary focus:ring-primary size-4" type="checkbox" />
                  </td>
                  <td className="py-4 px-6 text-[14px] font-semibold text-text-main">{row.class}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.year}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.sem}</td>
                  <td className="py-4 px-6 text-[14px] text-text-main">{row.type}</td>
                  <td className="py-4 px-6">
                    {row.status === 'pending' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                        <span className="size-1.5 rounded-full bg-orange-500 mr-1.5"></span>
                        Chờ duyệt
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <span className="size-1.5 rounded-full bg-green-500 mr-1.5"></span>
                        Đã duyệt
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    {row.status === 'pending' ? (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-text-main text-white hover:bg-black rounded-lg text-xs font-semibold transition-colors shadow-sm" onClick={() => onChangeView(ViewState.APPROVAL_DETAIL)}>
                        <span className="material-symbols-outlined !text-[16px]">history_edu</span>
                        Ký tên / Xác nhận
                      </button>
                    ) : (
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-dim text-text-main hover:bg-[#e8e8d8] rounded-lg text-xs font-semibold transition-colors" onClick={() => onChangeView(ViewState.APPROVAL_DETAIL)}>
                        <span className="material-symbols-outlined !text-[16px]">visibility</span>
                        Xem chi tiết
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 bg-surface-light border-t border-surface-dim">
          <span className="text-sm text-text-secondary">
            Hiển thị <span className="font-bold text-text-main">1-5</span> trên{' '}
            <span className="font-bold text-text-main">24</span> bản ghi
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

export default ApprovalList;